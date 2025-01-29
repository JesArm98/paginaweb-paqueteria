import PaginaPrincipal from "@/ui/sections/PaginaPrincipal/page";

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
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.jpg?alt=media&token=80a669b8-699c-49ce-8747-8b9367fcef4b",
        width: 1000,
        height: 630,
        alt: "Myllos - Soluciones Logísticas",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function Home() {

  
  return (
    <>
<PaginaPrincipal/>
    </>
  );
}
