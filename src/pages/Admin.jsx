import { useState, useEffect } from "react";
import "./Admin.css";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../firebase/productsService";
import { getAllOrders, updateOrderStatus } from "../firebase/ordersService";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Loader2,
  LogOut,
  Package,
} from "lucide-react";

const emptyForm = {
  name: "",
  brand: "Crown Watch",
  category: "Luxe",
  material: "Acier inoxydable",
  price: "",
  oldPrice: "",
  rating: "5",
  reviews: "0",
  isNew: false,
  description: "",
  imageUrl: "",
};

function Admin() {
  const { products, loading, refetch } = useProducts();
  const { logout } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("products"); // "products" | "orders"
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (activeTab === "orders") {
      loadOrders();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const productData = {
        ...form,
        price: Number(form.price),
        oldPrice: Number(form.oldPrice),
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        image: form.imageUrl,
      };

      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }

      resetForm();
      refetch();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      brand: product.brand || "Crown Watch",
      category: product.category || "Luxe",
      material: product.material || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      rating: product.rating || "5",
      reviews: product.reviews || "0",
      isNew: product.isNew || false,
      description: product.description || "",
      imageUrl: product.image || "",
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (product) => {
    if (!confirm(`Supprimer "${product.name}" ?`)) return;
    try {
      await deleteProduct(product.id);
      refetch();
    } catch (err) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  return (
    <section className="admin">
      <div className="admin-header">
        <h1>Espace Admin</h1>
        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} /> Déconnexion
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Produits
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Commandes
        </button>
      </div>

      {activeTab === "products" && (
        <>
          <form className="admin-form" onSubmit={handleSubmit}>
            <h2>{editingId ? "Modifier le produit" : "Ajouter un produit"}</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Nom</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Marque</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Catégorie</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Luxe">Luxe</option>
                  <option value="Classique">Classique</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>

              <div className="form-group">
                <label>Matière</label>
                <input
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Prix (FCFA)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ancien prix (FCFA)</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={form.oldPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Note (/5)</label>
                <input
                  type="number"
                  step="0.1"
                  max="5"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Nombre d'avis</label>
                <input
                  type="number"
                  name="reviews"
                  value={form.reviews}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={form.isNew}
                    onChange={handleChange}
                  />
                  Marquer comme "Nouveau"
                </label>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group full-width">
                <label>URL de l'image</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://exemple.com/image.jpg"
                  required
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="Aperçu"
                    className="image-preview"
                  />
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={18} className="spin" /> Enregistrement...
                  </>
                ) : editingId ? (
                  "Mettre à jour"
                ) : (
                  <>
                    <Plus size={18} /> Ajouter le produit
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  <X size={18} /> Annuler
                </button>
              )}
            </div>
          </form>

          <div className="admin-list">
            <h2>Produits ({products.length})</h2>

            {loading ? (
              <p>Chargement...</p>
            ) : (
              <div className="admin-table">
                {products.map((product) => (
                  <div className="admin-row" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="admin-row-info">
                      <h4>{product.name}</h4>
                      <p>
                        {product.category} ·{" "}
                        {product.price?.toLocaleString()} FCFA
                      </p>
                    </div>
                    <div className="admin-row-actions">
                      <button onClick={() => handleEdit(product)}>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(product)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "orders" && (
        <div className="admin-orders">
          <h2>Commandes ({orders.length})</h2>

          {ordersLoading ? (
            <p>Chargement...</p>
          ) : orders.length === 0 ? (
            <p className="no-orders">Aucune commande pour le moment.</p>
          ) : (
            <div className="orders-table">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card-header">
                    <div>
                      <h4>{order.customer?.fullName}</h4>
                      <p>{order.userEmail}</p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="En attente">En attente</option>
                      <option value="Confirmée">Confirmée</option>
                      <option value="En livraison">En livraison</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </select>
                  </div>

                  <div className="order-card-body">
                    <p>
                      <Package size={14} /> {order.items?.length} article(s)
                      — {order.grandTotal?.toLocaleString()} FCFA
                    </p>
                    <p className="order-address">
                      {order.customer?.phone} · {order.customer?.address},{" "}
                      {order.customer?.city}
                    </p>
                    {order.customer?.notes && (
                      <p className="order-notes">
                        Note : {order.customer.notes}
                      </p>
                    )}
                  </div>

                  <div className="order-card-items">
                    {order.items?.map((item, idx) => (
                      <span key={idx}>
                        {item.name} ×{item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;