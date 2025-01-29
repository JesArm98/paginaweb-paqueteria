import AnimatedWrapper from "@/ui/components/AnimatedWrapper";

export const metadata = {
  title: "Myllos - LTL (Less Than Truckload)",
  description: "LTL (Less Than Truckload) de la empresa Myllos.",

  openGraph: {
    title: "Myllos - LTL (Less Than Truckload)",
    description: "LTL (Less Than Truckload) de la empresa Myllos.",
    url: "https://myllos.netlify.app/servicios/ltl",
    type: "website",
    images: [
      {
        url: "https://storage.googleapis.com/fir-adminsdk-documents.appspot.com/Myllos.webp",
        width: 1000,
        height: 630,
        alt: "Myllos",
        
      },
    ],
  },
};
  
export default function Layout({ children }) {
  return <AnimatedWrapper>{children}</AnimatedWrapper>; // Envolvemos los children
}