import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalEffects from "@/components/GlobalEffects";

export const metadata: Metadata = {
  title: "Art Studio Kommunarka | Moscow",
  description: "Art at the intersection of industrial decay and sacred transformation. Founded by Lara Metreveli and Oblepiha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      <body className="bg-background text-foreground font-sans selection:bg-accent selection:text-white overflow-x-hidden relative">
        <GlobalEffects />
        <SmoothScroll>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
