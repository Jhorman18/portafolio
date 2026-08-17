import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Copy, Check, Download } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SpotlightCard from "../components/SpotlightCard";
import { useMagnetic } from "../hooks/useMagnetic";

const Contacto = () => {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const cvBtnRef = useMagnetic(0.25);
  const submitBtnRef = useMagnetic(0.2);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulación de envío fluido con feedback
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSentSuccess(false), 4000);
    }, 800);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Jhorman18", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jhorman-steven-cortes-lasso/", label: "LinkedIn" },
  ];

  return (
    <section id="contacto" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span>[ 04 // INICIAR_CONVERSACIÓN ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            ¿Tienes un proyecto? <span className="text-[#1A2FFB] dark:text-[#3B54FF]">Hablemos</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 text-sm md:text-base mt-3 [text-wrap:pretty]">
            Disponible para oportunidades laborales, desarrollo de aplicaciones a medida o consultoría tecnológica.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 max-w-5xl mx-auto">

          {/* COLUMNA IZQUIERDA: INFORMACIÓN DIRECTA CON SPOTLIGHT CARD (5 COLS) */}
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll stagger-1">
            <SpotlightCard className="card-clean rounded-[24px] p-6 sm:p-8 space-y-6">
              
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Canales Directos
              </h3>

              {/* Email con opción de copiar */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141724] border border-slate-200/80 dark:border-[#1E2337] flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#1A2FFB]/10 flex items-center justify-center text-[#1A2FFB] shrink-0" aria-hidden="true">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-slate-400">CORREO ELECTRÓNICO</p>
                    <a
                      href={`mailto:${email}`}
                      className="font-body text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#1A2FFB] dark:hover:text-[#3B54FF] truncate block transition-colors focus-visible:ring-1 focus-visible:ring-[#1A2FFB] rounded"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white dark:bg-[#1C2032] border border-slate-200 dark:border-[#282F48] text-slate-500 hover:text-[#1A2FFB] transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
                  aria-label="Copiar email de contacto"
                  title="Copiar email al portapapeles"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>

              {/* Ubicación */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141724] border border-slate-200/80 dark:border-[#1E2337] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A2FFB]/10 flex items-center justify-center text-[#1A2FFB] shrink-0" aria-hidden="true">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-slate-400">UBICACIÓN ACTUAL</p>
                  <p className="font-body text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Bogotá, Colombia (GMT-5)
                  </p>
                </div>
              </div>

              {/* Redes Sociales */}
              <div>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                  Perfiles Profesionales
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#141724] border border-slate-200/80 dark:border-[#1E2337] hover:border-[#1A2FFB] text-slate-700 dark:text-slate-300 hover:text-[#1A2FFB] dark:hover:text-white transition-all flex items-center gap-2 text-xs font-mono focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none"
                      aria-label={`Visitar perfil de ${s.label}`}
                    >
                      <s.icon className="w-4 h-4" aria-hidden="true" />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Descargar CV Magnético */}
              <div ref={cvBtnRef} className="pt-2">
                <a
                  href="/cv_Jhorman_Cortes.pdf"
                  download
                  className="w-full h-12 rounded-full bg-slate-900 dark:bg-[#1C2032] hover:bg-[#1A2FFB] dark:hover:bg-[#1A2FFB] text-white flex items-center justify-center gap-2 font-display text-xs uppercase tracking-widest font-bold border border-slate-800 dark:border-[#252A3F] transition-all duration-300 group shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  <span>Descargar CV Completo (PDF)</span>
                </a>
              </div>

            </SpotlightCard>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO ACCESIBLE CON SPOTLIGHT CARD (7 COLS) */}
          <div className="lg:col-span-7 reveal-on-scroll stagger-2">
            <SpotlightCard className="card-clean rounded-[24px] p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-6">
                Envíame un Mensaje
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="font-mono text-xs text-slate-600 dark:text-slate-400 mb-1.5 block">
                    NOMBRE / EMPRESA *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141724] border border-slate-200 dark:border-[#1E2337] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:border-[#1A2FFB] focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="font-mono text-xs text-slate-600 dark:text-slate-400 mb-1.5 block">
                    CORREO ELECTRÓNICO *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@empresa.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141724] border border-slate-200 dark:border-[#1E2337] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:border-[#1A2FFB] focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="font-mono text-xs text-slate-600 dark:text-slate-400 mb-1.5 block">
                    MENSAJE O DESCRIPCIÓN DEL PROYECTO *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntame sobre los requerimientos, plazos o tecnologías que necesitas…"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141724] border border-slate-200 dark:border-[#1E2337] rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:border-[#1A2FFB] focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Zona de estado accesible con botón magnético */}
                <div aria-live="polite" className="pt-2">
                  <div ref={submitBtnRef} className="w-full">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full h-12 rounded-full bg-[#1A2FFB] hover:bg-[#0016EC] text-white flex items-center justify-center gap-2 font-display text-xs uppercase tracking-widest font-bold shadow-md shadow-blue-600/25 transition-all duration-300 active:scale-95 disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {isSending ? (
                        <span className="font-mono">Enviando mensaje…</span>
                      ) : sentSuccess ? (
                        <span className="flex items-center gap-2 text-emerald-300 font-bold">
                          <Check className="w-4 h-4" aria-hidden="true" /> ¡Mensaje Recibido con Éxito!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span>Enviar Mensaje</span>
                          <Send className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contacto;
