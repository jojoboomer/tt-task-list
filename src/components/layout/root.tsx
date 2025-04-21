import { Toaster } from "../ui/sonner";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <main className="relative bg-background w-full h-screen overflow-auto">
        <section role="list" className="mx-auto my-0 max-w-[1328px]">
          {children}
        </section>
      </main>
      <Toaster />
    </>
  );
}
