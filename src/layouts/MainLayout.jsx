import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";
import ProductModal from "../components/ProductModal/ProductModal";
import AuthModal from "../components/AuthModal/AuthModal";
import AccountModal from "../components/AccountModal/AccountModal";
import SearchBar from "../components/SearchBar/SearchBar";
import CheckoutModal from "../components/CheckoutModal/CheckoutModal";
import WishlistModal from "../components/WishlistModal/WishlistModal";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

function MainLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { user } = useAuth();
  const { isAuthPromptOpen, setIsAuthPromptOpen } = useUI();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleAccountClick = () => setIsAuthPromptOpen(true);
  const handleSearchClick = () => setIsSearchOpen(true);
  const handleWishlistClick = () => setIsWishlistOpen(true);

  const handleCheckout = () => {
    closeCart();
    if (!user) {
      setIsAuthPromptOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <>
      <Navbar
        onCartClick={openCart}
        onAccountClick={handleAccountClick}
        onSearchClick={handleSearchClick}
        onWishlistClick={handleWishlistClick}
      />

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>{children}</main>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={closeCart} onCheckout={handleCheckout} />
      <ProductModal />
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onRequireAuth={() => setIsAuthPromptOpen(true)}
      />

      {user ? (
        <AccountModal
          isOpen={isAuthPromptOpen}
          onClose={() => setIsAuthPromptOpen(false)}
        />
      ) : (
        <AuthModal
          isOpen={isAuthPromptOpen}
          onClose={() => setIsAuthPromptOpen(false)}
        />
      )}
    </>
  );
}

export default MainLayout;