import "./ProductModal.css";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { X, Star, ShoppingBag, Heart, CheckCircle2 } from "lucide-react";
import { useProductModal } from "../../context/ProductModalContext";
import { useCart } from "../../context/CartContext";

function ProductModal() {
  const { selectedProduct, closeProduct } = useProductModal();
  const { addToCart } = useCart();

  if (!selectedProduct) return null;

  const watch = selectedProduct;
  const { isFavorite, toggleFavorite } = useWishlist();
  const { user } = useAuth();
  const { requireAuth } = useUI();

  const favorite = isFavorite(watch.id);

  const handleFavorite = () => {
    if (!user) {
      requireAuth();
      return;
    }
    toggleFavorite(watch.id);
  };

  return (
    <div className="modal-overlay" onClick={closeProduct}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image">
          <img src={watch.image} alt={watch.name} />
        </div>

        <div className="modal-info">
          <button className="modal-close" onClick={closeProduct}>
            <X size={20} />
          </button>

          <p className="modal-meta">
            {watch.category} · {watch.material}
          </p>

          <h2 className="modal-title">{watch.name}</h2>

          <div className="modal-rating">
            <Star size={16} />
            <span>{watch.rating} / 5</span>
          </div>

          <div className="modal-prices">
            <span className="modal-price">
              {watch.price.toLocaleString()} FCFA
            </span>
            <span className="modal-old-price">
              {watch.oldPrice.toLocaleString()} FCFA
            </span>
          </div>

          <div className="modal-stock">
            <CheckCircle2 size={16} />
            <span>En stock</span>
          </div>

          <div className="modal-divider" />

          <div className="modal-row">
            <span>Catégorie</span>
            <strong>{watch.category}</strong>
          </div>
          <div className="modal-row">
            <span>Matière</span>
            <strong>{watch.material}</strong>
          </div>

          <div className="modal-actions">
            <button
              className="modal-add-btn"
              onClick={() => addToCart(watch)}
            >
              <ShoppingBag size={18} />
              Ajouter au panier
            </button>
            <button
              className={`modal-fav-btn ${favorite ? "active" : ""}`}
              onClick={handleFavorite}
            >
              <Heart size={18} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;