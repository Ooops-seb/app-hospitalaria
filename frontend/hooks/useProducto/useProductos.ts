import { obtenerProductos, ProductList } from "@/lib/api/producto";
import { useEffect, useState } from "react";

export const useProductos = () => {
  const [productos, setProductos] = useState<ProductList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { productos, loading };
};
