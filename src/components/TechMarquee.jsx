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
  SiVite,
  SiPostman,
} from "react-icons/si";

const marqueeItems = [
  { name: "REACT 19", icon: SiReact, color: "#61DAFB" },
  { name: "NODE.JS", icon: SiNodedotjs, color: "#339933" },
  { name: "JAVASCRIPT (ES6+)", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TAILWIND CSS", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "PRISMA ORM", icon: SiPrisma, color: "#2D3748" },
  { name: "MYSQL", icon: SiMysql, color: "#4479A1" },
  { name: "EXPRESS.JS", icon: SiExpress, color: "#9CA3AF" },
  { name: "REST APIS", icon: SiPostman, color: "#FF6C37" },
  { name: "MARIADB", icon: SiMariadb, color: "#C0765A" },
  { name: "VITE", icon: SiVite, color: "#646CFF" },
  { name: "GIT & GITHUB", icon: SiGit, color: "#F05032" },
];

const TechMarquee = () => {
  return (
    <div className="relative w-full py-6 overflow-hidden border-y border-slate-200/80 dark:border-[#1A1E2E] bg-slate-100/40 dark:bg-[#0B0C13] select-none my-8">
      {/* Sombras de desvanecimiento en los bordes para transición infinita */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#090A0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#090A0F] to-transparent z-10 pointer-events-none" />

      {/* Contenedor del Marquee con velocidad continua */}
      <div className="flex w-max animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 mx-6 px-4 py-2 rounded-full bg-white dark:bg-[#121420] border border-slate-200/80 dark:border-[#1E2337] shadow-sm hover:border-[#1A2FFB] transition-colors group cursor-default"
            >
              <Icon
                className="w-4 h-4 transition-transform group-hover:scale-110"
                style={{ color: item.color }}
              />
              <span className="font-mono text-xs font-bold tracking-wider text-slate-700 dark:text-slate-300 group-hover:text-[#1A2FFB] dark:group-hover:text-white transition-colors">
                {item.name}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechMarquee;
