// src/components/sidebar.tsx

import { Home, ListTodo, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // если есть, иначе убери
import { Link } from "react-router-dom"; // или next/link, если Next.js

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-full border-r p-4">
      <nav className="flex flex-col gap-2">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Главная
          </Button>
        </Link>
        <Link to="/tasks">
          <Button variant="ghost" className="w-full justify-start">
            <ListTodo className="mr-2 h-4 w-4" />
            Задачи
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Настройки
          </Button>
        </Link>
      </nav>
    </aside>
  );
}

// // src/components/Sidebar.tsx
// import { Home, ListTodo, Settings, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Link, useLocation } from "react-router-dom";

// const navItems = [
//   { label: "Главная", icon: <Home className="w-4 h-4" />, to: "/" },
//   { label: "Задачи", icon: <ListTodo className="w-4 h-4" />, to: "/tasks" },
//   { label: "Пользователи", icon: <Users className="w-4 h-4" />, to: "/users" },
//   {
//     label: "Настройки",
//     icon: <Settings className="w-4 h-4" />,
//     to: "/settings",
//   },
// ];

// export const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <aside className="w-64 min-h-screen border-r bg-white p-4">
//       <nav className="space-y-2">
//         {navItems.map((item) => (
//           <Link key={item.to} to={item.to}>
//             <Button
//               variant={location.pathname === item.to ? "secondary" : "ghost"}
//               className="w-full justify-start gap-2"
//             >
//               {item.icon}
//               {item.label}
//             </Button>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };
