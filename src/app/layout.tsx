import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ArthaSakhi | Financial Awareness & Investment Education",
  description:
    "Empowering Women with Financial Knowledge. Strengthening Families through Smart Investing.",
  keywords: [
    "financial literacy",
    "women empowerment",
    "investment education",
    "ArthaSakhi",
    "Hema Poonia",
    "mutual funds",
    "financial planning",
  ],
  openGraph: {
    title: "ArthaSakhi — Empowering Women with Financial Knowledge",
    description:
      "A community for Financial Awareness & Investment Education. Strengthening families through smart investing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#F9F7F2] text-[#1B3022]">
        {children}
      </body>
    </html>
  );
}