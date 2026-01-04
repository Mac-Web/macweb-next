import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import User from "@/components/ui/User";
import Provider from "./Provider";
import Theme from "@/components/Theme";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Home | MacWeb",
  description: "MacWeb, your best internet bud for productivity, entertainment, and more!",
  authors: [{ name: "MacWeb", url: "https://macweb-next.vercel.app" }],
  openGraph: {
    title: "MacWeb",
    description: "MacWeb, your best internet bud for productivity, entertainment, and more!",
    url: "https://macweb-next.vercel.app",
    siteName: "MacWeb",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Theme>
          <Provider>
            <Nav>
              <User />
            </Nav>
            {children}
          </Provider>
        </Theme>
      </body>
    </html>
  );
}
