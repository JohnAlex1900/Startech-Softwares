
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 z-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                Startech Softwares
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
                Crafting Digital Solutions — Web, Apps, UI/UX, AI Prompts
            </p>
            <a 
                href="#contact" 
                className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-700 transition-transform transform hover:scale-105 shadow-lg"
            >
                Get In Touch
            </a>
        </div>
    </section>
  );
};

export default Hero;
