import "./Cart.css";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

function Cart({ isOpen, onClose, onCheckout }) {
  const { items, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Mon Panier</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Votre panier est vide.</p>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">
                    {item.price.toLocaleString()} FCFA
                  </p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Sous-total</span>
              <span>{totalPrice.toLocaleString()} FCFA</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Passer la commande
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Cart;