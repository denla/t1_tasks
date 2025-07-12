// src / components / layout.tsx;

import { Sidebar } from "./sidebar"; // создадим ниже

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}

// import { Sidebar as AppSidebar } from "@/components/Sidebar";
// // import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// // import { DataTable } from "@/components/data-table";
// // import { SectionCards } from "@/components/section-cards";
// import { SiteHeader } from "@/components/Header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// export default function Page() {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//     >
//       <AppSidebar variant="inset" />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards />
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <DataTable data={data} />
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
