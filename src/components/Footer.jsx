import { Github, Linkedin, Twitter, Instagram, Code2, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Jhorman18" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  const quickLinks = [
    { name: "Presentación", href: "#hero" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(265_85%_66%_/_0.05),_transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          <div className="space-y-6">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:border-violet-500/40 transition-colors">
                <Code2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Jhorman<span className="text-violet-600 dark:text-violet-400">Cortes</span>
              </span>
            </a>

            <p className="font-display text-2xl font-bold leading-relaxed text-slate-900 dark:text-white">
              Transformando ideas en{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                experiencias digitales
              </span>{" "}
              que impactan.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Creando el futuro, una línea de código a la vez.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Navegación rápida
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:translate-x-2 transition-all"
                >
                  → {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">Conectemos</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sígueme en redes para ver proyectos y contenido tech.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all group text-sm font-medium"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-violet-600 dark:text-violet-400" />
              Volver arriba
            </button>
          </div>

        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {year} Jhorman Cortes. Todos los derechos reservados.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-400 inline-flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-violet-600 dark:text-violet-400 animate-pulse fill-violet-400/20" /> y mucho café
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
