import "./ProductCard.css";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useProductModal } from "../../context/ProductModalContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

function ProductCard({ watch }) {
  const { addToCart } = useCart();
  const { openProduct } = useProductModal();
  const { isFavorite, toggleFavorite } = useWishlist();
  const { user } = useAuth();
  const { requireAuth } = useUI();

  const favorite = isFavorite(watch.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(watch);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!user) {
      requireAuth();
      return;
    }
    toggleFavorite(watch.id);
  };

  return (
    <article className="product-card" onClick={() => openProduct(watch)}>
      {watch.isNew && <span className="badge">Nouveau</span>}

      <button
        className={`favorite-btn ${favorite ? "active" : ""}`}
        onClick={handleFavorite}
      >
        <Heart size={20} fill={favorite ? "currentColor" : "none"} />
      </button>

      <div className="image-container">
        <img src={watch.image} alt={watch.name} />
      </div>

      <div className="product-content">
        <p className="category">{watch.category}</p>
        <h3>{watch.name}</h3>

        <div className="prices">
          <span className="price">{watch.price.toLocaleString()} FCFA</span>
          <span className="old-price">
            {watch.oldPrice.toLocaleString()} FCFA
          </span>
        </div>

        <button className="cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={18} />
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default ProductCard;