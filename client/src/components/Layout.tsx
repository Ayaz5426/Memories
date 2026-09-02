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
            <small>Marriage & places we visited</small>
              </span>
            </Brand>
          </Link>
          <SiteNav>
            <Link to="/">Gallery</Link>
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
          <p>Made with love — your private collection of cherished moments.</p>
        </SiteFooter>
      </AppShell>
    </ThemeProvider>
  );
}
