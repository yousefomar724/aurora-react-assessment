import { NavLink } from "react-router-dom";
import { Sun, Coins, Activity, Menu, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Toggle } from "../ui/toggle";
import useTheme from "@/hooks/useTheme";

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
          : "text-muted-foreground hover:text-foreground hover:border-muted dark:text-muted-foreground dark:hover:text-foreground dark:hover:border-muted border-transparent"
      }`
    }
  >
    <item.icon className="w-5 h-5 mr-2" aria-hidden="true" />
    {item.name}
  </NavLink>
);

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="bg-background dark:bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-foreground dark:text-foreground">
              Aurora Dashboard
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            <div className="h-full flex items-center">
              <Toggle
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="ml-4"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Toggle>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <div className="h-full flex items-center">
              <Toggle
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="ml-4"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Toggle>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-background dark:bg-background"
              >
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
