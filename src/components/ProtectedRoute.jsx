import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <p style={{ color: "white", padding: 100 }}>Chargement...</p>;

  if (!user || !isAdmin) return <Navigate to="/admin-login" replace />;

  return children;
}

export default ProtectedRoute;