import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/app-providers";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ink Nation | Premium Tattoo Studio Bangalore",
  description: "Experience world-class tattoo artistry at Ink Nation, Bangalore's premier custom tattoo studio. Wear your story forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="bg-black text-white min-h-screen font-sans">
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

