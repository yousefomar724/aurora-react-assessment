import { NavLink } from "react-router-dom";
import { Sun, Coins, Activity, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Weather", path: "/", icon: Sun },
  { name: "Crypto", path: "/crypto", icon: Coins },
  { name: "COVID-19", path: "/covid", icon: Activity },
];

const NavItem = ({
  item,
  isMobile = false,
}: {
  item: (typeof navItems)[0];
  isMobile?: boolean;
}) => (
  <NavLink
    key={item.name}
    to={item.path}
    className={({ isActive }) =>
      `inline-flex outline-none items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${
        isMobile ? "w-full" : "border-b-2 pt-1"
      } ${
        isActive
          ? "text-primary border-primary"
          : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent"
      }`
    }
  >
    <item.icon className="w-5 h-5 mr-2" aria-hidden="true" />
    {item.name}
  </NavLink>
);

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Aurora Dashboard
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <NavItem key={item.name} item={item} isMobile />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
