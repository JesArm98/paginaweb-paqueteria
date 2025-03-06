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
        url: "https://firebasestorage.googleapis.com/v0/b/fir-adminsdk-documents.appspot.com/o/Myllos.jpg?alt=media&token=0826d865-cfb9-4b80-9477-53c669611ac4",
        width: 1000,
        height: 630,
        alt: "Myllos imagen de fondo",
        type: "image/jpeg",
      },
    ],
  },
};
  
  export default function Layout({ children }) {
      return children;
    } 