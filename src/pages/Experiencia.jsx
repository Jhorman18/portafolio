import { Briefcase, Calendar } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiPrisma,
  SiMysql,
  SiGit,
  SiMariadb,
  SiScrumalliance,
} from "react-icons/si";

const ExperienciaArray = [
  {
    role: "Analista IT / Desarrollador Web",
    company: "Proyección Laboral S.A.S",
    period: "Abril 2024 – Presente",
    description:
      "Desarrollo y mantenimiento de aplicaciones web internas y externas. Implementación de componentes en React y Tailwind CSS, creación de APIs en Node.js, optimización de bases de datos con Prisma/MySQL y soporte técnico integral. Administración de servidores, automatización de respaldos y monitoreo de sistemas."
  },
  {
    role: "Aprendiz de Programación de Software",
    company: "Proyección Laboral S.A.S",
    period: "Oct 2023 – Abril 2024",
    description:
      "Construcción de módulos para plataformas empresariales, soporte en infraestructura IT, diseño frontend con Tailwind CSS y React, consumo de APIs REST y participación en flujos de desarrollo bajo metodología Scrum."
  },
];

const technologies = [
  { name: "React", category: "Frontend", icon: SiReact },
  { name: "JavaScript", category: "Lenguaje", icon: SiJavascript },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs },
  { name: "Express", category: "Backend", icon: SiExpress },
  { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss },
  { name: "Prisma ORM", category: "Database", icon: SiPrisma },
  { name: "MySQL", category: "Database", icon: SiMysql },
  { name: "MariaDB", category: "Database", icon: SiMariadb },
  { name: "Git", category: "Control de versiones", icon: SiGit },
  { name: "Scrum", category: "Agile", icon: SiScrumalliance },
];

const Experiencia = () => {
  useScrollReveal();

  return (
    <section id="experiencia" className="py-24 lg:py-32 relative ">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_hsl(265_85%_66%_/_0.08),_transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10 lg:px-12">

        <div className="text-center mb-16 reveal-on-scroll">
          <p className="font-body text-violet-600 dark:text-violet-400 text-sm tracking-widest uppercase mb-4 font-semibold">
            Trayectoria
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Mi <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">experiencia</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* TIMELINE */}
          <div className="lg:col-span-5 space-y-8">
            {ExperienciaArray.map((exp, i) => (
              <div
                key={i}
                className={`relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-violet-500 transition-colors duration-500 group reveal-on-scroll stagger-${i + 1}`}
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 group-hover:border-violet-500 group-hover:bg-violet-500 transition-all duration-300 shadow-md shadow-violet-500/50"></div>

                <div className="card-glass rounded-2xl p-6 group-hover:border-violet-400 dark:group-hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl dark:hover:shadow-violet-950/30 hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-1 text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-3">
                    <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TECNOLOGÍAS */}
          <div className="lg:col-span-7 reveal-on-scroll">
            <div className="card-glass rounded-2xl p-8 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Stack Tecnológico & Habilidades
                </h3>
                <span className="text-xs font-semibold px-3 py-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full border border-violet-500/20">
                  Herramientas clave
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {technologies.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-violet-500/15 dark:hover:shadow-violet-950/30 reveal-on-scroll stagger-${(i % 5) + 1}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-colors">
                        <Icon className="w-7 h-7 text-violet-600 dark:text-violet-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <span className="font-display font-semibold text-sm text-slate-900 dark:text-white text-center leading-tight">
                        {tech.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        {tech.category}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-display text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      2+
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Años de experiencia profesional
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      10+
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Tecnologías dominadas
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experiencia;
