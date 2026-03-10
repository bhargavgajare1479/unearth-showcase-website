import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const nord = localFont({
  src: [
    {
      path: "../../public/fonts/nord/Nord-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/nord/Nord-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/nord/Nord-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nord/Nord-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/nord/Nord-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/nord/Nord-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nord",
});

const outfit = localFont({
  src: [
    {
      path: "../../public/fonts/outfit/Outfit-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit/Outfit-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Unearth",
  description:
    "A professional-grade forensic data recovery and analysis tool designed for digital forensics investigators, incident responders, and cybersecurity professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nord.variable} ${outfit.variable} antialiased`}>
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
