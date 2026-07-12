import Hero from "../components/Hero/Hero";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Newsletter from "../components/Newsletter/Newsletter";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import categories from "../data/categories";

function Home() {
  return (
    <>
      <Hero />

      <section id="categories" className="categories-section">
        <SectionTitle
          title="Nos Catégories"
          subtitle="Trouvez le style qui vous correspond."
        />
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <FeaturedProducts />
      <Newsletter />
    </>
  );
}

export default Home;