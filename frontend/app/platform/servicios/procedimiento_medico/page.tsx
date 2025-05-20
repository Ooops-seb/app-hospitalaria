import CreateProcedimientoForm from "@/components/forms/CreateProcedimientoForm";

export default function ProcedimientoPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registrar Procedimiento Médico</h1>
      <CreateProcedimientoForm />
    </div>
  );
}
