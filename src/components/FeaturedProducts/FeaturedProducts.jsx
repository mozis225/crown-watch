import "./FeaturedProducts.css";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import SectionTitle from "../SectionTitle/SectionTitle";

function FeaturedProducts() {
  const { products, loading, error } = useProducts();

  // On affiche les 4 premiers produits (tu peux changer la logique plus tard,
  // ex: filtrer par note, ou ajouter un champ "featured" dans Firestore)
  const featured = products.slice(0, 4);

  return (
    <section className="featured">
      <SectionTitle
        title="Nos Meilleures Ventes"
        subtitle="Découvrez les modèles les plus appréciés de notre collection."
      />

      {loading && <p className="featured-status">Chargement des produits...</p>}
      {error && <p className="featured-status error">Erreur : {error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {featured.map((watch) => (
            <ProductCard key={watch.id} watch={watch} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;