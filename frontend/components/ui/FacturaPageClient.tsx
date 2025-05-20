"use client";

import { useParams } from "next/navigation";
import FacturaDetalle from "@/components/ui/FacturaDetalle";

export default function FacturaPageClient() {
  const { id } = useParams();
  const facturaId = Number(id);

  if (isNaN(facturaId)) return <p>ID inválido</p>;

  return (
    <div>
      <FacturaDetalle id={facturaId} />
    </div>
  );
}
