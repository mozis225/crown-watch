import { useState } from "react";
import "./CheckoutModal.css";
import { X, CheckCircle2, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../firebase/ordersService";

function CheckoutModal({ isOpen, onClose, onRequireAuth }) {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.displayName || "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      onClose();
      onRequireAuth();
      return;
    }

    setSaving(true);
    try {
      await createOrder({
        userId: user.uid,
        userEmail: user.email,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        total: totalPrice,
        deliveryFee: 2000,
        grandTotal: totalPrice + 2000,
        customer: form,
      });

      clearCart();
      setSuccess(true);
    } catch (err) {
      alert("Erreur lors de la commande : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  if (items.length === 0 && !success) {
    return (
      <div className="checkout-overlay" onClick={handleClose}>
        <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
          <button className="checkout-close" onClick={handleClose}>
            <X size={20} />
          </button>
          <p className="checkout-empty">Votre panier est vide.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="checkout-overlay" onClick={handleClose}>
        <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
          <button className="checkout-close" onClick={handleClose}>
            <X size={20} />
          </button>
          <div className="checkout-success">
            <CheckCircle2 size={54} />
            <h2>Commande confirmée !</h2>
            <p>
              Merci {form.fullName}, ta commande a bien été enregistrée. Tu
              seras contacté(e) au {form.phone} pour la livraison.
            </p>
            <button className="checkout-submit" onClick={handleClose}>
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-close" onClick={handleClose}>
          <X size={20} />
        </button>

        <h2 className="checkout-title">Finaliser la commande</h2>

        <div className="checkout-summary">
          {items.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {(item.price * item.quantity).toLocaleString()} FCFA
              </span>
            </div>
          ))}
          <div className="checkout-summary-row">
            <span>Sous-total</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
          <div className="checkout-summary-row">
            <span>Livraison</span>
            <span>2 000 FCFA</span>
          </div>
          <div className="checkout-summary-row total">
            <span>Total</span>
            <span>{(totalPrice + 2000).toLocaleString()} FCFA</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-field">
            <label>Nom complet</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkout-field">
            <label>Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="07 00 00 00 00"
              required
            />
          </div>

          <div className="checkout-row">
            <div className="checkout-field">
              <label>Ville / Commune</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="checkout-field">
            <label>Adresse de livraison</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Quartier, rue, indications..."
              required
            />
          </div>

          <div className="checkout-field">
            <label>Notes (optionnel)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="checkout-payment-note">
            <Truck size={18} />
            <span>Paiement à la livraison</span>
          </div>

          <button type="submit" className="checkout-submit" disabled={saving}>
            {saving ? "Envoi..." : "Confirmer la commande"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;