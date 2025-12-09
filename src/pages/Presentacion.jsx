import { ArrowDown } from "lucide-react";
import Foto from "../assets/FotoPerfil.jpeg"

const Presentacion = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(175_80%_50%_/_0.08),_transparent_60%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          <div className="flex-1 text-center lg:text-left mx-12">
            <p className="font-body text-primary text-sm tracking-widest uppercase mb-4 opacity-0 animate-fade-up">
              Desarrollador Web
            </p>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-up delay-100">
              Transformo ideas en{" "}
              <span className="text-gradient">experiencias</span>{" "}
              digitales
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-up delay-200">
              Construyo aplicaciones web modernas, elegantes y funcionales
              que conectan usuarios con soluciones innovadoras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up delay-300">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-all duration-300 glow-effect"
              >
                Hablemos
              </a>

              <a
                href="#experiencia"
                className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-foreground bg-secondary border border-border rounded-full hover:bg-muted transition-all duration-300"
              >
                Ver proyectos
              </a>
            </div>
          </div>

          {/* FOTO */}
          <div className="flex-shrink-0 opacity-0 animate-fade-up delay-400 mr-24 mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/30 animate-float">
                <img
                  src={Foto}
                  alt="Foto del desarrollador"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 rounded-full border border-primary/20 scale-125"></div>
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-150"></div>
            </div>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-500">
          <a
            href="#experiencia"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Presentacion;
