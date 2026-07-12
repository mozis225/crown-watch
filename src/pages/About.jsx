import "./About.css";
import { Watch, Award, Truck, ShieldCheck } from "lucide-react";

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <p className="about-eyebrow">Notre histoire</p>
        <h1>L'excellence horlogère, pensée pour vous</h1>
        <p className="about-lead">
          Crown Watch est né d'une passion pour l'horlogerie et d'une envie
          simple : rendre accessible, en Côte d'Ivoire, des montres élégantes
          et durables, sans compromis sur la qualité.
        </p>
      </div>

      <div className="about-values">
        <div className="value-card">
          <Watch size={28} />
          <h3>Sélection rigoureuse</h3>
          <p>
            Chaque montre est choisie pour son design, sa précision et sa
            durabilité, entre pièces classiques et modèles sportifs.
          </p>
        </div>

        <div className="value-card">
          <Award size={28} />
          <h3>Qualité garantie</h3>
          <p>
            Nous travaillons avec des matériaux de qualité pour vous offrir
            des montres qui traversent le temps sans se démoder.
          </p>
        </div>

        <div className="value-card">
          <Truck size={28} />
          <h3>Livraison rapide</h3>
          <p>
            Partout en Côte d'Ivoire, avec paiement à la livraison pour votre
            tranquillité d'esprit.
          </p>
        </div>

        <div className="value-card">
          <ShieldCheck size={28} />
          <h3>Confiance</h3>
          <p>
            Un service client réactif et à l'écoute, du premier clic jusqu'à
            la réception de votre commande.
          </p>
        </div>
      </div>

      <div className="about-story">
        <h2>Notre mission</h2>
        <p>
          Nous croyons qu'une montre n'est pas qu'un simple accessoire — c'est
          une signature, un détail qui en dit long sur celui ou celle qui la
          porte. Crown Watch a pour ambition de démocratiser le style et
          l'élégance horlogère pour tous les Ivoiriens, avec un service
          moderne, fiable et 100% pensé pour le marché local.
        </p>
      </div>
    </section>
  );
}

export default About;