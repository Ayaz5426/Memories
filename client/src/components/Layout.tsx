import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { isAuthenticated, logout, username } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark">♥</span>
          <div>
            <strong>Our Memories</strong>
            <small>Marriage & places we visited</small>
          </div>
        </Link>
        <nav>
          <Link to="/">Gallery</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin">Admin</Link>
              <button type="button" className="link-button" onClick={logout}>
                Log out ({username})
              </button>
            </>
          ) : (
            <Link to="/admin/login">Admin</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Made with love — your private collection of cherished moments.</p>
      </footer>
    </div>
  );
}
