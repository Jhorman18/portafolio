import { Briefcase, Calendar } from "lucide-react";

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
  "React",
  "JavaScript (ES6+)",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Prisma ORM",
  "MySQL / MariaDB",
  "Git & Git Flow",
  "APIs REST",
  "Scrum"
];

const Experiencia = () => {
  return (
    <section id="experiencia" className="py-24 lg:py-32 relative ">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_hsl(175_80%_50%_/_0.05),_transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10 px-16">

        <div className="text-center mb-16">
          <p className="font-body text-primary text-sm tracking-widest uppercase mb-4">
            Trayectoria
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Mi <span className="text-gradient">experiencia</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* TIMELINE */}
          <div className="space-y-8">
            {ExperienciaArray.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-500 group"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-secondary border-2 border-border group-hover:border-primary group-hover:bg-primary transition-all duration-300"></div>

                <div className="card-glass rounded-2xl p-6 group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-2 text-primary text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-1">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TECNOLOGÍAS */}
          <div className="lg:pl-8">
            <div className="card-glass rounded-2xl p-8 sticky top-24">
              <h3 className="font-display text-xl font-bold mb-6">
                Tecnologías
              </h3>

              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 font-body text-sm bg-secondary text-foreground rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-display text-3xl font-bold text-gradient">
                      2+
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Años de experiencia
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
