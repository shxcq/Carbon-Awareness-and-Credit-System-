import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Adjust path as needed

const ProtectedRoute = ({ component }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking auth state...");  // Log when Firebase starts checking
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User status updated:", currentUser); // Log Firebase user state
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    console.log("Loading auth state..."); // Log if loading is stuck
    return <p>Loading...</p>;
  }

  if (!user) {
    console.warn("Unauthorized access attempt. Redirecting to login."); // Log if user is not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  console.log("User authenticated, rendering component.");
  return component;
};

export default ProtectedRoute;
