import "./WishlistModal.css";
import { X, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";
import { useProductModal } from "../../context/ProductModalContext";

function WishlistModal({ isOpen, onClose }) {
  const { favoriteIds, toggleFavorite, loading } = useWishlist();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { openProduct } = useProductModal();

  if (!isOpen) return null;

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  const handleOpen = (product) => {
    openProduct(product);
    onClose();
  };

  return (
    <>
      <div className="wishlist-overlay" onClick={onClose} />

      <aside className="wishlist-drawer open">
        <div className="wishlist-header">
          <h3>Mes Favoris</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {loading ? (
          <p className="wishlist-empty">Chargement...</p>
        ) : favoriteProducts.length === 0 ? (
          <p className="wishlist-empty">
            Aucun favori pour le moment. Clique sur le ♥ d'un produit pour
            l'ajouter ici.
          </p>
        ) : (
          <div className="wishlist-items">
            {favoriteProducts.map((product) => (
              <div className="wishlist-item" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleOpen(product)}
                />

                <div
                  className="wishlist-item-info"
                  onClick={() => handleOpen(product)}
                >
                  <h4>{product.name}</h4>
                  <p>{product.price?.toLocaleString()} FCFA</p>
                </div>

                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-add-cart"
                    onClick={() => addToCart(product)}
                    title="Ajouter au panier"
                  >
                    <ShoppingCart size={16} />
                  </button>
                  <button
                    className="wishlist-remove"
                    onClick={() => toggleFavorite(product.id)}
                    title="Retirer des favoris"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}

export default WishlistModal;