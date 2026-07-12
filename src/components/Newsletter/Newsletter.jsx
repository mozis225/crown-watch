import { useState } from "react";
import "./Newsletter.css";
import { Mail } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    // Ici tu pourras plus tard connecter Firebase ou un service d'emailing
    console.log("Email inscrit :", email);

    setStatus("success");
    setEmail("");

    // Le message disparaît après quelques secondes
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <Mail size={36} className="newsletter-icon" />
        <h2>Rejoignez le Cercle Crown Watch</h2>
        <p>
          Inscrivez-vous pour recevoir en avant-première nos nouveautés et
          offres exclusives.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>

        {status === "success" && (
          <p className="newsletter-message success">
            Merci ! Vous êtes bien inscrit(e). 🎉
          </p>
        )}
        {status === "error" && (
          <p className="newsletter-message error">
            Veuillez entrer une adresse e-mail valide.
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;