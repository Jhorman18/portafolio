import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

/**
 * ImageCarousel — imagen grande + flechas/dots.
 * Cada item acepta { src, alt }. Si `src` es null/undefined, se
 * renderiza un PlaceholderImage (usa `Icon` como marca de agua) para
 * que la galería funcione igual antes de tener capturas reales.
 */
const ImageCarousel = ({ images, Icon, className = "" }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goTo = (i) => setIndex((i + images.length) % images.length);

  return (
    <div className={className}>
      <div
        className="relative aspect-[8/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E2337] bg-slate-100 dark:bg-[#0E1019]"
        role="group"
        aria-roledescription="carrusel"
        aria-label="Capturas de pantalla del proyecto"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt || ""}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderImage
                Icon={Icon}
                label={img.alt}
                index={i}
                className="w-full h-full"
              />
            )}
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Imagen anterior"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#1A2FFB] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Imagen siguiente"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 dark:bg-black/50 backdrop-blur border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#1A2FFB] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <span className="absolute bottom-2.5 right-3 z-10 font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/90">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex items-center justify-center gap-1.5 mt-3"
          role="tablist"
          aria-label="Seleccionar imagen"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a la imagen ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none ${
                i === index
                  ? "w-6 bg-[#1A2FFB]"
                  : "w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
