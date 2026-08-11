import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado. ¡Te responderé pronto!");
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Jhorman18", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contacto" className="py-24 lg:py-32 relative">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(265_85%_66%_/_0.08),_transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-violet-600 dark:text-violet-400 text-sm tracking-widest uppercase mb-4 font-semibold">
            Contacto
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Trabajemos <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">juntos</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escucharte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">

          {/* INFO */}
          <div className="space-y-8 mr-4">
            <div className="card-glass rounded-2xl p-8 border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Información de contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">jhormanc150@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ubicación</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Sígueme en redes
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <a
                  href="/cv_Jhorman_Cortes.pdf"
                  download
                  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-display font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-violet-600/30 w-full hover:scale-[1.02]"
                >
                  Descargar Hoja de Vida
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="card-glass rounded-2xl p-8 border-slate-200 dark:border-slate-800">
            <h3 className="font-display text-xl font-bold mb-6 text-slate-900 dark:text-white">
              Envíame un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400 mb-2 block font-medium">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                  placeholder="Escribe tu mensaje..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-violet-600/30 hover:scale-[1.02] font-semibold"
              >
                Enviar mensaje
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contacto;
