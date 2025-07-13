import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Home, List, Settings, User } from "lucide-react";
import { useState } from "react";

const navigationMenuItems = [
  { title: "Home", href: "/", icon: Home, isActive: true },
  { title: "Categories", href: "/categories", icon: List },
  { title: "Cart", href: "/cart", icon: BookOpen },
  { title: "Account", href: "/account", icon: Settings },
  { title: "Profile", href: "/profile", icon: User },
];

export default function NavigationMenuMobile() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
      {/* Background with blur and gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-md border-t shadow-2xl"></div>
      
      <NavigationMenu className="relative">
        <NavigationMenuList className="grid w-full grid-cols-5 gap-0">
          {navigationMenuItems.map((item) => (
            <NavigationMenuItem key={item.title} className="flex-1">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex flex-col h-auto items-center justify-center px-2 py-3 min-h-16 text-xs font-medium transition-all duration-300 ease-out hover:bg-accent/60 focus:bg-accent/60 active:scale-95 border-0 rounded-none group relative",
                  item.isActive || activeItem === item.title
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveItem(item.title)}
                asChild
              >
                <a href={item.href} className="w-full">
                  {/* Active indicator */}
                  {(item.isActive || activeItem === item.title) && (
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
                  )}
                  
                  {/* Icon with enhanced animations */}
                  <item.icon 
                    className={cn(
                      "mb-1.5 h-5 w-5 transition-all duration-300 ease-out",
                      item.isActive || activeItem === item.title 
                        ? "scale-110 text-primary drop-shadow-sm" 
                        : "group-hover:scale-105 group-hover:text-primary/80"
                    )} 
                  />
                  
                  {/* Label with improved typography */}
                  <span className={cn(
                    "text-xs font-medium leading-none transition-colors duration-300",
                    item.isActive || activeItem === item.title 
                      ? "text-primary" 
                      : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {item.title}
                  </span>
                  
                  {/* Ripple effect on tap */}
                  <div className="absolute inset-0 rounded-none opacity-0 group-active:opacity-20 group-active:bg-primary transition-opacity duration-150"></div>
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Safe area padding for devices with home indicators */}
      <div className="h-safe-area-inset-bottom bg-background/95 backdrop-blur-sm"></div>
    </div>
  );
}