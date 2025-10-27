import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🎓 AI Learning Platform
          </Link>
          
          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
                <Link to="/learn" className="navbar-link">
                  Learn
                </Link>
                <Link to="/history" className="navbar-link">
                  History
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="navbar-link">
                    Admin
                  </Link>
                )}
                <div className="navbar-user">
                  <span>Hello, {user.name}</span>
                  <button onClick={logout} className="btn btn-outline">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;