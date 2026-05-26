import { Link } from "react-router-dom";
import { navLinks } from "./navLinks";

export default function Navbar() {
  const currentUser = null;

  return (
    <nav className="navbar">
      <h3 className="navbar-text">Realworld Blog</h3>

      <div className="navbar-links">
        {navLinks(currentUser)
          .filter((btn) => btn.isVisible)
          .map((btn) => (
            <Link key={btn.title} to={btn.url} className="navbar-link">
              {btn.icon && <img src={btn.icon} alt={btn.title} />}

              {btn.title}
            </Link>
          ))}
      </div>
    </nav>
  );
}
