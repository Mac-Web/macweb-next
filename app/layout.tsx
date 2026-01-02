import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import User from "@/components/ui/User";
import Provider from "./Provider";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Home | MacWeb",
  description: "MacWeb, your best internet bud for productivity, entertainment, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Provider>
          <Nav>
            <User />
          </Nav>
          {children}
        </Provider>
      </body>
    </html>
  );
}
