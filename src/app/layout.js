import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/sections/Navbar/Navbar";
import Footer from "@/ui/sections/Footer/Footer";
import { EmailProvider } from "../context/EmailContext";
import LoginDialog from "@/ui/components/LoginDialog/LoginDialog";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Myllos",
  description: "Empresa dedicada y especializada en aportar la mejor solucion para sus problematicas de envios de mercancia por distintos tipos de transporte.",
  metadataBase: new URL('https://myllos.netlify.app'),
  openGraph: {
    title: "Myllos - Soluciones Logisticas",
    description: "Empresa dedicada y especializada en aportar la mejor solucion para sus problematicas de envios de mercancia por distintos tipos de transporte.",
    url: 'https://myllos.netlify.app',
    siteName: 'Myllos',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: 'https://www.myllos.com.mx/background.webp?v=1.0',
        width: 1200,
        height: 630,
        alt: 'Myllos - Soluciones Logisticas',
      },
    ],
  },
};

export default function RootLayout({ open, setOpen,children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>

          <EmailProvider>
            <Navbar />
            <LoginDialog open={open} setOpen={setOpen} />
            {children}
            <Footer />
        </EmailProvider>
        </UserProvider>
      </body>
    </html>
  );
}
