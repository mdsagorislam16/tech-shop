import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Fullstack E-Commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  



  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased text-slate-700`}
      >
        <Toaster
          toastOptions={{
            style: {
              background: "rgba(51 65 85)",
              color: "#fff",
            },
          }}
        ></Toaster>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
