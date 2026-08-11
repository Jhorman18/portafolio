import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Foto from "../assets/FotoPerfil.jpeg";
import FondoAnimado from "../assets/FondoAnimado.mp4";
import FondoEstatico from "../assets/FondoEstatico.jpg";

const Presentacion = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo Estático (Carga inmediata) */}
      <img
        src={FondoEstatico}
        alt="Fondo de presentación"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Fondo Animado (Video MP4) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={FondoEstatico}
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={FondoAnimado} type="video/mp4" />
      </video>

      {/* Capa de contraste adaptativa para modo claro y modo oscuro */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/85 backdrop-blur-[2px] transition-colors duration-300" />

      {/* Gradiente radial de acento */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(265_85%_66%_/_0.15),_transparent_60%)] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-36 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          <div className="flex-1 text-center lg:text-left mx-12">
            <p className="font-body text-violet-600 dark:text-violet-400 text-sm tracking-widest uppercase mb-4 opacity-0 animate-fade-up font-semibold">
              Desarrollador Web
            </p>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-up delay-100 text-slate-900 dark:text-white">
              Transformo ideas en{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                experiencias
              </span>{" "}
              digitales
            </h1>

            <p className="font-body text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-up delay-200">
              Construyo aplicaciones web modernas, elegantes y funcionales
              que conectan usuarios con soluciones innovadoras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-up delay-300">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-violet-600/30 hover:scale-105"
              >
                Hablemos
              </a>

              <a
                href="#proyectos"
                className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-slate-800 dark:text-slate-200 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-violet-400 dark:hover:border-violet-500/40 transition-all duration-300 shadow-sm"
              >
                Ver proyectos
              </a>
            </div>
          </div>

          {/* FOTO */}
          <div className="flex-shrink-0 opacity-0 animate-fade-up delay-400 lg:mr-24 mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500/20 dark:bg-violet-600/25 blur-3xl rounded-full scale-110"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-violet-500/40 animate-float shadow-2xl shadow-violet-500/10 dark:shadow-violet-950/50">
                <img
                  src={Foto}
                  alt="Foto del desarrollador"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 rounded-full border border-violet-500/20 scale-125"></div>
              <div className="absolute inset-0 rounded-full border border-indigo-500/10 scale-150"></div>
            </div>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-500">
          <a
            href="#experiencia"
            className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-violet-600 dark:text-violet-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Presentacion;
