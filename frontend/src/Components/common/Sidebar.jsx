import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    {
      name: "Category",
      path: "/dashboard/category-management",
      icon: "🏷️",
    },
    { name: "Transactions", path: "/dashboard/transactions", icon: "💳" },
    { name: "Analytics", path: "/dashboard/analytics", icon: "📈" },
    { name: "Profile Settings", path: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="w-64 bg-gray-800 shadow-md h-full p-6">
      <div className="flex items-center mb-8">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full w-10 h-10 mr-3"
        />
        <h1 className="text-xl font-bold">Hello, {user?.username || "User"}</h1>
      </div>
      <ul className="space-y-4">
        {navLinks.map(({ name, path, icon }) => (
          <li key={name}>
            <Link
              to={path}
              className={`block px-4 py-2 rounded-lg transition hover:bg-gray-700 ${
                pathname === path ? "bg-gray-700" : ""
              }`}
            >
              <span className="mr-2">{icon}</span>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
      >
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
