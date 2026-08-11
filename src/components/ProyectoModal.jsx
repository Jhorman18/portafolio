import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Github,
  Lock,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

const ProyectoModal = ({ proyecto, onClose }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = proyecto.images || [];

  // Manejo de la tecla ESC para cerrar el modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const { Icon } = proyecto;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 lg:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] lg:max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-violet-600 transition-all duration-300 shadow-md backdrop-blur-md"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* COLUMNA IZQUIERDA: Carrusel de Imágenes / Vista Previa 16:9 (62% en LG) */}
        <div className="relative w-full lg:w-[62%] min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-slate-950 flex items-center justify-center overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImgIndex]}
                alt={`${proyecto.title} - Imagen ${currentImgIndex + 1}`}
                className="w-full h-full object-contain bg-slate-950 transition-opacity duration-500"
              />

              {/* Botones de navegación de imágenes */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-violet-600 transition-colors backdrop-blur-md"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-violet-600 transition-colors backdrop-blur-md"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Puntos de navegación */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImgIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === currentImgIndex
                            ? "bg-violet-500 w-6"
                            : "bg-white/50 hover:bg-white"
                        }`}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            /* Vista previa decorativa automática mientras no se hayan cargado fotos */
            <div
              className={`w-full h-full bg-gradient-to-br ${proyecto.gradient} p-8 flex flex-col items-center justify-center text-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              
              <div className="relative z-10 w-24 h-24 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xl mb-6">
                <Icon className="w-12 h-12 text-violet-600 dark:text-violet-400" />
              </div>

              <div className="relative z-10 max-w-sm flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 text-violet-700 dark:text-violet-300 border border-violet-500/30 backdrop-blur-sm text-center">
                <ImageIcon className="w-4 h-4 shrink-0 text-violet-500" /> Formato de captura optimizado (16:9) en src/assets/proyectos/
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Detalle del Proyecto (38% en LG) */}
        <div className="p-6 lg:p-7 overflow-y-auto space-y-5 flex-1 flex flex-col justify-between max-h-[60vh] lg:max-h-[85vh] w-full lg:w-[38%]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
              <div>
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                  {proyecto.typeBadge} • {proyecto.category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {proyecto.title}
                </h2>
              </div>

              {proyecto.status && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                  {proyecto.status}
                </span>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
                Descripción General
              </h4>
              <p className="font-body text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {proyecto.description}
              </p>
            </div>

            {/* Características Clave */}
            {proyecto.features && (
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" /> Capacidades Destacadas
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  {proyecto.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tecnologías Utilizadas */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">
                Tecnologías Utilizadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {proyecto.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-full border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Acciones del Modal */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {proyecto.github ? (
                <a
                  href={proyecto.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white transition-all duration-300"
                >
                  <Github className="w-4 h-4" /> Código Fuente
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Lock className="w-4 h-4 text-violet-500" /> Código Privado (Enterprise)
                </span>
              )}
            </div>

            {proyecto.demo && (
              <a
                href={proyecto.demo}
                target={proyecto.demo.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-600/30 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" /> Ver Proyecto en Vivo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectoModal;
