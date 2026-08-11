import { useEffect, useState, useRef } from "react";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiPrisma,
  SiMysql,
  SiGit,
} from "react-icons/si";
import {
  Code2,
  Terminal,
  Database,
  Sparkles,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";

const initialIcons = [
  { id: 1, Icon: SiReact, top: "15%", left: "12%", color: "#61DAFB", size: 36, delay: "0s" },
  { id: 2, Icon: SiJavascript, top: "25%", left: "82%", color: "#F7DF1E", size: 34, delay: "1s" },
  { id: 3, Icon: SiNodedotjs, top: "65%", left: "10%", color: "#5FA04E", size: 38, delay: "2s" },
  { id: 4, Icon: SiTailwindcss, top: "75%", left: "85%", color: "#06B6D4", size: 36, delay: "1.5s" },
  { id: 5, Icon: SiPrisma, top: "35%", left: "20%", color: "#8B5CF6", size: 32, delay: "0.5s" },
  { id: 6, Icon: SiMysql, top: "80%", left: "25%", color: "#4479A1", size: 34, delay: "2.5s" },
  { id: 7, Icon: SiGit, top: "18%", left: "70%", color: "#F05032", size: 32, delay: "3s" },
  { id: 8, Icon: Code2, top: "50%", left: "8%", color: "#A855F7", size: 30, delay: "0.8s" },
  { id: 9, Icon: Terminal, top: "45%", left: "88%", color: "#6366F1", size: 32, delay: "2.2s" },
  { id: 10, Icon: Database, top: "82%", left: "68%", color: "#818CF8", size: 30, delay: "1.8s" },
  { id: 11, Icon: Sparkles, top: "12%", left: "45%", color: "#C084FC", size: 28, delay: "0.3s" },
  { id: 12, Icon: Layers, top: "60%", left: "78%", color: "#7C3AED", size: 32, delay: "2.7s" },
  { id: 13, Icon: Cpu, top: "30%", left: "88%", color: "#9333EA", size: 30, delay: "1.2s" },
  { id: 14, Icon: Zap, top: "72%", left: "42%", color: "#F59E0B", size: 28, delay: "2.1s" },
];

const FloatingIconsBackground = () => {
  const containerRef = useRef(null);
  const [offsets, setOffsets] = useState(
    initialIcons.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const repulsionRadius = 180; // Radio de repulsión
      const maxForce = 90; // Distancia máxima a la que sale volando el ícono

      const newOffsets = initialIcons.map((icon) => {
        const iconX = (parseFloat(icon.left) / 100) * rect.width;
        const iconY = (parseFloat(icon.top) / 100) * rect.height;

        const dx = iconX - mouseX;
        const dy = iconY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius && distance > 0) {
          const force = ((repulsionRadius - distance) / repulsionRadius) * maxForce;
          const angle = Math.atan2(dy, dx);
          return {
            x: Math.cos(angle) * force,
            y: Math.sin(angle) * force,
          };
        }

        return { x: 0, y: 0 };
      });

      setOffsets(newOffsets);
    };

    const handleMouseLeave = () => {
      setOffsets(initialIcons.map(() => ({ x: 0, y: 0 })));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {initialIcons.map((item, index) => {
        const IconComponent = item.Icon;
        const offset = offsets[index] || { x: 0, y: 0 };

        return (
          <div
            key={item.id}
            className="absolute transition-transform duration-300 ease-out"
            style={{
              top: item.top,
              left: item.left,
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <div
              className="animate-float hover:scale-125 transition-transform duration-300"
              style={{ animationDelay: item.delay }}
            >
              <div className="p-3 rounded-2xl bg-white/5 dark:bg-slate-900/30 backdrop-blur-[1px] border border-white/10 dark:border-slate-800/40 shadow-lg shadow-violet-500/5">
                <IconComponent
                  size={item.size}
                  style={{ color: item.color }}
                  className="opacity-40 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingIconsBackground;
