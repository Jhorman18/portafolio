import { useState, useEffect } from "react";
import { Github, Linkedin, ArrowUp, Globe } from "lucide-react";

const Footer = () => {
  const [timeStr, setTimeStr] = useState("");
  const year = new Date().getFullYear();

  // Reloj en tiempo real para Bogotá, Colombia (GMT-5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("es-CO", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Jhorman18", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jhorman-steven-cortes-lasso/", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Presentación", href: "#hero" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="relative pt-16 pb-12 border-t border-slate-200 dark:border-[#1A1D2D] bg-slate-50/50 dark:bg-[#07080C]">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-12">

          {/* COLUMNA 1: IDENTIDAD & RELOJ EN VIVO (6 COLS) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A2FFB]" aria-hidden="true"></span>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Jhorman Cortes
              </span>
            </div>

            <p className="font-body text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
              Desarrollador Web Full Stack apasionado por construir aplicaciones modernas, arquitecturas escalables y experiencias digitales de alto impacto.
            </p>

            {/* Widget de Hora Local en Vivo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-xs font-mono text-slate-600 dark:text-slate-300">
              <Globe className="w-3.5 h-3.5 text-[#1A2FFB]" aria-hidden="true" />
              <span>Bogotá, Colombia</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="font-bold text-slate-900 dark:text-white">{timeStr || "GMT-5"}</span>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA (3 COLS) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              NAVEGACIÓN
            </h4>
            <nav className="space-y-2" aria-label="Navegación del pie de página">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block text-xs font-body font-medium text-slate-600 dark:text-slate-400 hover:text-[#1A2FFB] dark:hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-[#1A2FFB] rounded"
                >
                  → {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMNA 3: SOCIAL & RETORNO (3 COLS) */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">
                CONEXIÓN
              </h4>
              <div className="flex gap-2.5">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar perfil de ${s.label}`}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-[#141724] border border-slate-200 dark:border-[#1E2337] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#1A2FFB] dark:hover:text-white hover:border-[#1A2FFB] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
                  >
                    <s.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Volver arriba al inicio de la página"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-[#1A2FFB] dark:hover:text-white transition-colors group focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none rounded p-1"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                <span>VOLVER AL INICIO</span>
              </button>
            </div>
          </div>

        </div>

        {/* LÍNEA DIVISORIA Y COPYRIGHT */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-[#161927] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
            © {year} Jhorman Steven Cortes Lasso. Desarrollado con código limpio & accesibilidad WCAG 2.2.
          </p>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-600">
            v2.1 // CLEAN ARCHITECTURE
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
