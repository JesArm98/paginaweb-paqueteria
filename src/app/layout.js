import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/sections/Navbar/Navbar";
import Footer from "@/ui/sections/Footer/Footer";
import { EmailProvider } from "../context/EmailContext";
import LoginDialog from "@/ui/components/LoginDialog/LoginDialog";
import { UserProvider } from "@/context/UserContext";
import FloatButton from "@/ui/components/FloatButton/FloatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ open, setOpen,children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <EmailProvider>
            <Navbar />  
            <LoginDialog open={open} setOpen={setOpen} />
            <FloatButton />
            {children}
            <Footer />
        </EmailProvider>
        </UserProvider>
      </body>
    </html>
  );
}
