import { useReducer, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import axios from "../../utils/axiosConfig";

const AuthProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });

      const { token, user } = res.data;
      console.log("Login successful:", user);
      console.log("token in login function", token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user, role: user.role },
      });

      console.log("Auth State after Login:", state);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      dispatch({ type: "LOGIN_FAIL", payload: error.response?.data?.message });
    }
  };

  // ✅ Logout Function
  const logout = () => {
    console.log("Logging out user:", state.user);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    dispatch({ type: "LOGOUT" });

    console.log("Auth State after Logout:", state);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
