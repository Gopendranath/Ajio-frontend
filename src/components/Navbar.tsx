import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  LogIn,
  UserCircle,
  Package,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/constants/navlinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { signoutUser } from "@/store/authSlice";

// Helper component for a cleaner, collapsible mobile menu item
function MobileCollapsibleItem({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={`flex items-center justify-between w-full cursor-pointer ${className}`}
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 border-l ml-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInputValue.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    await dispatch(signoutUser());
    navigate("/");
  };

  return (
    <div className="w-full">
      {/* Top promotional banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        <span className="font-medium">
          FLAT 60% OFF + Extra 20% OFF | Use Code: AJIO60
        </span>
      </div>

      {/* Main navbar */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-6">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Profile section in mobile menu */}
                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-3">
                    {isAuthenticated && user ? <img src={user?.profilePicture || "https://ui-avatars.com/api/?name="+user?.name} alt="User Avatar" className="h-8 w-8 rounded-full" /> : <UserCircle className="h-8 w-8"/>}
                      <div>
                        <p className="font-medium">
                          {isAuthenticated && user ? "Hello, " + user.name : "Guest"}
                        </p>
                        <div className="flex space-x-4 mt-2">
                          {isAuthenticated ? (
                            <Button
                              onClick={handleSignOut}
                              variant="secondary"
                              className="text-sm"
                            >
                             Sign out
                            </Button>
                          ) : (
                            <Button
                              onClick={() => navigate("/sign-in")}
                              variant="outline"
                              size="sm"
                              className="text-sm"
                            >
                              <LogIn className="h-4 w-4 mr-2" /> Login
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile links in mobile menu */}
                  <div className="space-y-2">
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/profile"
                      className="flex items-center justify-between w-full p-2 rounded hover:bg-accent"
                    >
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-2" /> My Profile
                      </span>
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/orders"
                      className="flex items-center justify-between w-full p-2 rounded hover:bg-accent"
                    >
                      <span className="flex items-center">
                        <Package className="h-4 w-4 mr-2" /> My Orders
                      </span>
                    </Link>
                  </div>

                  {/* Categories */}
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <h3 className="font-bold text-lg text-foreground border-b pb-2">
                        {category.name}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <MobileCollapsibleItem
                            key={item.name}
                            title={item.name}
                            className="font-semibold text-base text-primary"
                          >
                            <div className="space-y-3 mt-2">
                              {item.subcategories.map((subcat) => (
                                <MobileCollapsibleItem
                                  key={subcat.name}
                                  title={subcat.name}
                                  className="font-medium text-sm text-foreground"
                                >
                                  <div className="space-y-1 mt-2">
                                    {subcat.items.map((subItem) => (
                                      <Link
                                        key={subItem}
                                        to={`/search?query=${encodeURIComponent(
                                          subItem
                                        )}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-sm text-muted-foreground hover:text-primary hover:bg-accent px-2 py-1.5 rounded transition-all"
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </div>
                                </MobileCollapsibleItem>
                              ))}
                            </div>
                          </MobileCollapsibleItem>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <a href="/" className="flex items-center">
              <div className="text-2xl font-bold text-primary">AJIO</div>
            </a>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6">
                        <div className="grid grid-cols-3 gap-8">
                          {category.items.map((item) => (
                            <div key={item.name} className="space-y-4">
                              <h4 className="font-bold text-base text-foreground border-b pb-2">
                                {item.name}
                              </h4>
                              <div className="space-y-3">
                                {item.subcategories.map((subcat) => (
                                  <div key={subcat.name} className="space-y-2">
                                    <h5 className="font-semibold text-sm text-primary hover:text-primary/90 cursor-pointer transition-colors">
                                      {subcat.name}
                                    </h5>
                                    <div className="space-y-1 ml-2">
                                      {subcat.items.map((subItem) => (
                                        <NavigationMenuLink
                                          key={subItem}
                                          asChild
                                        >
                                          <Link
                                            to={`/search?query=${encodeURIComponent(
                                              subItem
                                            )}`}
                                            className="block text-sm text-muted-foreground hover:text-primary hover:bg-accent px-2 py-1 rounded transition-all duration-200"
                                          >
                                            {subItem}
                                          </Link>
                                        </NavigationMenuLink>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Featured section at the bottom */}
                        <div className="mt-6 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-6">
                              <Link
                                to="/"
                                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                              >
                                🔥 Trending Now
                              </Link>
                              <Link
                                to="/"
                                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                              >
                                ⚡ Flash Sale
                              </Link>
                              <Link
                                to="/"
                                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                              >
                                🆕 New Arrivals
                              </Link>
                            </div>
                            <Link
                              to={`/products/${category.name}`}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              View All {category.name} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products, brands and more"
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit(e);
                    }
                  }}
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobile Search Bar */}
              {isSearchOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background p-4 border-b shadow-sm">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="relative flex items-center"
                  >
                    <Input
                      type="search"
                      placeholder="Search for products, brands and more"
                      className="pl-10 pr-10 py-2 w-full"
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                  >
                   {isAuthenticated ? <img src={user?.profilePicture || "https://ui-avatars.com/api/?name="+user?.name} alt="Profile" className="w-8 h-8 rounded-full" /> : <User className="h-5 w-5" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 mt-2">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-4 w-4 mr-2" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/orders")}
                  >
                    <Package className="h-4 w-4 mr-2" /> My Orders
                  </DropdownMenuItem>
                  {isAuthenticated ? (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Signout
                    </DropdownMenuItem>
                  ) : (
                    (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => navigate("/sign-in")}
                      >
                        <LogIn className="h-4 w-4 mr-2" /> Signin / Signup
                      </DropdownMenuItem>
                  )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/wishlist")}
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="md:hidden py-3 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products, brands and more"
                  className="pl-10 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Secondary navigation */}
      <div className="bg-muted border-b hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-2 text-sm">
            <Link
              to="/products/new-arrivals"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              to="/products/sale"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sale
            </Link>
            <Link
              to="/products/brands"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Brands
            </Link>
            <Link
              to="/products/gift-cards"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Gift Cards
            </Link>
            <Link
              to="/products/customer-care"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Customer Care
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
