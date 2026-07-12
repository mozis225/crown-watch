import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);

  const requireAuth = () => setIsAuthPromptOpen(true);

  return (
    <UIContext.Provider
      value={{ isAuthPromptOpen, setIsAuthPromptOpen, requireAuth }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}