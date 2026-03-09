import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Logo: React.FC = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-md shadow-secondary-500/30">
      <span className="text-white font-black text-sm tracking-tight">ST</span>
    </div>
    <span className="font-black text-lg text-primary-900 dark:text-white tracking-tight">
      STARTECH <span className="text-secondary-500 dark:text-secondary-400">Softwares</span>
    </span>
  </div>
);

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#highlights", label: "Why Us" },
    { href: "#work", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-primary-950/90 backdrop-blur-lg shadow-md shadow-primary-900/10"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <a href="#hero" aria-label="Startech Softwares home">
            <Logo />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="#contact"
              className="hidden sm:inline-block px-5 py-2 text-sm font-bold text-white bg-primary-900 hover:bg-primary-800 dark:bg-secondary-500 dark:hover:bg-secondary-400 rounded-lg transition-colors shadow"
            >
              Get Started
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-primary-800 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-primary-800 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-primary-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-3 pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-slate-700 dark:text-slate-300 hover:text-secondary-600 dark:hover:text-secondary-400 font-medium py-1 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="mt-2 px-5 py-2.5 text-sm font-bold text-white bg-primary-900 hover:bg-primary-800 rounded-lg text-center transition-colors"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
