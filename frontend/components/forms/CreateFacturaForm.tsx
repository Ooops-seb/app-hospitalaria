"use client";

import { useFacturaForm } from "@/hooks/useFactura/useFacturaForm";
import { crearFactura } from "@/lib/api/factura";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/shadcn/ui/form";

export default function CreateFacturaForm() {
  const form = useFacturaForm();

  const onSubmit = async (data: {
    clave_acceso: string;
    documento_id: number;
  }) => {
    try {
      const res = await crearFactura(data);
      console.log("Factura creada:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando factura:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="clave_acceso"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clave de Acceso</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="documento_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del Documento</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Factura</Button>
      </form>
    </Form>
  );
}
