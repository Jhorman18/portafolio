import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Si usas iconos; si no quieres, te hago versión sin icons

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // Menú mobile

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
    { label: "Contacto", href: "#contacto" },
    { label: "API R y M", href: "/pruebas" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-xl font-bold text-gradient"
          aria-label="Ir al inicio"
        >
          {"</Jhorman Cortes>"}
        </a>

        {/* menu pc */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-foreground"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/*menu cel */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col items-center gap-6 mt-20 text-xl">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-body text-muted-foreground hover:text-foreground transition-colors"
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
