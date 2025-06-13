import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

// font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JeremyJakob — Concert & Event Photography",
  description: "Jeremy Jakob photography, specializing in concerts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.variable} antialiased bg-[#fdfcfa]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
