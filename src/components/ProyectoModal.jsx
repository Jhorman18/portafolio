import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Sparkles,
  ExternalLink,
  Lock,
  CheckCircle2,
  Terminal,
  Layers,
} from "lucide-react";

/**
 * ProyectoModal — Portal-Based Accessible Dialog
 *
 * Fixes:
 * 1. Uses createPortal to escape CSS containment from backdrop-blur parents
 * 2. Focus trap cycles Tab within the modal
 * 3. Scrollbar-width compensation prevents layout shift on body overflow lock
 * 4. Smooth CSS entrance animations (backdrop fade + card scale-up)
 * 5. Auto-focuses close button on mount, restores focus on unmount
 */
const ProyectoModal = ({ proyecto, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocus = useRef(null);

  // --- Focus Management & Scroll Lock ---
  useEffect(() => {
    // Save the element that had focus before the modal opened
    previousFocus.current = document.activeElement;

    // Lock body scroll WITH scrollbar compensation to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Auto-focus the close button after the entrance animation settles
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore focus to the trigger element
      previousFocus.current?.focus?.();
    };
  }, []);

  // --- Keyboard: Escape to close ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // --- Focus Trap ---
  const handleFocusTrap = useCallback((e) => {
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  // --- Backdrop click (only direct clicks on backdrop, not bubbled) ---
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const { Icon } = proyecto;

  const modal = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8 modal-backdrop-enter"
      onClick={handleBackdropClick}
      onKeyDown={handleFocusTrap}
    >
      {/* Backdrop layer — separate div for clean blur + opacity animation */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl modal-backdrop-fade"
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#11131E] border border-slate-200 dark:border-[#1F2438] rounded-[28px] overflow-hidden shadow-2xl shadow-black/30 flex flex-col modal-panel-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Técnica del Modal */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-[#181B2B] bg-slate-50/70 dark:bg-[#0E1019] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl bg-[#1A2FFB]/10 flex items-center justify-center text-[#1A2FFB] shrink-0"
              aria-hidden="true"
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] text-slate-400 block truncate">
                ESPECIFICACIÓN_TÉCNICA // {proyecto.id}
              </span>
              <h3
                id="modal-project-title"
                className="font-display font-bold text-base text-slate-900 dark:text-white truncate"
              >
                {proyecto.title}
              </h3>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200/60 dark:bg-[#1A1D2D] text-slate-600 dark:text-slate-300 hover:text-white hover:bg-[#1A2FFB] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none shrink-0 ml-3"
            aria-label="Cerrar ventana modal"
          >
            <X className="w-4.5 h-4.5" aria-hidden="true" />
          </button>
        </div>

        {/* Contenido con Scroll Suave */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 overscroll-contain">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#181B2B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#22273D]">
                {proyecto.typeBadge}
              </span>
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {proyecto.status}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white [text-wrap:balance]">
              {proyecto.subtitle}
            </h2>
          </div>

          {/* Descripción */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1019] border border-slate-100 dark:border-[#181B2B]">
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Terminal
                className="w-3.5 h-3.5 text-[#1A2FFB]"
                aria-hidden="true"
              />{" "}
              Resumen de Arquitectura
            </h4>
            <p className="font-body text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {proyecto.description}
            </p>
          </div>

          {/* Capacidades & Funcionalidades */}
          {proyecto.features && (
            <div>
              <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles
                  className="w-3.5 h-3.5 text-[#1A2FFB]"
                  aria-hidden="true"
                />{" "}
                Módulos & Capacidades Clave
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {proyecto.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#151826] border border-slate-200/80 dark:border-[#1E2337] flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#1A2FFB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-body text-xs text-slate-700 dark:text-slate-300 leading-normal">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tecnologías */}
          <div>
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Layers
                className="w-3.5 h-3.5 text-[#1A2FFB]"
                aria-hidden="true"
              />{" "}
              Stack & Dependencias
            </h4>
            <div className="flex flex-wrap gap-2">
              {proyecto.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 text-xs font-mono bg-slate-100 dark:bg-[#141724] text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-[#1E2337]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Barra de Acciones Inferior */}
        <div className="px-5 sm:px-8 py-4 border-t border-slate-100 dark:border-[#181B2B] bg-slate-50/70 dark:bg-[#0E1019] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <Lock
              className="w-3.5 h-3.5 text-slate-400"
              aria-hidden="true"
            />{" "}
            Entorno de producción protegido
          </span>

          <div className="flex items-center gap-3">
            {proyecto.demo ? (
              <a
                href={proyecto.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A2FFB] hover:bg-[#0016EC] text-white text-xs font-display font-bold uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
              >
                <ExternalLink
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />{" "}
                Abrir Sitio en Vivo
              </a>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-slate-200 dark:bg-[#1F2438] text-slate-800 dark:text-slate-200 text-xs font-display font-bold uppercase tracking-wider hover:bg-slate-300 dark:hover:bg-[#282E45] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Portal: escape from any CSS containment (backdrop-blur, transform, overflow)
  return createPortal(modal, document.body);
};

export default ProyectoModal;
