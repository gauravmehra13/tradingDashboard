import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart2,
  Settings,
  User,
  UserCircle,
  Cog,
  LogOut,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Analytics", icon: BarChart2, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 mb-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`
            }
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}

        <div className="mt-auto px-4 py-3 z-1">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex items-center w-full p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <User className="w-6 h-6 flex-shrink-0" />
                {isOpen && <span className="ml-3">User</span>}
              </button>
            </Popover.Trigger>
            <Popover.Content
              side="right"
              align="start"
              sideOffset={10}
              className="w-48 p-2 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg"
            >
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg">
                  <UserCircle className="w-4 h-4 mr-2" />
                  <span>User Profile</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg">
                  <Cog className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </aside>
  );
}
