import {
  FilePlus2,
  LayoutPanelLeft,
  Bug,
  FileText,
  MessageSquareCode,
  CodeXml,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarFooter,
} from "@/shared/ui/shadcn/sidebar";

import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Switch } from "@/shared/ui/shadcn/switch";
import { Label } from "@/shared/ui/shadcn/label";

import { themeStore } from "../model/themeStore";
import { taskStore } from "../model/taskStore";

const items = [
  {
    title: "All",
    icon: LayoutPanelLeft,
  },
  {
    title: "Bug",
    icon: Bug,
  },
  {
    title: "Feature",
    icon: FilePlus2,
  },
  {
    title: "Documentation",
    icon: FileText,
  },
  {
    title: "Refactor",
    icon: MessageSquareCode,
  },
  {
    title: "Test",
    icon: CodeXml,
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={`/?category=${item.title}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>
                    {taskStore.tasks.filter((task) =>
                      item.title === "All" ? true : task.category === item.title
                    ).length || ""}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-4 p-2">
          <Switch
            id="dark-mode"
            checked={themeStore.theme === "dark"}
            onCheckedChange={(checked) =>
              themeStore.setTheme(checked ? "dark" : "light")
            }
          />

          <Label htmlFor="dark-mode">Dark mode</Label>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default observer(AppSidebar);
