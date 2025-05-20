"use client";

import { useLineaForm } from "@/hooks/useLineaTrans/useLineaFrom";
import { crearLineaTransaccion } from "@/lib/api/lineaTrans";
import { useFacturas } from "@/hooks/useFactura/useFacturas";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export default function CreateLineaForm() {
  const form = useLineaForm();
  const { facturas } = useFacturas();

  const onSubmit = async (data: {
    cantidad: number;
    precio_unitario: number;
    factura_id: number;
    producto_id?: number | null;
    servicio_id?: number | null;
  }) => {
    try {
      const res = await crearLineaTransaccion(data);
      console.log("Línea registrada:", res);
      form.reset();
    } catch (error) {
      console.error("Error registrando línea:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="cantidad"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input {...field} type="number" value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="precio_unitario"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio Unitario</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="factura_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Factura</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border rounded px-2 py-1"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  <option value="">Seleccione una factura</option>
                  {facturas.map((factura) => (
                    <option key={factura.id} value={factura.id}>
                      #{factura.id} - {factura.clave_acceso}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="producto_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de Producto (opcional)</FormLabel>
              <FormControl>
                <Input {...field} type="number" value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="servicio_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de Servicio (opcional)</FormLabel>
              <FormControl>
                <Input {...field} type="number" value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Registrar Línea</Button>
      </form>
    </Form>
  );
}
