import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("token in login", localStorage.getItem("token"));

      navigate("/contests"); // ✅ Navigate to contests page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login Error:", errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-gray-950 text-white py-3 rounded-md hover:bg-gray-900 transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
