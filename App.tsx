
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Highlights from './components/Highlights';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import BusinessAnalyzerPage from './pages/BusinessAnalyzerPage';
import ContactPage from './pages/ContactPage';
import AdminLeadsPage from './pages/AdminLeadsPage';
import AdminAuthPage from './pages/AdminAuthPage';
import AdminNotFoundPage from './pages/AdminNotFoundPage';
import { isAllowedAdminUser } from './adminAccess';
import { auth, isFirebaseAuthConfigured } from './firebaseClient';

// Scroll to top on route change, respecting prefers-reduced-motion
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'instant' : 'smooth' });
  }, [pathname]);
  return null;
};

const HomePage: React.FC = () => (
  <main className="flex-grow">
    <Hero />
    <About />
    <Services />
    <Highlights />
    <Projects />
    <TechStack />
    <Contact />
  </main>
);

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth || !isFirebaseAuthConfigured) {
      setChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  if (checking) {
    return <main className="flex-grow px-6 py-12 text-sm text-slate-600 dark:text-slate-300">Checking admin session...</main>;
  }

  if (!auth || !isFirebaseAuthConfigured || !user || !isAllowedAdminUser(user)) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void }> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<main className="flex-grow"><AboutPage /></main>} />
        <Route path="/services" element={<main className="flex-grow"><ServicesPage /></main>} />
        <Route path="/analyzer" element={<main className="flex-grow"><BusinessAnalyzerPage /></main>} />
        <Route path="/portfolio" element={<main className="flex-grow"><PortfolioPage /></main>} />
        <Route path="/contact" element={<main className="flex-grow"><ContactPage /></main>} />
        <Route path="/admin" element={<main className="flex-grow"><AdminAuthPage /></main>} />
        <Route
          path="/admin/leads"
          element={(
            <ProtectedAdminRoute>
              <main className="flex-grow"><AdminLeadsPage /></main>
            </ProtectedAdminRoute>
          )}
        />
        <Route path="/admin/*" element={<main className="flex-grow"><AdminNotFoundPage /></main>} />
      </Routes>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <BrowserRouter>
      <AppContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </BrowserRouter>
  );
};

export default App;
