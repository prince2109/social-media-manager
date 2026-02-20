import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Social Media Manager</h1>
      </div>
      <div className="navbar-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          🏠 Dashboard
        </Link>
        <Link to="/insights" className={isActive("/insights") ? "active" : ""}>
          📊 Insights
        </Link>
        <Link to="/schedule" className={isActive("/schedule") ? "active" : ""}>
          📅 Schedule
        </Link>
        <Link to="/ai" className={isActive("/ai") ? "active" : ""}>
          🤖 AI Tools
        </Link>
      </div>
    </nav>
  );
}
