import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Users,
  FolderOpen,
  Mail,
  Building2,
  Lightbulb,
  Lock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ProyectoModal from "../components/ProyectoModal";
import SpotlightCard from "../components/SpotlightCard";
import TextScramble from "../components/TextScramble";

const proyectos = [
  {
    id: "01",
    title: "HireFlow",
    subtitle: "Plataforma SaaS de Selección & Reclutamiento ATS",
    description:
      "Sistema integral para la gestión ágil de procesos de contratación empresarial. Centraliza postulantes, vacantes abiertas, trazabilidad por fases de reclutamiento y generación de reportes analíticos.",
    category: "Full Stack",
    typeBadge: "Plataforma SaaS",
    tags: ["React 19", "Node.js", "Express", "MySQL", "Prisma ORM", "Tailwind CSS"],
    github: null,
    demo: null,
    Icon: Users,
    featured: true,
    status: "Sistema en Producción",
    features: [
      "Pipeline interactivo tipo Kanban para seguimiento de candidatos",
      "Filtros avanzados por competencias laborales, salarios y estados",
      "Modelado de datos relacional y seguro con Prisma ORM y MySQL",
      "Panel de métricas y exportación de reportes de contratación",
    ],
  },
  {
    id: "02",
    title: "File Manager Enterprise",
    subtitle: "Gestor Documental Seguro con Control de Roles",
    description:
      "Plataforma empresarial de almacenamiento y transferencia segura de archivos con autenticación robusta mediante JSON Web Tokens (JWT) y auditoría de operaciones por usuario.",
    category: "Empresarial",
    typeBadge: "Herramienta Empresarial",
    tags: ["Node.js", "Express", "Prisma ORM", "MySQL", "JWT Auth"],
    github: null,
    demo: null,
    Icon: FolderOpen,
    featured: false,
    status: "Enterprise Interno",
    features: [
      "Autenticación segura y cifrado de credenciales con JWT",
      "Permisos granulares según rol administrativo o de consulta",
      "Subida, organización y descarga de archivos de gran volumen",
      "Trazabilidad de descargas y auditoría de seguridad",
    ],
  },
  {
    id: "03",
    title: "EvaMailer Microservice",
    subtitle: "Microservicio REST de Mensajería & Notificaciones",
    description:
      "Servicio backend automatizado para despacho masivo de correos electrónicos con plantillas HTML reactivas, colas asíncronas y verificación de entregabilidad en tiempo real.",
    category: "Backend & APIs",
    typeBadge: "Microservicio API",
    tags: ["Node.js", "Express", "Nodemailer", "MySQL", "HTML Templates"],
    github: null,
    demo: null,
    Icon: Mail,
    featured: false,
    status: "Microservicio Activo",
    features: [
      "Arquitectura modular desacoplada consumible vía API REST",
      "Generación dinámica de plantillas HTML personalizadas",
      "Manejo de colas y reportes automáticos de estado de envío",
      "Integración nativa con servidores SMTP empresariales",
    ],
  },
  {
    id: "04",
    title: "Proyección Laboral S.A.S",
    subtitle: "Portal Web Institucional Corporativo",
    description:
      "Sitio web oficial de la compañía Proyección Laboral S.A.S. Presentación de servicios de recursos humanos, gestión comercial y canales de atención interactivos.",
    category: "Frontend",
    typeBadge: "Web Corporativa",
    tags: ["React", "Tailwind CSS", "Vite", "Vercel Deploy"],
    github: null,
    demo: "https://portafolio-ten-zeta.vercel.app/",
    Icon: Building2,
    featured: false,
    status: "En Vivo",
    features: [
      "Diseño web responsive optimizado para móvil, tablet y escritorio",
      "Arquitectura de componentes ligeros con carga ultra rápida",
      "Paleta y tipografía adaptadas a la identidad de marca",
      "Despliegue automatizado y CDN global en Vercel",
    ],
  },
  {
    id: "05",
    title: "Optilux Manager",
    subtitle: "Software Integral de Gestión para Ópticas",
    description:
      "Aplicación web a medida para ópticas y consultorios. Catálogo de productos con filtros técnicos, agendamiento de exámenes visuales y seguimiento de órdenes de laboratorio.",
    category: "Full Stack",
    typeBadge: "Aplicación Web",
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    github: null,
    demo: null,
    Icon: Lightbulb,
    featured: false,
    status: "Aplicación Web",
    features: [
      "Módulo de citas oftalmológicas y registro de pacientes",
      "Catálogo interactivo con filtrado de cristales y monturas",
      "Control de estados para pedidos en laboratorio técnico",
      "Panel de administración adaptado a operadores comerciales",
    ],
  },
];

const categories = ["Todos", "Full Stack", "Frontend", "Backend & APIs", "Empresarial"];

const Proyectos = () => {
  useScrollReveal();

  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10">

        {/* Encabezado */}
        <div className="text-center md:text-left mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span>[ 03 // PROYECTOS_DESTACADOS ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            Trabajos & <span className="text-[#1A2FFB] dark:text-[#3B54FF]">Soluciones Reales</span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mt-3 [text-wrap:pretty]">
            Una selección de sistemas empresariales, plataformas SaaS y aplicaciones web desarrolladas con estándares modernos de ingeniería.
          </p>
        </div>

        {/* Barra de Filtros Interactivos */}
        <div className="flex flex-wrap items-center gap-2 mb-12 reveal-on-scroll">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mr-2" aria-hidden="true">
            <Filter className="w-3.5 h-3.5 text-[#1A2FFB]" /> FILTRO:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none ${
                activeFilter === cat
                  ? "bg-[#1A2FFB] text-white font-bold shadow-sm shadow-blue-600/20"
                  : "bg-slate-100 dark:bg-[#11131E] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-[#1E2337] hover:border-slate-300 dark:hover:border-[#2D3450] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BENTO GRID DE PROYECTOS CON SPOTLIGHT CARD GLOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((proyecto, idx) => {
            const { Icon } = proyecto;

            // Renderizado Especial: Hero Bento Card (#1 HireFlow)
            if (proyecto.featured && activeFilter === "Todos") {
              return (
                <SpotlightCard
                  key={proyecto.id}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`Ver detalles del proyecto ${proyecto.title}`}
                  onClick={() => setSelectedProject(proyecto)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(proyecto);
                    }
                  }}
                  className="md:col-span-2 lg:col-span-2 card-clean card-clean-hover rounded-[28px] overflow-hidden flex flex-col justify-between cursor-pointer group relative reveal-on-scroll stagger-1 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {/* Cabecera Técnica de Simulación */}
                  <div className="p-6 md:p-8 bg-slate-50/80 dark:bg-[#0E1019] border-b border-slate-200/80 dark:border-[#1A1D2D] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1A2FFB]/10 dark:bg-[#1A2FFB]/20 border border-[#1A2FFB]/30 flex items-center justify-center text-[#1A2FFB]" aria-hidden="true">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1A2FFB] dark:text-[#3B54FF]">
                            PROYECTO_{proyecto.id}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                            ● {proyecto.status}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                          <TextScramble text={proyecto.title} />
                        </h3>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#161928] border border-slate-200 dark:border-[#22273D] text-xs font-mono text-slate-500" aria-hidden="true">
                      <Sparkles className="w-3.5 h-3.5 text-[#1A2FFB]" /> Destacado
                    </div>
                  </div>

                  {/* Cuerpo de la Tarjeta Destacada */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2">
                        {proyecto.subtitle}
                      </p>
                      <p className="font-body text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        {proyecto.description}
                      </p>

                      {/* Lista de Capacidades Clave */}
                      <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                        {proyecto.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-body">
                            <CheckCircle2 className="w-4 h-4 text-[#1A2FFB] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proyecto.tags.map((tag, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 text-xs font-mono bg-slate-100 dark:bg-[#151826] text-slate-700 dark:text-slate-300 rounded-full border border-slate-200/80 dark:border-[#1E2337]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer de la tarjeta */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-[#181B2B]">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" /> Código Privado (Empresarial)
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-wider text-[#1A2FFB] group-hover:translate-x-1 transition-transform">
                        Ver Detalles <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              );
            }

            // Tarjetas Secundarias del Bento Grid
            return (
              <SpotlightCard
                key={proyecto.id}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Ver detalles del proyecto ${proyecto.title}`}
                onClick={() => setSelectedProject(proyecto)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(proyecto);
                  }
                }}
                className={`card-clean card-clean-hover rounded-[24px] overflow-hidden flex flex-col justify-between cursor-pointer group relative reveal-on-scroll stagger-${(idx % 3) + 1} focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:ring-offset-2 focus-visible:outline-none`}
              >
                {/* Header de la tarjeta */}
                <div className="p-6 bg-slate-50/60 dark:bg-[#0E1019] border-b border-slate-100 dark:border-[#1A1D2D] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#161928] border border-slate-200 dark:border-[#22273D] flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-[#1A2FFB] transition-colors" aria-hidden="true">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">
                        PROYECTO_{proyecto.id}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {proyecto.typeBadge}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#151826] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1E2337]">
                    {proyecto.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1A2FFB] transition-colors">
                      <TextScramble text={proyecto.title} />
                    </h3>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {proyecto.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proyecto.tags.slice(0, 4).map((tag, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-0.5 text-[11px] font-mono bg-slate-100 dark:bg-[#141724] text-slate-600 dark:text-slate-400 rounded-full border border-slate-200/60 dark:border-[#1C2032]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#181B2B]">
                    {proyecto.demo ? (
                      <a
                        href={proyecto.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#1A2FFB] hover:underline focus-visible:ring-1 focus-visible:ring-[#1A2FFB] rounded"
                      >
                        Demo en Vivo <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                        <Lock className="w-3 h-3 text-slate-400" aria-hidden="true" /> {proyecto.status}
                      </span>
                    )}

                    <span className="text-xs font-display font-semibold uppercase tracking-wider text-slate-500 group-hover:text-[#1A2FFB] transition-colors flex items-center gap-1">
                      Detalles <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>

      {/* MODAL INTERACTIVO ACCESIBLE */}
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
