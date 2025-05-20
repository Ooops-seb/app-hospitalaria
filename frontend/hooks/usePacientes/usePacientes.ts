import { useEffect, useState } from "react";
import api from "@/lib/api";

export interface Paciente {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  fecha_nacimiento: string;
  telefono: string;
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/pacientes");
        setPacientes(res.data);
      } catch (error) {
        console.error("Error al cargar pacientes", error);
      }
    };

    fetch();
  }, []);

  return { pacientes };
}
