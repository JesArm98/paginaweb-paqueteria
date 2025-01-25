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
  title: "Myllos - Soluciones Logisticas",
  description: "Empresa dedicada y especializada en aportar la mejor solucion para sus problematicas de envios de mercancia por distintos tipos de transporte.",
  metadataBase: new URL('https://myllos.netlify.app/'),
  openGraph: {
    title: "Myllos - Soluciones Logisticas",
    description: "Empresa dedicada y especializada en aportar la mejor solucion para sus problematicas de envios de mercancia por distintos tipos de transporte.",
    url: 'https://myllos.netlify.app/',
    siteName: 'Myllos',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.webp?alt=media&token=286f024b-6144-4152-a657-29966c67be2f',
        width: 1000,
        height: 630,
        alt: 'Myllos - Soluciones Logisticas',
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
            {children}
            <Footer />
        </EmailProvider>
        </UserProvider>
      </body>
    </html>
  );
}
