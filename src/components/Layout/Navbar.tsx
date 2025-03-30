import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import binanceLogo from "../../assets/binance.png";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
            <img
              src={binanceLogo}
              alt="Binance Logo"
              className="ml-4 h-8 w-8"
            />
            <span className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
              Trading Dashboard
            </span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
