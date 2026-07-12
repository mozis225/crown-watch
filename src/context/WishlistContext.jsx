import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "../firebase/wishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getUserFavorites(user.uid)
      .then(setFavoriteIds)
      .finally(() => setLoading(false));
  }, [user]);

  const isFavorite = (productId) => favoriteIds.includes(productId);

  const toggleFavorite = async (productId) => {
    if (!user) return false; // le composant appelant gère l'ouverture de la connexion

    if (isFavorite(productId)) {
      setFavoriteIds((prev) => prev.filter((id) => id !== productId));
      await removeFavorite(user.uid, productId);
    } else {
      setFavoriteIds((prev) => [...prev, productId]);
      await addFavorite(user.uid, productId);
    }
    return true;
  };

  return (
    <WishlistContext.Provider
      value={{ favoriteIds, loading, isFavorite, toggleFavorite }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}