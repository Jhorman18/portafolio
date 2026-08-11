import { useState } from "react";
import {
  ExternalLink,
  Github,
  Users,
  FolderOpen,
  Mail,
  Building2,
  Lightbulb,
  Sparkles,
  Lock,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import ProyectoModal from "../components/ProyectoModal";

const proyectos = [
  {
    id: "01",
    title: "HireFlow",
    subtitle: "Plataforma ATS & Selección de Personal",
    description:
      "Plataforma empresarial de gestión de procesos de selección y contratación. Permite administrar postulantes, vacantes activas y evaluar cada etapa del reclutamiento con métricas en tiempo real.",
    category: "Full Stack",
    typeBadge: "Plataforma SaaS",
    tags: ["React", "Node.js", "Express", "MySQL", "Prisma ORM"],
    github: null,
    demo: null,
    Icon: Users,
    gradient: "from-violet-600/30 via-purple-600/20 to-indigo-600/10",
    featured: true,
    status: "Sistema Activo",
    images: [],
    features: [
      "Pipeline visual interactivo de etapas de selección",
      "Filtros avanzados de postulantes por competencias y estado",
      "Generación de reportes de gestión de vacantes",
      "Base de datos relacional con Prisma ORM y MySQL",
    ],
  },
  {
    id: "02",
    title: "File Manager",
    subtitle: "Gestor Documental Seguro con Roles",
    description:
      "Sistema de gestión de archivos empresarial con autenticación JWT, subida/descarga controlada, permisos granulares por rol y base de datos relacional optimizada.",
    category: "Empresarial",
    typeBadge: "Herramienta Empresarial",
    tags: ["Node.js", "Express", "Prisma ORM", "MySQL", "JWT"],
    github: null,
    demo: null,
    Icon: FolderOpen,
    gradient: "from-indigo-600/30 via-violet-600/20 to-purple-600/10",
    featured: false,
    status: "Empresarial",
    images: [],
    features: [
      "Autenticación segura basada en JSON Web Tokens (JWT)",
      "Control de acceso y permisos según el rol asignado",
      "Subida y descarga eficiente de archivos empresariales",
      "Auditoría y trazabilidad de operaciones por usuario",
    ],
  },
  {
    id: "03",
    title: "EvaMailer",
    subtitle: "Microservicio de Correos & Notificaciones",
    description:
      "Servicio automatizado de envío de correos masivos con plantillas HTML dinámicas, cola de distribución y seguimiento en tiempo real de entregabilidad.",
    category: "Backend & APIs",
    typeBadge: "Microservicio API",
    tags: ["Node.js", "Express", "Nodemailer", "MySQL"],
    github: null,
    demo: null,
    Icon: Mail,
    gradient: "from-purple-600/30 via-indigo-600/20 to-violet-600/10",
    featured: false,
    status: "Servicio API",
    images: [],
    features: [
      "Microservicio REST modular y reutilizable para cualquier app",
      "Renderizado dinámico de plantillas HTML personalizadas",
      "Gestión de colas de envío masivo con reporte de estados",
      "Integración nativa con proveedores SMTP enterprise",
    ],
  },
  {
    id: "04",
    title: "Proyección Laboral",
    subtitle: "Portal Web Institucional & Corporativo",
    description:
      "Sitio web institucional de Proyección Laboral S.A.S. Presentación de servicios corporativos, historia organizacional y canales de atención interactivos.",
    category: "Frontend",
    typeBadge: "Web Corporativa",
    tags: ["React", "Tailwind CSS", "Vite"],
    github: null,
    demo: "https://portafolio-ten-zeta.vercel.app/",
    Icon: Building2,
    gradient: "from-violet-500/30 via-indigo-500/20 to-purple-500/10",
    featured: false,
    status: "En Vivo",
    images: [],
    features: [
      "Diseño web responsive ultra fluido optimizado para móvil y PC",
      "Arquitectura basada en componentes reutilizables con React",
      "Estilos modernos y rápidos construidos con Tailwind CSS",
      "Despliegue automatizado y optimizado en Vercel",
    ],
  },
  {
    id: "05",
    title: "Optilux",
    subtitle: "Software de Gestión Comercial para Ópticas",
    description:
      "Aplicación web integral para ópticas. Gestión de catálogo de productos, agendamiento de citas especializadas y seguimiento detallado de órdenes.",
    category: "Full Stack",
    typeBadge: "Aplicación Web",
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    github: null,
    demo: null,
    Icon: Lightbulb,
    gradient: "from-indigo-500/30 via-purple-500/20 to-violet-500/10",
    featured: false,
    status: "Aplicación Web",
    images: [],
    features: [
      "Módulo de agendamiento y control de citas oftalmológicas",
      "Catálogo interactivo con filtros de armazones y cristales",
      "Seguimiento de pedidos de laboratorio en tiempo real",
      "Interfaz adaptativa diseñada para fácil navegación operativa",
    ],
  },
];

const categories = ["Todos", "Full Stack", "Frontend", "Backend & APIs", "Empresarial"];

const Proyectos = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className="py-24 lg:py-32 relative">
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(265_85%_66%_/_0.08),_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="font-body text-violet-600 dark:text-violet-400 text-sm tracking-widest uppercase mb-4 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Portafolio de Desarrollo
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Proyectos <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">destacados</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Soluciones web reales diseñadas con arquitectura escalable, interfaces intuitivas y código limpio. <br />
            <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold">💡 Haz clic en cualquier proyecto para ver sus detalles en pantalla completa.</span>
          </p>
        </div>

        {/* Filtros Interactivos */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                  : "bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proyecto) => {
            const { Icon } = proyecto;

            // Renderizado Especial para el Proyecto Destacado (#1 Bento Card)
            if (proyecto.featured && activeFilter === "Todos") {
              return (
                <div
                  key={proyecto.id}
                  onClick={() => setSelectedProject(proyecto)}
                  className="md:col-span-2 lg:col-span-2 card-glass rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 hover:border-violet-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/15 dark:hover:shadow-violet-950/40 relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Header Banner Destacado */}
                  <div
                    className={`h-48 md:h-56 bg-gradient-to-br ${proyecto.gradient} p-8 relative flex items-center justify-between overflow-hidden`}
                  >
                    {/* Efecto de barrido de luz */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-8 h-8 md:w-10 md:h-10 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30 backdrop-blur-sm mb-2">
                          <Sparkles className="w-3.5 h-3.5" /> Proyecto Destacado
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                          {proyecto.title}
                        </h3>
                      </div>
                    </div>

                    <span className="font-mono text-2xl font-black text-violet-500/30 dark:text-violet-400/20 hidden sm:block">
                      {proyecto.id}
                    </span>
                  </div>

                  {/* Cuerpo del Destacado */}
                  <div className="p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">
                        {proyecto.subtitle}
                      </p>
                      <p className="font-body text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                        {proyecto.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proyecto.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-800 group-hover:border-violet-500/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer de la tarjeta */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800/80">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Lock className="w-3.5 h-3.5 text-violet-500" /> Código Privado (Enterprise)
                      </span>

                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {proyecto.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Tarjetas Secundarias
            return (
              <div
                key={proyecto.id}
                onClick={() => setSelectedProject(proyecto)}
                className="card-glass rounded-3xl overflow-hidden group border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500/50 transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-violet-950/30 relative cursor-pointer"
              >
                {/* Header de tarjeta con gradiente */}
                <div
                  className={`h-40 bg-gradient-to-br ${proyecto.gradient} p-6 relative flex items-center justify-between overflow-hidden`}
                >
                  {/* Barrido de luz */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                  </div>

                  <span className="font-mono text-xl font-bold text-violet-500/40 dark:text-violet-400/30 relative z-10">
                    {proyecto.id}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                        {proyecto.typeBadge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                      {proyecto.title}
                    </h3>

                    <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                      {proyecto.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proyecto.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links / Estado */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    {proyecto.github ? (
                      <a
                        href={proyecto.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Código
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 cursor-default select-none">
                        <Lock className="w-3.5 h-3.5 text-violet-500/70" />
                        Privado
                      </span>
                    )}

                    {proyecto.demo ? (
                      <a
                        href={proyecto.demo}
                        target={proyecto.demo.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
                      >
                        Ver Demo <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                        {proyecto.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Renderizado del Modal Interactivo al seleccionar un proyecto */}
      {selectedProject && (
        <ProyectoModal
          proyecto={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Proyectos;
