"use client";

import { LetterItem } from "@/lib/type";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextType {
  items: LetterItem[];
  setItems: React.Dispatch<React.SetStateAction<LetterItem[]>>;
  giftId: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

interface AppContextProviderProps {
  children: ReactNode;
  giftId: string;
}

export function AppContextProvider({
  children,
  giftId,
}: AppContextProviderProps) {
  const [items, setItems] = useState<LetterItem[]>([]);

  const value = {
    items,
    setItems,
    giftId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
