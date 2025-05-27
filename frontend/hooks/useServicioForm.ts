/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  crearServicioAtencion,
  crearServicioExamenes,
  crearServicioImagen,
  crearServicioProcedimiento,
  crearServicioSuministro,
  ServicioFormData,
  ServicioType,
} from "@/lib/api/servicios";
import { useState } from "react";

export function useServicioForm() {
  const [servicioType, setServicioType] = useState<ServicioType>("");
  const [formData, setFormData] = useState<ServicioFormData>({
    descripcion: "",
    precio: 0,
    registro: new Date(),
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof ServicioFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend: any = { ...formData };
    dataToSend.fecha_ingreso = (formData.registro as Date).toISOString();
    delete dataToSend.fecha_inicio;

    console.log("Datos del producto:", {
      tipo: servicioType,
      ...dataToSend,
    });
    try {
      if (servicioType === "atencion") {
        await crearServicioAtencion(dataToSend);
      }
      if (servicioType === "examenes") {
        await crearServicioExamenes(dataToSend);
      }
      if (servicioType === "imagen") {
        await crearServicioImagen(dataToSend);
      }
      if (servicioType === "procedimiento") {
        await crearServicioProcedimiento(dataToSend);
      }
      if (servicioType === "suministro") {
        await crearServicioSuministro(dataToSend);
      }
      setSubmitted(true);
      setFormData({ descripcion: "", precio: 0, registro: new Date() });
      setServicioType("");
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  return {
    servicioType,
    setServicioType,
    formData,
    setFormData,
    submitted,
    setSubmitted,
    handleInputChange,
    handleSubmit,
  };
}
