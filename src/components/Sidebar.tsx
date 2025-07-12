import { useState } from "react";
import { Home, ListTodo, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Главная", icon: <Home className="w-4 h-4" />, to: "/" },
  { label: "Задачи", icon: <ListTodo className="w-4 h-4" />, to: "/tasks" },
  {
    label: "Настройки",
    icon: <Settings className="w-4 h-4" />,
    to: "/settings",
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Гамбургер только на мобильных */}
      <Button
        variant="ghost"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>

      {/* Затемнение и сайдбар при открытии */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity md:hidden ${
          open ? "opacity-30 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r p-4
          transform transition-transform duration-300
          md:static md:translate-x-0 md:block
          ${open ? "translate-x-0" : "-translate-x-full"}
          z-50
        `}
      >
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              <Button
                variant={location.pathname === item.to ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
