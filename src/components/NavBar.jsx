import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useMagnetic } from "../hooks/useMagnetic";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const ctaBtnRef = useMagnetic(0.2);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Presentación", href: "#hero", id: "01" },
    { label: "Experiencia", href: "#experiencia", id: "02" },
    { label: "Proyectos", href: "#proyectos", id: "03" },
    { label: "Contacto", href: "#contacto", id: "04" },
  ];

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-6xl rounded-full px-5 md:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-[#0E1019]/85 backdrop-blur-xl border border-slate-200/90 dark:border-[#1E2337] shadow-lg shadow-black/5 dark:shadow-black/30"
            : "bg-white/50 dark:bg-[#0E1019]/50 backdrop-blur-md border border-slate-200/60 dark:border-[#1A1D2B]/80"
        }`}
      >
        {/* LOGO CON FORMATO TÉCNICO EDITORIAL */}
        <a
          href="#hero"
          className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none rounded-full p-1"
          aria-label="Ir al inicio de la página"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1A2FFB] group-hover:scale-125 transition-transform duration-300" aria-hidden="true"></span>
          <span className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white tracking-tight">
            Jhorman<span className="text-slate-400 dark:text-slate-500 font-normal">.dev</span>
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-slate-100 dark:bg-[#181B2B] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#22273D]">
            FULL_STACK
          </span>
        </a>

        {/* NAVEGACIÓN DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-xs uppercase tracking-widest font-semibold text-slate-600 dark:text-slate-400 hover:text-[#1A2FFB] dark:hover:text-white transition-colors duration-200 flex items-center gap-1.5 group focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none rounded px-1"
                >
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 group-hover:text-[#1A2FFB] transition-colors" aria-hidden="true">
                    {item.id}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ACCIONES DERECHA: STATUS + THEME + CTA */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Badge de Disponibilidad en Vivo */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-live-pulse" aria-hidden="true"></span>
            <span>Disponible</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema entre modo claro y oscuro"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#181B2B] border border-slate-200 dark:border-[#22273D] text-slate-700 dark:text-slate-300 hover:border-[#1A2FFB] dark:hover:border-[#1A2FFB] hover:text-[#1A2FFB] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-[#1A2FFB] transition-transform duration-300 hover:-rotate-12" aria-hidden="true" />
            )}
          </button>

          {/* Botón Lusion Pill Magnético "Hablemos" */}
          <div ref={ctaBtnRef} className="hidden sm:inline-block">
            <a
              href="#contacto"
              className="group relative inline-flex items-center justify-center h-10 px-5 rounded-full bg-[#1A2FFB] hover:bg-[#0016EC] text-white text-xs font-display font-bold uppercase tracking-wider overflow-hidden transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:ring-offset-2 focus-visible:outline-none shadow-md shadow-blue-600/20"
            >
              <span className="relative flex items-center gap-1.5">
                <span className="transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:-translate-x-1">
                  Hablemos
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </a>
          </div>

          {/* Hamburguesa Mobile */}
          <button
            type="button"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#181B2B] border border-slate-200 dark:border-[#22273D] text-slate-800 dark:text-slate-200 hover:text-[#1A2FFB] focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
            aria-label="Abrir menú de navegación"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL A PANTALLA COMPLETA */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-white/98 dark:bg-[#090A0F]/98 backdrop-blur-2xl transition-all duration-300 md:hidden pointer-events-auto flex flex-col justify-between p-8 z-50 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center pb-6 border-b border-slate-200 dark:border-[#1E2337]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A2FFB]" aria-hidden="true"></span>
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Jhorman<span className="text-slate-500">.dev</span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#181B2B] text-slate-800 dark:text-slate-200 hover:text-[#1A2FFB] focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
            onClick={() => setOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-6 my-auto">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between font-display text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-[#1A2FFB] dark:hover:text-[#1A2FFB] transition-colors py-2 border-b border-slate-100 dark:border-[#141724]"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-600" aria-hidden="true">
                  {item.id}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-slate-200 dark:border-[#1E2337] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">ESTADO</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-live-pulse" aria-hidden="true"></span>
              Disponible para proyectos
            </span>
          </div>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="w-full h-12 rounded-full bg-[#1A2FFB] text-white flex items-center justify-center font-display text-xs uppercase tracking-widest font-bold"
          >
            Iniciar Proyecto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
