"use client";

import { usePacienteForm } from "@/hooks/usePacientes/usePacientesForm";
import { crearPaciente } from "@/lib/api/pacientes";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

type PacienteField =
  | "nombres"
  | "apellidos"
  | "cedula"
  | "fecha_nacimiento"
  | "telefono";

export default function CreatePacienteForm() {
  const form = usePacienteForm();

  const onSubmit = async (values: {
    nombres: string;
    apellidos: string;
    cedula: string;
    fecha_nacimiento: string;
    telefono: string;
  }) => {
    try {
      const pacienteData = {
        ...values,
        fecha_nacimiento: new Date(values.fecha_nacimiento),
      };
      const res = await crearPaciente(pacienteData);
      console.log("Paciente creado:", res);
      form.reset();
    } catch (error) {
      console.error("Error creando paciente:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {["nombres", "apellidos", "cedula", "fecha_nacimiento", "telefono"].map(
          (field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as PacienteField}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name.replace("_", " ")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={field.name === "fecha_nacimiento" ? "date" : "text"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
        )}
        <Button type="submit">Crear paciente</Button>
      </form>
    </Form>
  );
}
