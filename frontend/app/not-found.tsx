import { Button } from "@/components/shadcn/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4 text-gray-800">
      <div className="max-w-md w-full space-y-8 text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <FileQuestion className="w-16 h-16 mx-auto text-gray-600" />
        <h1 className="text-4xl font-light tracking-tight">Página No Encontrada</h1>
        <p className="text-xl text-gray-600">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Button asChild variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  );
}
