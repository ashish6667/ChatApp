import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get full user object from localStorage
  const storedUser = localStorage.getItem("ChatApp");

  // Try to parse it safely
  let parsedUser = undefined;
  try {
    parsedUser = storedUser ? JSON.parse(storedUser) : undefined;
  } catch (err) {
    console.error("Failed to parse user data from localStorage:", err);
  }

  const [authUser, setAuthUser] = useState(parsedUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
