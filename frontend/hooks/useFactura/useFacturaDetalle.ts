import { useEffect, useState } from "react";
import { obtenerFacturaDetalle, FacturaDetalle } from "@/lib/api/factura";

export function useFacturaDetalle(id: number) {
  const [factura, setFactura] = useState<FacturaDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(id)) {
      console.warn("ID inválido para obtener factura:", id);
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const data = await obtenerFacturaDetalle(id);
        setFactura(data);
      } catch (error) {
        console.error("Error al obtener factura:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { factura, loading };
}
