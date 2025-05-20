import FacturaList from "@/components/ui/FacturaList";

export default function FacturaPage() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mt-8 mb-2">Lista de Facturas</h2>
      <FacturaList />
    </div>
  );
}
