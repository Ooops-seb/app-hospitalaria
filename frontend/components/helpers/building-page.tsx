"use client";

import { Construction } from "lucide-react";
// import { usePathname } from "next/navigation";

export default function BuildingPageComponent() {
  // const route = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-gray-800">
      <div className="max-w-md w-full space-y-8 text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <Construction className="w-16 h-16 mx-auto text-gray-600" />
        <h1 className="text-4xl font-light tracking-tight">Bienvenido</h1>
        <p className="text-xl text-gray-600">App Hospitalaria</p>
        {/* <span>Ruta: {route}</span> */}
      </div>
    </div>
  );
}
