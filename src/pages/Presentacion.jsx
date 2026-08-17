import { useState } from "react";
import { ArrowUpRight, Copy, Check, Github, Terminal } from "lucide-react";
import FondoAnimado from "../assets/FondoAnimado.mp4";
import FondoEstatico from "../assets/FondoEstatico.jpg";
import { useMagnetic } from "../hooks/useMagnetic";
import TextScramble from "../components/TextScramble";
import AsciiBrain3D from "../components/AsciiBrain3D";

const Presentacion = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const primaryBtnRef = useMagnetic(0.25);
  const copyBtnRef = useMagnetic(0.2);
  const githubBtnRef = useMagnetic(0.3);

  const email = "jhormanc150@gmail.com";

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const coreTechs = [
    "React 19",
    "Node.js",
    "Tailwind CSS",
    "Prisma ORM",
    "MySQL / MariaDB",
    "APIs REST",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-10 scroll-mt-24"
    >
      {/* Fondo Estático con Transición Suave al Video */}
      <img
        src={FondoEstatico}
        alt=""
        aria-hidden="true"
        width="1920"
        height="1080"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Fondo de Video Cinemático */}
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

      {/* Capa de contraste y textura limpia */}
      <div className="absolute inset-0 bg-slate-50/85 dark:bg-[#090A0F]/85 backdrop-blur-[2px] transition-colors duration-300" />

      {/* Gradiente sutil ambiental */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(26,47,251,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(26,47,251,0.18),rgba(0,0,0,0))] pointer-events-none" />

      {/* Grid técnico ultra fino */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* CONTENIDO PRINCIPAL COMPACTO Y PERFECTO PARA VISTAS CORTAS */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* COLUMNA IZQUIERDA: TESIS & DIRECCIÓN EDITORIAL */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-[11px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm mb-3 animate-hero-up group">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"
                aria-hidden="true"
              />
              <span>[ </span>
              <TextScramble text="JHORMAN CORTES // FULL-STACK DEV" />
              <span> ]</span>
            </div>

            {/* Titular Principal Editorial Ultra Escalado */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-3 animate-hero-up [animation-delay:0.1s] [text-wrap:balance]">
              Construyo software web{" "}
              <span className="text-[#1A2FFB] dark:text-[#3B54FF] inline-block underline decoration-[#1A2FFB]/30 decoration-wavy underline-offset-4">
                escalable
              </span>
              , veloz e intuitivo.
            </h1>

            {/* Subtítulo enfocado en valor real */}
            <p className="font-body text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl mb-4 leading-relaxed animate-hero-up [animation-delay:0.2s] [text-wrap:pretty]">
              Desarrollador Full Stack enfocado en aplicaciones web de alto
              rendimiento, microservicios modulares y experiencias de usuario
              limpias con React, Node.js y bases de datos relacionales.
            </p>

            {/* Fila de Botones de Acción Magnéticos */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-4 w-full sm:w-auto animate-hero-up [animation-delay:0.3s]">
              {/* Botón Primario a Proyectos */}
              <div ref={primaryBtnRef} className="inline-block">
                <a
                  href="#proyectos"
                  className="group relative inline-flex items-center justify-center h-10 px-5 sm:px-6 rounded-full bg-[#1A2FFB] hover:bg-[#0016EC] text-white font-display text-[11px] sm:text-xs uppercase tracking-widest font-bold overflow-hidden transition-colors duration-300 shadow-md shadow-blue-600/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
                >
                  <span className="relative flex items-center gap-1.5">
                    <span className="transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:-translate-x-1">
                      Explorar Proyectos
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>

              {/* Botón Copiar Email */}
              <div ref={copyBtnRef} className="inline-block">
                <button
                  onClick={handleCopyEmail}
                  className="relative inline-flex items-center justify-center h-10 px-4 sm:px-5 rounded-full bg-white dark:bg-[#121420] hover:bg-slate-100 dark:hover:bg-[#181B2B] text-slate-800 dark:text-slate-200 font-display text-[11px] sm:text-xs uppercase tracking-wider font-semibold border border-slate-200 dark:border-[#1F2438] hover:border-slate-300 dark:hover:border-[#2E3550] transition-all duration-300 shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none group"
                  aria-label="Copiar correo electrónico de contacto"
                >
                  <span className="flex items-center gap-1.5">
                    {copied ? (
                      <>
                        <Check
                          className="w-3.5 h-3.5 text-emerald-500"
                          aria-hidden="true"
                        />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          ¡Copiado!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy
                          className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#1A2FFB] transition-colors"
                          aria-hidden="true"
                        />
                        <span>Copiar Email</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Enlace rápido a GitHub */}
              <div ref={githubBtnRef} className="inline-block">
                <a
                  href="https://github.com/Jhorman18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-slate-700 dark:text-slate-300 hover:text-[#1A2FFB] dark:hover:text-white hover:border-[#1A2FFB] dark:hover:border-[#1A2FFB] transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
                  aria-label="Visitar perfil de GitHub de Jhorman Cortes"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Fila de Tecnologías Clave (Pills Monoespaciados) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 animate-hero-up [animation-delay:0.4s]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 flex items-center gap-1 mr-1">
                <Terminal
                  className="w-3 h-3 text-[#1A2FFB]"
                  aria-hidden="true"
                />{" "}
                Stack:
              </span>
              {coreTechs.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-[#131622] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-[#1E2337] hover:border-[#1A2FFB] dark:hover:border-[#1A2FFB] transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: CEREBRO ASCII 3D TRANSPARENTE COMPACTO */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center animate-hero-up [animation-delay:0.35s]">
            <AsciiBrain3D />
          </div>
        </div>

        {/* INDICADOR DE SCROLL MINIMALISTA */}
        <div className="mt-4 sm:mt-6 flex justify-center">
          <a
            href="#experiencia"
            className="group flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-[#1A2FFB] dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none rounded-full p-1"
            aria-label="Desplazarse a la sección de experiencia"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest">
              EXPLORAR_PORTAFOLIO
            </span>
            <div className="w-4 h-6 rounded-full border border-slate-300 dark:border-slate-700 flex justify-center pt-0.5 group-hover:border-[#1A2FFB] transition-colors">
              <span className="w-1 h-1.5 rounded-full bg-[#1A2FFB] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Presentacion;
