import { useEffect, useState } from "react";
import { obtenerComidas, ProductList } from "@/lib/api/producto";

export const useComidas = () => {
  const [comidas, setComidas] = useState<ProductList[]>([]);
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
