// import SidebarFilters from "@/entities/task/ui/SidebarFilters";
// import React from "react";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="bg-muted h-screen">
//       <SidebarFilters />
//       {/* <main className="flex-1 p-6 min-h-screen">
//         <div className="bg-background shadow-sm border rounded-2xl p-6 max-w-[780px] mx-auto "> */}
//       {children}
//       {/* </div>
//       </main> */}
//     </div>
//   );
// }

import { SidebarProvider, SidebarTrigger } from "@/shared/ui/shadcn/sidebar";
import AppSidebar from "@/entities/task/ui/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 rounded-xl w-full">
        <div className="flex w-full">
          <SidebarTrigger />
        </div>

        <div className="w-full p-2 rounded-xl max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
