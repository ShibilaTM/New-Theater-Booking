import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const getToken = sessionStorage.getItem('userToken');
  const location = useLocation();

  if (!getToken) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};