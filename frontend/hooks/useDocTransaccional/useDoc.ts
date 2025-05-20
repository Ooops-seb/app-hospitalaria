// hooks/useDocumentos.ts
import { useEffect, useState } from "react";
import { obtenerDocumentosTransaccionales } from "@/lib/api/doctransaccional";
import type { DocumentoTransaccionalDto } from "@/lib/api/doctransaccional";

export function useDocumentos() {
  const [documentos, setDocumentos] = useState<DocumentoTransaccionalDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerDocumentosTransaccionales();
        setDocumentos(data);
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { documentos, loading };
}
