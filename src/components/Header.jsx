import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1>Medeazee</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.username}!</span>
            <button onClick={logout} className="bg-red-500 p-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 p-2 rounded">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
