import { useState } from "react";
import "./Contact.css";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { sendMessage } from "../firebase/messagesService";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await sendMessage(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Une erreur est survenue. Réessaie dans un instant.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-header">
        <p className="contact-eyebrow">Contact</p>
        <h1>Parlons de votre prochaine montre</h1>
        <p className="contact-lead">
          Une question, une suggestion, ou besoin d'aide pour choisir ? Notre
          équipe vous répond rapidement.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-info-item">
            <MapPin size={20} />
            <div>
              <h4>Adresse</h4>
              <p>Abidjan, Côte d'Ivoire</p>
            </div>
          </div>

          <div className="contact-info-item">
            <Phone size={20} />
            <div>
              <h4>Téléphone</h4>
              <p>+225 00 00 00 00</p>
            </div>
          </div>

          <div className="contact-info-item">
            <Mail size={20} />
            <div>
              <h4>E-mail</h4>
              <p>contact@crownwatch.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {sent ? (
            <div className="contact-success">
              <CheckCircle2 size={48} />
              <h3>Message envoyé !</h3>
              <p>Merci de nous avoir contactés, nous répondrons bientôt.</p>
              <button onClick={() => setSent(false)}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <div className="contact-field">
                  <label>Nom complet</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label>Sujet</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="contact-error">{error}</p>}

              <button
                type="submit"
                className="contact-submit"
                disabled={sending}
              >
                {sending ? (
                  "Envoi..."
                ) : (
                  <>
                    <Send size={18} /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;