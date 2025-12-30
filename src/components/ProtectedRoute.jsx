import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, userRole } = useContext(GlobalContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
