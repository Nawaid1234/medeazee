import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
      navigate("/");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-10 border rounded shadow-lg">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-full my-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Login
      </button>
      <p className="text-center mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
