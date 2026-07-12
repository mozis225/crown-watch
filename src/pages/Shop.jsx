import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Shop.css";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";
import SectionTitle from "../components/SectionTitle/SectionTitle";

function Shop() {
  const { products: watches, loading, error } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || "Toutes"
  );
  const [maxPrice, setMaxPrice] = useState(350000);
  const [selectedMaterial, setSelectedMaterial] = useState("Toutes");
  const [sortBy, setSortBy] = useState("recommandes");

  // Synchronise le filtre si l'URL change (ex: clic sur une CategoryCard)
  useEffect(() => {
    const categorieFromUrl = searchParams.get("categorie");
    if (categorieFromUrl) {
      setSelectedCategory(categorieFromUrl);
    }
  }, [searchParams]);

  // Génère les listes uniques à partir des données
  const categories = ["Toutes", ...new Set(watches.map((w) => w.category))];
  const materials = ["Toutes", ...new Set(watches.map((w) => w.material))];

  const filteredWatches = useMemo(() => {
    let result = watches.filter((w) => {
      const matchCategory =
        selectedCategory === "Toutes" ||
        w.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchPrice = w.price <= maxPrice;
      const matchMaterial =
        selectedMaterial === "Toutes" || w.material === selectedMaterial;
      return matchCategory && matchPrice && matchMaterial;
    });

    switch (sortBy) {
      case "prix-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "prix-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nom":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // "recommandes" garde l'ordre original
    }

    return result;
  }, [watches, selectedCategory, maxPrice, selectedMaterial, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("Toutes");
    setMaxPrice(350000);
    setSelectedMaterial("Toutes");
    setSortBy("recommandes");
    setSearchParams({}); // nettoie aussi l'URL
  };

  return (
    <section className="shop">
      <SectionTitle
        title="La Boutique"
        subtitle="Explorez notre collection complète."
      />

      <div className="shop-layout">
        {/* Panneau de filtres */}
        <aside className="filters-panel">
          <div className="filters-header">
            <h3>Filtres</h3>
            <button className="reset-btn" onClick={resetFilters}>
              Réinitialiser
            </button>
          </div>

          <div className="filter-group">
            <label>Catégorie</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Prix maximum : {maxPrice.toLocaleString()} FCFA</label>
            <input
              type="range"
              min="20000"
              max="350000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Matière</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              {materials.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Résultats */}
        <div className="shop-results">
          <div className="results-header">
            <p>{filteredWatches.length} produit(s)</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recommandes">Recommandés</option>
              <option value="prix-asc">Prix croissant</option>
              <option value="prix-desc">Prix décroissant</option>
              <option value="nom">Nom A-Z</option>
            </select>
          </div>

          {loading ? (
            <p className="no-results">Chargement des produits...</p>
          ) : error ? (
            <p className="no-results">Erreur : {error}</p>
          ) : filteredWatches.length > 0 ? (
            <div className="shop-grid">
              {filteredWatches.map((watch) => (
                <ProductCard key={watch.id} watch={watch} />
              ))}
            </div>
          ) : (
            <p className="no-results">
              Aucune montre ne correspond à ces critères.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Shop;