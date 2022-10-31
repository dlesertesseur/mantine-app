import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = true;
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
