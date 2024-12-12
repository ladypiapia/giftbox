"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Copy, Check } from 'lucide-react'

interface SendGiftFlowProps {
  onSend: () => Promise<string>
}

export const SendGiftFlow: React.FC<SendGiftFlowProps> = ({ onSend }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [sharableLink, setSharableLink] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleSend = async () => {
    setIsLoading(true)
    try {
      const link = await onSend()
      setSharableLink(link)
      setStep(2)
    } catch (error) {
      console.error('Error sending gift:', error)
      toast({
        title: "Error",
        description: "There was a problem sending your gift. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharableLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const resetAndClose = () => {
    setIsOpen(false)
    setStep(1)
    setSharableLink('')
    setRecipientName('')
    setRecipientEmail('')
    setMessage('')
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Send Digital Gift</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{step === 1 ? "Send Your Digital Gift" : "Your Gift is Ready!"}</DialogTitle>
            <DialogDescription>
              {step === 1 ? "Fill in the details to send your gift." : "Share this link with your recipient."}
            </DialogDescription>
          </DialogHeader>
          {step === 1 ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient-name" className="text-right">
                    To
                  </Label>
                  <Input
                    id="recipient-name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="col-span-3"
                    placeholder="Recipient's name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="recipient-email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="col-span-3"
                    placeholder="Recipient's email (optional)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="col-span-3"
                    placeholder="Add a personal message..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={resetAndClose} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSend} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Gift"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-2">
                  <Input value={sharableLink} readOnly />
                  <Button size="icon" onClick={copyToClipboard}>
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This link will allow the recipient to view your digital gift. You can copy and send it directly, or use the recipient's email if provided.
                </p>
              </div>
              <DialogFooter>
                <Button onClick={resetAndClose}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

