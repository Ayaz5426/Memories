import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import {
  AppShell,
  Brand,
  BrandMark,
  GlobalStyle,
  LogoutButton,
  Main,
  SiteFooter,
  SiteHeader,
  SiteNav,
  theme,
} from '../styles';

export default function Layout() {
  const { isAuthenticated, logout, username } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppShell>
        <SiteHeader>
          <Link to="/">
            <Brand>
              <BrandMark>♥</BrandMark>
              <span>
            <strong>Our Memories</strong>
              <small>Our honeymoon journal</small>
              </span>
            </Brand>
          </Link>
          <SiteNav>
            <Link to="/">Gallery</Link>
            <Link to="/for-you">For you</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin">Admin</Link>
                <LogoutButton type="button" onClick={logout}>
                  Log out ({username})
                </LogoutButton>
              </>
            ) : (
              <Link to="/admin/login">Admin</Link>
            )}
          </SiteNav>
        </SiteHeader>
        <Main><Outlet /></Main>
        <SiteFooter>
          <p>Our little honeymoon journal, written in places and remembered in moments.</p>
        </SiteFooter>
      </AppShell>
    </ThemeProvider>
  );
}
