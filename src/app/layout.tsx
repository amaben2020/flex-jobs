import Header from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Jobs",
    default: "Flow Jobs",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "m-auto my-10 max-w-5xl space-y-10 px-3",
        )}
      >
        <Header />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
