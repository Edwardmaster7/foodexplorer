import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("@foodex:token");
    const user = localStorage.getItem("@foodex:user");
    const date = localStorage.getItem("@foodex:expires_at");

    if (token && user) {
      // Check if token is expired
      const expiresAt = new Date(
        date
      );
      if (expiresAt > new Date()) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setData({ user: JSON.parse(user[0]), isAdmin: JSON.parse(user[2]), token });
        console.log("Token is valid");

      } else {
        signOut();
      }
    }

  }, []);


  async function signIn({ email, password }) {
    signOut();

    const data = { email, password };

    try {
      const response = await api.post("/sessions", data);
      const { id: user, token, isAdmin } = response.data;
      console.log(response.data);
      
      const expirationDate = new Date(Date.now() + 3600000); // 1 hour
      
      
      
      localStorage.setItem("@foodex:user", [user, isAdmin]);
      localStorage.setItem("@foodex:token", token);
      localStorage.setItem("@foodex:expires_at", expirationDate);
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token, isAdmin });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        console.log(data);
        return alert(`Ocorreu um erro no login\n${error.response.data.message}`);
      } else {
        alert("Ocorreu um erro no login...");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@foodex:user");
    localStorage.removeItem("@foodex:token");
    localStorage.removeItem("@foodex:expires_at");

    setData({});
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user: { id: data.user, isAdmin: data.isAdmin } }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context || context.length === 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
