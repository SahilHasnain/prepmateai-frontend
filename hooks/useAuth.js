import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/appwrite";

/**
 * Custom hook for managing authentication state
 * @returns {Object} { user, loading, refreshUser }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    checkUser();
  }, []);

  // Check if user is logged in
  const checkUser = async () => {
    setLoading(true);
    const { success, data } = await getCurrentUser();
    setUser(success ? data : null);
    setLoading(false);
  };

  // Refresh user data manually
  const refreshUser = () => {
    checkUser();
  };

  return { user, loading, refreshUser };
};
