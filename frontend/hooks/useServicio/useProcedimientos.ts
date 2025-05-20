import { useEffect, useState } from "react";
import {
  obtenerProcedimientos,
  ProcedimientoMedico,
} from "@/lib/api/servicios";

export const useProcedimientos = () => {
  const [procedimientos, setProcedimientos] = useState<ProcedimientoMedico[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerProcedimientos();
        setProcedimientos(data);
      } catch (error) {
        console.error("Error al cargar procedimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { procedimientos, loading };
};
