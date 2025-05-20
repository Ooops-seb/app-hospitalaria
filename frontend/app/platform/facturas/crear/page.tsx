import CreateFacturaForm from "@/components/forms/CreateFacturaForm";

export default function FacturaPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Crear Factura</h1>
      <CreateFacturaForm />
    </div>
  );
}
