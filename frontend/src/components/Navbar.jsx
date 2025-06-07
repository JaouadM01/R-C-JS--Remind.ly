import { Link, useLocation } from 'react-router-dom';
import "../css/Navbar.css"

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Calendar", path: "/calendar" },
    { label: "Profile", path: "/profile" },
    { label: "Login", path: "/login" },
  ];

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''
            }`}
        >
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
