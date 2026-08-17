import { useState } from "react";
import {
  Code2,
  Server,
  Database,
  Layout,
  Workflow,
  Cpu,
  Rocket,
  ArrowUpRight,
  Bot,
  BarChart3,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SpotlightCard from "../components/SpotlightCard";
import AnimatedCounter from "../components/AnimatedCounter";
import TextScramble from "../components/TextScramble";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiPrisma,
  SiMysql,
  SiMariadb,
  SiGit,
  SiScrumalliance,
  SiPostman,
  SiVite,
  SiPython,
  SiN8N,
  SiPandas,
} from "react-icons/si";

/* ═══════════════════════════════════════════════════════════
   Servicios — Qué puedo hacer por ti
   ═══════════════════════════════════════════════════════════ */
const servicios = [
  {
    Icon: Layout,
    title: "Interfaces Web Modernas",
    description:
      "Diseño y desarrollo de interfaces responsivas, accesibles y visualmente impactantes con React, Tailwind CSS y animaciones fluidas.",
    highlights: ["SPA & SSR", "Responsive Design", "Micro-interacciones"],
  },
  {
    Icon: Server,
    title: "APIs REST & Backend",
    description:
      "Arquitectura de servicios escalables con Node.js y Express. Autenticación JWT, validación robusta y documentación de endpoints.",
    highlights: ["REST APIs", "Autenticación", "Microservicios"],
  },
  {
    Icon: Database,
    title: "Bases de Datos & ORM",
    description:
      "Modelado relacional, consultas optimizadas y migraciones seguras con Prisma ORM, MySQL y MariaDB para datos empresariales.",
    highlights: ["Prisma ORM", "MySQL", "Migraciones"],
  },
  {
    Icon: Workflow,
    title: "Soluciones Empresariales",
    description:
      "Desarrollo de plataformas SaaS, gestores documentales y herramientas internas con ciclo completo de ingeniería y metodología Scrum.",
    highlights: ["SaaS", "Scrum", "CI/CD"],
  },
  {
    Icon: Bot,
    title: "Automatizaciones",
    description:
      "Diseño de flujos automatizados con n8n y scripts Python para eliminar tareas repetitivas, integrar sistemas y optimizar procesos operativos.",
    highlights: ["n8n Workflows", "Python Scripts", "Integraciones"],
  },
  {
    Icon: BarChart3,
    title: "Análisis de Datos",
    description:
      "Extracción, transformación y visualización de datos para tomar decisiones informadas. Dashboards, reportes automatizados y limpieza de datasets.",
    highlights: ["ETL", "Dashboards", "Reportes"],
  },
];

/* ═══════════════════════════════════════════════════════════
   Stack Tecnológico
   ═══════════════════════════════════════════════════════════ */
const techCategories = [
  {
    title: "Frontend",
    items: [
      { name: "React 19", icon: SiReact, color: "#61DAFB", level: "Avanzado" },
      {
        name: "JavaScript (ES6+)",
        icon: SiJavascript,
        color: "#F7DF1E",
        level: "Avanzado",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#38B2AC",
        level: "Avanzado",
      },
      { name: "Vite", icon: SiVite, color: "#646CFF", level: "Avanzado" },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#339933",
        level: "Avanzado",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "#9CA3AF",
        level: "Avanzado",
      },
      {
        name: "Postman",
        icon: SiPostman,
        color: "#FF6C37",
        level: "Intermedio",
      },
    ],
  },
  {
    title: "Bases de Datos",
    items: [
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        color: "#2D3748",
        level: "Avanzado",
      },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: "Avanzado" },
      {
        name: "MariaDB",
        icon: SiMariadb,
        color: "#C0765A",
        level: "Avanzado",
      },
    ],
  },
  {
    title: "Automatización & Data",
    items: [
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB",
        level: "Intermedio",
      },
      {
        name: "n8n",
        icon: SiN8N,
        color: "#EA4B71",
        level: "Intermedio",
      },
      {
        name: "Pandas",
        icon: SiPandas,
        color: "#150458",
        level: "Intermedio",
      },
    ],
  },
  {
    title: "Workflow & DevOps",
    items: [
      {
        name: "Git / GitHub",
        icon: SiGit,
        color: "#F05032",
        level: "Avanzado",
      },
      {
        name: "Scrum / Agile",
        icon: SiScrumalliance,
        color: "#009A44",
        level: "Avanzado",
      },
    ],
  },
];

const Experiencia = () => {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("Frontend");

  return (
    <section id="experiencia" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Encabezado de Sección */}
        <div className="text-center md:text-left mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#121420] border border-slate-200 dark:border-[#1F2438] text-xs font-mono text-slate-600 dark:text-slate-400 mb-3">
            <span>[ 02 // HABILIDADES_Y_SERVICIOS ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
            Qué Puedo{" "}
            <span className="text-[#1A2FFB] dark:text-[#3B54FF]">
              Hacer por Ti
            </span>
          </h2>
          <p className="font-body text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mt-3 [text-wrap:pretty]">
            Desarrollo soluciones web completas — desde interfaces de alto
            impacto hasta APIs robustas y bases de datos optimizadas.
          </p>
        </div>

        {/* ════════════════════════════════════════════
            SERVICIOS — Grid de 4 tarjetas
            ════════════════════════════════════════════ */}
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-16">
          {servicios.map((servicio, i) => {
            const { Icon } = servicio;
            return (
              <SpotlightCard
                key={servicio.title}
                className={`card-clean card-clean-hover rounded-[24px] p-6 sm:p-7 flex flex-col group reveal-on-scroll stagger-${i + 1}`}
              >
                {/* Icono + Título */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl bg-[#1A2FFB]/8 dark:bg-[#1A2FFB]/15 border border-[#1A2FFB]/20 flex items-center justify-center text-[#1A2FFB] shrink-0 group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1">
                      <TextScramble text={servicio.title} />
                    </h3>
                    <p className="font-body text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {servicio.description}
                    </p>
                  </div>
                </div>

                {/* Etiquetas de capacidades */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-100 dark:border-[#181B2B]">
                  {servicio.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[11px] font-mono bg-slate-100 dark:bg-[#141724] text-slate-600 dark:text-slate-400 rounded-full border border-slate-200/60 dark:border-[#1C2032]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className="ml-auto inline-flex items-center gap-0.5 text-[11px] font-display font-semibold text-slate-400 group-hover:text-[#1A2FFB] transition-colors uppercase tracking-wider"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════
            STACK TECNOLÓGICO — Bento card con tabs
            ════════════════════════════════════════════ */}
        <div className="reveal-on-scroll stagger-2">
          <SpotlightCard className="card-clean rounded-[24px] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu
                    className="w-5 h-5 text-[#1A2FFB]"
                    aria-hidden="true"
                  />{" "}
                  Stack & Herramientas
                </h3>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  Dominio técnico probado en proyectos reales
                </p>
              </div>

              {/* Tabs de Filtro Accesibles */}
              <div
                role="tablist"
                aria-label="Categorías de tecnologías"
                className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-[#151826] rounded-xl border border-slate-200/80 dark:border-[#1E2337]"
              >
                {techCategories.map((cat) => (
                  <button
                    key={cat.title}
                    role="tab"
                    aria-selected={activeCategory === cat.title}
                    onClick={() => setActiveCategory(cat.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1A2FFB] focus-visible:outline-none ${
                      activeCategory === cat.title
                        ? "bg-white dark:bg-[#202538] text-slate-900 dark:text-white shadow-sm font-bold"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Tecnologías Filtradas */}
            {techCategories
              .filter((cat) => cat.title === activeCategory)
              .map((category) => (
                <div
                  key={category.title}
                  className="grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  {category.items.map((tech) => {
                    const TechIcon = tech.icon;
                    return (
                      <SpotlightCard
                        key={tech.name}
                        spotlightColor="rgba(26, 47, 251, 0.12)"
                        borderColor="rgba(26, 47, 251, 0.3)"
                        className="card-clean card-clean-hover rounded-2xl p-5 flex items-center gap-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-[#171A28] border border-slate-200/80 dark:border-[#1F2438] group-hover:scale-110 transition-transform duration-300 shrink-0">
                            <TechIcon
                              className="w-6 h-6 transition-colors duration-300"
                              style={{ color: tech.color }}
                              aria-hidden="true"
                            />
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
                              {tech.name}
                            </h4>
                            <span className="inline-block mt-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              {tech.level}
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    );
                  })}
                </div>
              ))}

            {/* Métricas Inferiores con AnimatedCounter */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#181B2B] grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#151826] border border-slate-200/60 dark:border-[#1E2337]">
                <p className="font-display text-2xl font-extrabold text-[#1A2FFB] dark:text-[#3B54FF]">
                  <AnimatedCounter target={2} suffix="+" />
                </p>
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Años de Exp.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#151826] border border-slate-200/60 dark:border-[#1E2337]">
                <p className="font-display text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  <AnimatedCounter target={10} suffix="+" />
                </p>
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Tecnologías
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#151826] border border-slate-200/60 dark:border-[#1E2337]">
                <p className="font-display text-2xl font-extrabold text-amber-500">
                  Scrum
                </p>
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Metodología
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default Experiencia;
