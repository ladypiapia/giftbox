import InnerComponent from "./InnerComponent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <InnerComponent id={id} />;
}
