import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 border-t border-white/10">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-600">
                <span className="text-white font-black text-xs">ST</span>
              </div>
              <span className="font-black text-white text-base tracking-tight">
                STARTECH <span className="text-secondary-400">Softwares</span>
              </span>
            </div>
            <p className="text-primary-300/50 text-xs mt-1">
              Empowering Businesses with Digital Excellence
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
            {["#about", "#services", "#highlights", "#work", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="text-primary-300/60 hover:text-secondary-400 text-sm transition-colors capitalize"
              >
                {href.replace("#", "")}
              </a>
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
