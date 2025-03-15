import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EssayHuzz - AI-Powered Essay Analysis",
  description: "Upload your essay or paper and get instant AI analysis, summaries, and insights",
  keywords: "essay analysis, AI, academic writing, education, essay help",
  authors: [
    { name: "Angelo Rizzieri" },
    { name: "Dylan Cheng" }
  ],
  openGraph: {
    title: "EssayHuzz - AI-Powered Essay Analysis",
    description: "Upload your essay or paper and get instant AI analysis, summaries, and insights",
    url: "https://essayhuzz.com",
    siteName: "EssayHuzz",
    locale: "en_US",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}