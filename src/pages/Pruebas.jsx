import { Link } from "react-router-dom";
import { Beaker, Search, Tv } from "lucide-react";

const pruebasData = [
  {
    title: "Lista de personajes",
    description:
      "Explora la colección completa de personajes de Rick & Morty con foto, nombre, especie y estado.",
    icon: Tv,
    link: "/pruebas/personajes",
  },
  {
    title: "Buscar personaje por ID",
    description:
      "Ingresa un ID para ver detalles completos del personaje, incluyendo imagen e información avanzada.",
    icon: Search,
    link: "/pruebas/personaje",
  },
  {
    title: "Buscar episodio por ID",
    description:
      "Descubre información detallada de un episodio y los personajes que aparecen en él.",
    icon: Beaker,
    link: "/pruebas/episodio",
  },
];

const Pruebas = () => {
  return (
    <section
      id="pruebas"
      className="min-h-screen py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Fondo estilizado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(175_80%_50%_/_0.05),_transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16 opacity-0 animate-fade-up">

          <h2 className="font-display text-3xl md:text-5xl font-bold">
            <span className="text-gradient">APIs</span>
          </h2>

          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-4">
            Ejercicios prácticos usados en clase
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {pruebasData.map((prueba, i) => {
            const Icon = prueba.icon;
            return (
              <div
                key={i}
                className="card-glass p-8 rounded-2xl border border-border/40 hover:border-primary/40 transition-all duration-300 opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-2xl font-bold mb-3">
                  {prueba.title}
                </h3>

                <p className="font-body text-muted-foreground text-sm mb-6 leading-relaxed">
                  {prueba.description}
                </p>

                <Link
                  to={prueba.link}
                  className="inline-flex items-center justify-center w-full py-3 font-display font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-300 glow-effect"
                >
                  Probar ahora
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pruebas;
