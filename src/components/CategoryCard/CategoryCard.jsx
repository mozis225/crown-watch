import "./CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?categorie=${category.name}`}
      className="category-card"
    >
      <img src={category.image} alt={category.name} />
      <div className="category-overlay">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;