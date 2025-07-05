import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Home, List, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const navigationMenuItems = [
  { title: "Home", href: "/", icon: Home, isActive: true },
  { title: "Categories", href: "/categories", icon: List },
  { title: "Cart", href: "/cart", icon: BookOpen },
  { title: "Account", href: "/account", icon: Settings },
  { title: "Settings", href: "/profile", icon: User },
];

export default function NavigationMenuMobile() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-background border-t">
      <NavigationMenu>
        <NavigationMenuList className="grid w-full grid-cols-5">
          {navigationMenuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex flex-col h-auto items-center px-5 py-2.5"
                )}
                active={item.isActive}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mb-1.5 h-5 w-5" />
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
