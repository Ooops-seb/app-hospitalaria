import { Button } from "@/components/shadcn/ui/button";
import ProcedimientoList from "@/components/ui/ProcedimientoList";
import { Routes } from "@/lib/routes/names";
import Link from "next/link";

export default function ProcedimientoPage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mt-8 mb-2">Lista de Servicios</h2>
      <Link href={Routes.CrearServicio}>
        <Button>Crear</Button>
      </Link>
      <ProcedimientoList />
    </div>
  );
}
