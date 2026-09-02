import { createGlobalStyle, styled } from 'styled-components';

export const theme = {
  colors: {
    ink: '#f6f0e5',
    inkSoft: '#a9c1bc',
    paper: '#102a2e',
    surface: '#f6f0e5',
    line: 'rgba(246, 240, 229, 0.18)',
    teal: '#146c70',
    coral: '#e36f55',
    moss: '#5d7a61',
    paleTeal: '#173c40',
    paleCoral: '#562f31',
  },
  fonts: {
    display: "'DM Serif Display', Georgia, serif",
    body: "'Manrope', 'Helvetica Neue', sans-serif",
  },
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700&display=swap');

  :root {
    color: ${theme.colors.ink};
    background: ${theme.colors.paper};
    font-family: ${theme.fonts.body};
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  * { box-sizing: border-box; }
  body { margin: 0; min-width: 320px; background: ${theme.colors.paper}; color: ${theme.colors.ink}; }
  a { color: inherit; text-decoration: none; }
  img, video { display: block; max-width: 100%; }
  button, input, textarea, select { font: inherit; }
`;

export const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(135deg, rgba(20, 108, 112, 0.5), transparent 32%),
    ${theme.colors.paper};
`;

export const SiteHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.1rem max(1.25rem, calc((100vw - 1100px) / 2));
  border-bottom: 1px solid ${theme.colors.line};
  background: rgba(16, 42, 46, 0.9);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Brand = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  strong { display: block; font-family: ${theme.fonts.display}; font-size: 1.35rem; font-weight: 400; line-height: 1; }
  small { display: block; color: ${theme.colors.inkSoft}; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.3rem; }
`;

export const BrandMark = styled.span`
  width: 2.7rem;
  height: 2.7rem;
  display: grid;
  place-items: center;
  border-radius: 0.8rem;
  background: ${theme.colors.coral};
  color: white;
  font-size: 1.15rem;
  transform: rotate(-6deg);
`;

export const SiteNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  color: ${theme.colors.inkSoft};
  font-size: 0.86rem;
  font-weight: 600;
  a:hover, button:hover { color: ${theme.colors.teal}; }
`;

export const LogoutButton = styled.button`
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
`;

export const Main = styled.main`
  flex: 1;
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3.5rem 0 5rem;
`;

export const SiteFooter = styled.footer`
  padding: 1.5rem 1rem 2rem;
  text-align: center;
  color: ${theme.colors.inkSoft};
  font-size: 0.78rem;
  letter-spacing: 0.04em;
`;