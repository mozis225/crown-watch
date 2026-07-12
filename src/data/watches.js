import watch1 from "../assets/images/products/watch1.jpg";
import watch2 from "../assets/images/products/watch2.jpg";
import watch3 from "../assets/images/products/watch3.jpg";
import watch4 from "../assets/images/products/watch4.jpg";

const watches = [
  {
    id: 1,
    name: "Royal Chronograph",
    brand: "Crown Watch",
    category: "Luxe",
    material: "Acier inoxydable",
    price: 185000,
    oldPrice: 220000,
    rating: 4.9,
    reviews: 124,
    isNew: true,
    image: watch1,
    description:
      "Une montre chronographe élégante conçue pour les amateurs de précision."
  },

  {
    id: 2,
    name: "Classic Silver",
    brand: "Crown Watch",
    category: "Classique",
    material: "Acier inoxydable",
    price: 95000,
    oldPrice: 110000,
    rating: 4.8,
    reviews: 87,
    isNew: false,
    image: watch2,
    description:
      "Un design intemporel avec un bracelet en acier inoxydable."
  },

  {
    id: 3,
    name: "Midnight Black",
    brand: "Crown Watch",
    category: "Sport",
    material: "Silicone",
    price: 145000,
    oldPrice: 170000,
    rating: 5.0,
    reviews: 201,
    isNew: true,
    image: watch3,
    description:
      "Une montre sportive résistante à l'eau et aux rayures."
  },

  {
    id: 4,
    name: "Golden Prestige",
    brand: "Crown Watch",
    category: "Luxe",
    material: "Or",
    price: 265000,
    oldPrice: 310000,
    rating: 4.9,
    reviews: 159,
    isNew: false,
    image: watch4,
    description:
      "Le choix parfait pour les grandes occasions."
  },
];

export default watches;