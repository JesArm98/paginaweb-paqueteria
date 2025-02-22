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

export const metadata = {
  title: "Myllos - Soluciones Logísticas",
  description:
    "Empresa dedicada y especializada en aportar la mejor solución para sus problemáticas de envíos de mercancía por distintos tipos de transporte.",
  openGraph: {
    title: "Myllos - Soluciones Logísticas",
    description:
      "Empresa dedicada y especializada en aportar la mejor solución para sus problemáticas de envíos de mercancía por distintos tipos de transporte.",
    url: "https://myllos.netlify.app/",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.jpg?alt=media&token=162a07a8-f8b8-4777-a1ed-7f27d1cd2f45&v=2",
        width: 1000,
        height: 630,
        alt: "Myllos - Soluciones Logísticas",
        type: "image/jpeg",
      },
    ],
  },
};



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
