import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const role = localStorage.getItem('userRole');
  return role === allowedRole ? children : <Navigate to="/login" />;
}
