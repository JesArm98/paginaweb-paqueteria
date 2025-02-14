import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/"); // 🔹 Redirige automáticamente a la página principal
}
