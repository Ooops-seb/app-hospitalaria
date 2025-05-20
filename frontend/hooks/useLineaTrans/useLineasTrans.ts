import { useEffect, useState } from "react";
import {
  LineaTransaccion,
  obtenerLineasTransaccion,
} from "@/lib/api/lineaTrans";

export const useLineasTransaccion = () => {
  const [lineas, setLineas] = useState<LineaTransaccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerLineasTransaccion();
        setLineas(data);
      } catch (error) {
        console.error("Error al cargar líneas de transacción:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { lineas, loading };
};
