import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import { AjioFooter } from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ProfileSection from "./components/Profile";
import { OrdersPage } from "./components/Orders";
import { WishlistPage } from "./components/Wishlist";
import NotFoundPage from "./components/Notfound";
import ModernCart from "./components/Cart";
import NavigationMenuMobile from "./components/navigation-menu";
import ContactUsPage from "./components/ContactUsPage";
import ScrollToTop from "@/components/ScrollToTop";
import SignIn from "./components/login";
import Signup from "./components/signup";
import ProductDetails from "./components/ProductDetails";
import ProductCategory from "./components/ProductCategory";
import SearchedPage from "./components/SearchedPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./store/productsSlice";
import type { AppDispatch } from "./store";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isAuthPage) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    );
  }

  function Page({ title, children }: any) {
    React.useEffect(() => {
      document.title = title;
    }, [title]);
    return children;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto px-4 py-4 min-h-screen container">
        <Routes>
          <Route
            path="/"
            element={
              <Page title="Home">
                <Home />
              </Page>
            }
          />
          <Route
            path="/about"
            element={
              <Page title="About">
                <h1>About</h1>
              </Page>
            }
          />
          <Route
            path="/profile"
            element={
              <Page title="Profile">
                <ProtectedRoute>
                  <ProfileSection />
                </ProtectedRoute>
              </Page>
            }
          />
          <Route
            path="/orders"
            element={
              <Page title="Orders">
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              </Page>
            }
          />
          <Route
            path="/cart"
            element={
              <Page title="Cart">
                <ModernCart />
              </Page>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Page title="Wishlist">
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              </Page>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Page title="Contact Us">
                <ContactUsPage />
              </Page>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Page title="Product Details">
                <ProductDetails />
              </Page>
            }
          />
          <Route
            path="/products/:category"
            element={
              <Page title="Products">
                <ProductCategory />
              </Page>
            }
          />
          <Route
            path="/search"
            element={
              <Page title="Search Results">
                <SearchedPage />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page title="Not Found">
                <NotFoundPage />
              </Page>
            }
          />
        </Routes>
      </main>
      <AjioFooter />
      <div className="sm:hidden">
        <NavigationMenuMobile />
      </div>
    </ThemeProvider>
  );
}

export default App;
