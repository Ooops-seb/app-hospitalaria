import {
  AppRouter,
  ChildrenRoutes,
  DroppableRoutes,
  SimpleRoutes,
} from "@/interfaces/router";
import { LayoutDashboard } from "lucide-react";

function mapRoutesWithUrls(appRouter: AppRouter[]): AppRouter[] {
  const prefix = "platform";
  const mapRoutes = (
    routes: Array<DroppableRoutes | SimpleRoutes | ChildrenRoutes>,
    parentUrl: string = `/${prefix}`,
  ): Array<DroppableRoutes | SimpleRoutes | ChildrenRoutes> => {
    return routes.map((route) => {
      if ("category" in route) {
        return {
          ...route,
          routes: route.routes.map((childRoute) => ({
            ...childRoute,
            url: `${parentUrl}${childRoute.url}`,
          })),
        };
      }
      return {
        ...route,
        url: `${parentUrl}${route.url}`,
      };
    });
  };

  return appRouter.map((route) => {
    if (route.isDroppable) {
      const baseUrl = `/${prefix}/${route.prefix}`;
      return {
        ...route,
        routes: mapRoutes(route.routes, baseUrl) as DroppableRoutes[],
      };
    }
    return {
      ...route,
      routes: mapRoutes(route.routes, `/${prefix}`) as SimpleRoutes[],
    };
  });
}

export const appRoutes: AppRouter[] = mapRoutesWithUrls([
  {
    title: "General",
    isDroppable: false,
    routes: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Facturas",
    isDroppable: false,
    routes: [
      {
        title: "Lista",
        icon: LayoutDashboard,
        url: "/facturas/lista",
      },
      {
        title: "Crear",
        icon: LayoutDashboard,
        url: "/facturas/crear",
      },
      // {
      //   title: "Detalle Factura",
      //   icon: LayoutDashboard,
      //   url: "/facturas/[id]",
      // },
    ],
  },
  {
    title: "Pacientes",
    isDroppable: false,
    routes: [
      {
        title: "Lista",
        icon: LayoutDashboard,
        url: "/paciente/lista",
      },
      {
        title: "Crear",
        icon: LayoutDashboard,
        url: "/paciente/crear",
      },
    ],
  },
  {
    title: "Documentos Transaccionales",
    isDroppable: false,
    routes: [
      {
        title: "Lista",
        icon: LayoutDashboard,
        url: "/doctransaccional/lista",
      },
      {
        title: "Crear",
        icon: LayoutDashboard,
        url: "/doctransaccional/crear",
      },
    ],
  },
  {
    title: "Linea de Transacción",
    isDroppable: false,
    routes: [
      {
        title: "Lista",
        icon: LayoutDashboard,
        url: "/linea/lista",
      },
      {
        title: "Crear",
        icon: LayoutDashboard,
        url: "/linea/crear",
      },
    ],
  },
  {
    title: "Servicios",
    isDroppable: false,
    routes: [
      {
        title: "Crear Procedimiento Medico",
        icon: LayoutDashboard,
        url: "/servicios/procedimiento_medico",
      },
      {
        title: "Lista Procedimiento Medico",
        icon: LayoutDashboard,
        url: "/servicios/lista",
      },
      {
        title: "Crear Suministros Medico",
        icon: LayoutDashboard,
        url: "/servicios/suministros",
      },
    ],
  },
  {
    title: "Productos",
    isDroppable: false,
    routes: [
      {
        title: "Crear",
        icon: LayoutDashboard,
        url: "/productos/comida",
      },
      {
        title: "Lista",
        icon: LayoutDashboard,
        url: "/productos/lista",
      },
    ],
  },
]);
