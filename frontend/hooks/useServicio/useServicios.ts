import { useEffect, useState } from "react";
import { obtenerServicios, ServicioList } from "@/lib/api/servicios";

export const useServicios = () => {
  const [servicios, setServicios] = useState<ServicioList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { servicios, loading };
};
