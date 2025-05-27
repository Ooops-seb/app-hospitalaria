/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ProductType,
  ProductFormData,
  crearProductoComida,
  crearProductoHospedaje,
} from "@/lib/api/producto";
import { useState } from "react";

export function useProductoForm() {
  const [productType, setProductType] = useState<ProductType>("");
  const [formData, setFormData] = useState<ProductFormData>({
    descripcion: "",
    precio: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend: any = { ...formData };
    if (productType === "hospedaje") {
      if (formData.fecha_inicio) {
        dataToSend.fecha_ingreso = (
          formData.fecha_inicio as Date
        ).toISOString();
        delete dataToSend.fecha_inicio;
      }
      if (formData.fecha_fin) {
        dataToSend.fecha_salida = (formData.fecha_fin as Date).toISOString();
        delete dataToSend.fecha_fin;
      }
    }
    console.log("Datos del producto:", {
      tipo: productType,
      ...dataToSend,
    });
    try {
      if (productType === "comida") {
        await crearProductoComida(dataToSend);
      }
      if (productType === "hospedaje") {
        await crearProductoHospedaje(dataToSend);
      }
      setSubmitted(true);
      setFormData({ descripcion: "", precio: 0 });
      setProductType("");
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

  return {
    productType,
    setProductType,
    formData,
    setFormData,
    submitted,
    setSubmitted,
    handleInputChange,
    handleSubmit,
  };
}
