import { createContext, useContext, useState } from "react";

const ProductModalContext = createContext();

export function ProductModalProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProduct = (watch) => setSelectedProduct(watch);
  const closeProduct = () => setSelectedProduct(null);

  return (
    <ProductModalContext.Provider
      value={{ selectedProduct, openProduct, closeProduct }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  return useContext(ProductModalContext);
}