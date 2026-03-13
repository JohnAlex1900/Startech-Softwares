import React from "react";
import { Link } from "react-router-dom";

const OFFICIAL_LOGO_URL = "https://res.cloudinary.com/dcxdamtgm/image/upload/v1773081049/41230A8E-56CC-4E27-9872-DD4C8E5A9DD3_hui5kr.png";

const Footer = () => {
  const year = new Date().getFullYear();

  const pageLinks = [
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-primary-950 border-t border-white/10">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="Startech Softwares logo"
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
              />
              <span className="font-black text-white text-base tracking-tight">
                STARTECH <span className="text-secondary-400">Softwares</span>
              </span>
            </Link>
            <p className="text-primary-300/50 text-xs mt-1">
              Empowering Businesses with Digital Excellence
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {pageLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-300/60 hover:text-secondary-400 text-sm transition-colors capitalize"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-primary-300/40">
          &copy; {year} Startech Softwares. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
