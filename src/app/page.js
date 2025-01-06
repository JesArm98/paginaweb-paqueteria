import Alianzas from "@/ui/sections/Alianzas/Alianzas";
import SeccionCrema from "@/ui/sections/SeccionCrema/SeccionCrema";
import SeccionNegra from "@/ui/sections/SeccionNegra/SeccionNegra";


export default function Home() {
  return (
    <>
      <SeccionCrema />
      <SeccionNegra />
      <Alianzas />
    </>
  );
}
