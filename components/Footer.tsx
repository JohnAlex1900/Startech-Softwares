const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Startech Softwares. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
