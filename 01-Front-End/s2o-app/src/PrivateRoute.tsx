import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  element: JSX.Element;
  requiredRole: string;
}

const PrivateRoute = ({ element, requiredRole }: PrivateRouteProps) => {
  const [userRoles, setUserRoles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();

  // Fetch current user roles based on the JWT token
  const getCurrentUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError(true); // If no token is found, trigger error
      setLoading(false);
      return;
    }

    try {
      // Decode the token to check for expiration and extract roles
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken); // Log the decoded token

      // Assuming the roles are stored in the 'roles' field of the decoded token
      const roles = decodedToken.roles || [];
      setUserRoles(roles);
    } catch (error) {
      console.error('Error decoding token:', error);
      setError(true); // Handle errors while decoding the token
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  // Effect to load current user roles from the token
  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login if error occurs
  }

  // Check if the user has the required role
  if (userRoles && userRoles.includes(requiredRole)) {
    return element; // Render the protected route if the user has the required role
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login if no required role
  }
};

export default PrivateRoute;