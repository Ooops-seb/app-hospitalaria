import { useEffect, useState } from "react";
import { obtenerFacturas } from "@/lib/api/factura";
import type { Factura } from "@/lib/api/factura";
// import type { FacturaDto } from "@/lib/api/factura";

export function useFacturas() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerFacturas();
        setFacturas(data);
      } catch (error) {
        console.error("Error al obtener facturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { facturas, loading };
}
