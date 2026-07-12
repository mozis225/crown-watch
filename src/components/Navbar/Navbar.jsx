import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Watch,
  Heart,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

function Navbar({ onCartClick, onAccountClick, onSearchClick, onWishlistClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { totalItems } = useCart();
  const { user } = useAuth();
  const { favoriteIds } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="topbar">
        Livraison partout en Côte d'Ivoire • Paiement sécurisé
      </div>

      <header className={`navbar ${scrolled ? "navbar-scroll" : ""}`}>
        <div className="logo">
          <Watch size={30} />
          <span>CROWN WATCH</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/shop">Boutique</NavLink>
          <NavLink to="/about">À propos</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="icons">
          <button className="icon-btn" onClick={onSearchClick}>
            <Search />
          </button>

          <button className="cart" onClick={onWishlistClick}>
            <Heart />
            {favoriteIds.length > 0 && <span>{favoriteIds.length}</span>}
          </button>

          <button className="icon-btn account-btn" onClick={onAccountClick}>
            <User />
            {user && <span className="online-dot" />}
          </button>

          <button className="cart" onClick={onCartClick}>
            <ShoppingBag />
            <span>{totalItems}</span>
          </button>

          <button
            className="icon-btn menu-icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mobile-menu-close" onClick={closeMobileMenu}>
              <X size={26} />
            </button>

            <nav className="mobile-nav-links">
              <NavLink to="/" onClick={closeMobileMenu}>
                Accueil
              </NavLink>
              <NavLink to="/shop" onClick={closeMobileMenu}>
                Boutique
              </NavLink>
              <NavLink to="/about" onClick={closeMobileMenu}>
                À propos
              </NavLink>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;