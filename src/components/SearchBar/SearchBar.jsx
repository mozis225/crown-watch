import { useState, useMemo } from "react";
import "./SearchBar.css";
import { X, Search } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useProductModal } from "../../context/ProductModalContext";

function SearchBar({ isOpen, onClose }) {
  const { products } = useProducts();
  const { openProduct } = useProductModal();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.material?.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  const handleSelect = (product) => {
    openProduct(product);
    setQuery("");
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <div className="search-bar-inline">
      <div className="search-bar-row">
        <Search size={18} />
        <input
          type="text"
          autoFocus
          placeholder="Rechercher une montre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-close" onClick={handleClose}>
          <X size={20} />
        </button>
      </div>

      {query.trim().length > 0 && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="search-empty">Aucun résultat pour "{query}"</p>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                className="search-result-item"
                onClick={() => handleSelect(product)}
              >
                <img src={product.image} alt={product.name} />
                <div className="search-result-info">
                  <h4>{product.name}</h4>
                  <p>{product.category}</p>
                </div>
                <span className="search-result-price">
                  {product.price?.toLocaleString()} FCFA
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;