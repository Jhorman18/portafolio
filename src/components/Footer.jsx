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
    <footer className="relative pt-16 pb-8 border-t border-border bg-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(175_80%_50%_/_0.03),_transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          <div className="space-y-6">
            <a href="#hero" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display text-xl font-bold">
                Jhorman<span className="text-primary">Cortes</span>
              </span>
            </a>

            <p className="font-display text-2xl font-bold leading-relaxed">
              Transformando ideas en{" "}
              <span className="text-gradient">experiencias digitales</span>{" "}
              que impactan.
            </p>

            <p className="text-sm text-muted-foreground">
              Creando el futuro, una línea de código a la vez.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-display text-lg font-bold">
              Navegación rápida
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary hover:translate-x-2 transition-all"
                >
                  → {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-display text-lg font-bold">Conectemos</h4>
            <p className="text-sm text-muted-foreground">
              Sígueme en redes para ver proyectos y contenido tech.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Volver arriba
            </button>
          </div>

        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Jhorman Cortes. Todos los derechos reservados.
          </p>

          <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-primary animate-pulse" /> y mucho café
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
