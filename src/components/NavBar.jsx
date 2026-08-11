import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Presentación", href: "#hero" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-6xl rounded-full md:rounded-2xl px-6 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl dark:shadow-violet-950/30"
            : "bg-white/40 dark:bg-slate-900/45 backdrop-blur-md border border-white/30 dark:border-slate-800/60 shadow-lg shadow-slate-950/5 dark:shadow-violet-950/20"
        }`}
      >
        <a
          href="/"
          className="font-display text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          aria-label="Ir al inicio"
        >
          {"</Jhorman Cortes>"}
        </a>

        <div className="flex items-center gap-6">
          {/* menu pc */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative font-body text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-white transition-colors duration-300 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500/50 transition-all duration-300 shadow-sm backdrop-blur-sm"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-5 h-5 text-violet-600 animate-fade-in" />
            )}
          </button>

          <button
            className="md:hidden text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* menu cel */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transform transition-transform duration-300 md:hidden pointer-events-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Menú
          </span>
          <button
            aria-label="Cerrar menú"
            className="text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col items-center gap-6 mt-16 text-xl">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-body text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
