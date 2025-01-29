import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/sections/Navbar/Navbar";
import Footer from "@/ui/sections/Footer/Footer";
import { EmailProvider } from "../context/EmailContext";
import LoginDialog from "@/ui/components/LoginDialog/LoginDialog";
import { UserProvider } from "@/context/UserContext";
import FloatButton from "@/ui/components/FloatButton/FloatButton";
import AnimatedWrapper from "@/ui/components/AnimatedWrapper"; // Nuevo componente

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    title: "Myllos - Soluciones Logísticas",
    description: "Empresa especializada en soluciones logísticas.",
    openGraph: {
      title: "Myllos - Soluciones Logísticas",
      description: "Empresa especializada en soluciones logísticas.",
      url: "https://myllos.netlify.app/",
      type: "website",
      images: [
        {
          url: "https://storage.googleapis.com/fir-adminsdk-documents.appspot.com/Myllos.webp",
          width: 1000,
          height: 630,
          alt: "Myllos - Soluciones Logísticas",
        },
      ],
    },
  };
}

export default function RootLayout({ open, setOpen, children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <EmailProvider>
            <Navbar />
            <LoginDialog open={open} setOpen={setOpen} />
            <FloatButton />
            {/* Ahora envuelves children en el nuevo componente */}
            <AnimatedWrapper>{children}</AnimatedWrapper>
            <Footer />
          </EmailProvider>
        </UserProvider>
      </body>
    </html>
  );
}
