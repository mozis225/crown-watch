import "./Hero.css";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";
import heroWatch from "../../assets/images/hero/hero-watch.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-badge">
          👑 Nouvelle Collection 2026
        </span>

        <h1>
          Le temps révèle
          <br />
          <span>votre élégance.</span>
        </h1>

        <p>
          Découvrez une sélection de montres haut de gamme conçues
          pour ceux qui recherchent l'alliance parfaite entre
          élégance, précision et modernité.
        </p>

        <div className="hero-buttons">

          <NavLink to="/shop" className="primary-btn">
            Découvrir la collection
            <ArrowRight size={18} />
          </NavLink>

          <a href="#categories" className="secondary-btn">
            <ShoppingBag size={18} />
            Nos modèles
          </a>

        </div>

        <div className="hero-stats">

          <div>
            <h2>+500</h2>
            <span>Montres vendues</span>
          </div>

          <div>
            <h2>4.9★</h2>
            <span>Clients satisfaits</span>
          </div>

          <div>
            <h2>24H</h2>
            <span>Livraison rapide</span>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <div className="circle"></div>

        <img
          src={heroWatch}
          alt="Montre Crown Watch"
        />

      </div>

    </section>
  );
}

export default Hero;