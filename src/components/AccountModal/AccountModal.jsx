import "./AccountModal.css";
import { X, Package, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../hooks/useOrders";

function AccountModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { orders, loading } = useOrders();

  if (!isOpen || !user) return null;

  const initial = user.displayName?.[0]?.toUpperCase() || "U";

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.grandTotal || 0),
    0
  );

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="account-overlay" onClick={onClose}>
      <aside className="account-panel" onClick={(e) => e.stopPropagation()}>
        <div className="account-header">
          <div className="account-header-title">
            <h2>Mon compte</h2>
          </div>
          <button className="account-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="account-profile">
          <div className="account-avatar">{initial}</div>
          <div>
            <h3>{user.displayName || "Client"}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="account-stats">
          <div className="account-stat">
            <span className="stat-value">{orders.length}</span>
            <span className="stat-label">
              Commande{orders.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="account-stat">
            <span className="stat-value">
              {totalSpent.toLocaleString()} FCFA
            </span>
            <span className="stat-label">Dépensés</span>
          </div>
        </div>

        <div className="account-orders">
          <div className="account-orders-title">
            <Package size={16} />
            <span>Mes commandes</span>
          </div>

          {loading ? (
            <p className="account-empty">Chargement...</p>
          ) : orders.length === 0 ? (
            <p className="account-empty">Aucune commande pour le moment.</p>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div className="order-item" key={order.id}>
                  <div className="order-item-header">
                    <span className="order-status">{order.status}</span>
                    <span className="order-total">
                      {order.grandTotal?.toLocaleString()} FCFA
                    </span>
                  </div>
                  <p className="order-products">
                    {order.items
                      ?.map((i) => `${i.name} ×${i.quantity}`)
                      .join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="account-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Se déconnecter
        </button>
      </aside>
    </div>
  );
}

export default AccountModal;