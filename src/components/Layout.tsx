// src / components / layout.tsx;

import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full overflow-hidden bg-muted">
      {/* <AppSidebar /> */}

      <main className="flex-1 p-6 min-h-screen">
        {/* <SidebarTrigger /> */}
        <div className="bg-background shadow-sm border rounded-2xl p-6 max-w-[780px] mx-auto ">
          {children}
        </div>
      </main>
      {/* <main className="flex-1 overflow-auto p-6">{children}</main> */}
    </div>
  );
}

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }
