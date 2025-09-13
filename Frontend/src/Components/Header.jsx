import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header-container shared-container">
      <div className="logo">
        <img src="/logo.png" alt="SubsManager Logo" className="logo-img" />
        <span className="logo-text">SubsManager</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Home
        </NavLink>
        <a href="#features" className="nav-item">
          Features
        </a>
        <a href="#pricing" className="nav-item">
          Plans
        </a>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="btn btn-login">Login</Link>
        <Link to="/signup" className="btn btn-signup">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
