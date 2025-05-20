import { useEffect, useState } from "react";
import { obtenerComidas, Comida } from "@/lib/api/producto";

export const useComidas = () => {
  const [comidas, setComidas] = useState<Comida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerComidas();
        setComidas(data);
      } catch (error) {
        console.error("Error al cargar comidas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { comidas, loading };
};
