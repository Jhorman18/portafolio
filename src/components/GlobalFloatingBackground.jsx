import { useEffect, useRef } from "react";
import {
  Laptop,
  Monitor,
  Keyboard,
  Code2,
  FileCode,
  Terminal,
  Database,
  Server,
  Cpu,
  Workflow,
  Binary,
  Boxes,
  Bug,
  FileJson,
  FolderGit2,
  Command,
  Globe,
  ShieldCheck,
  Hash,
  Layers,
} from "lucide-react";

const iconTypes = [
  Laptop,
  Monitor,
  Keyboard,
  Code2,
  FileCode,
  Terminal,
  Database,
  Server,
  Cpu,
  Workflow,
  Binary,
  Boxes,
  Bug,
  FileJson,
  FolderGit2,
  Command,
  Globe,
  ShieldCheck,
  Hash,
  Layers,
];

const GlobalFloatingBackground = () => {
  const containerRef = useRef(null);
  const domRefs = useRef([]);

  useEffect(() => {
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    // Inicializar 20 partículas / íconos con posición y velocidad pausada por toda la ventana
    const particles = iconTypes.map(() => {
      const vxBase = (Math.random() - 0.5) * 0.7 || 0.3; // Velocidad pausada de vagabundeo X
      const vyBase = (Math.random() - 0.5) * 0.7 || 0.3; // Velocidad pausada de vagabundeo Y

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: vxBase,
        vy: vyBase,
        vxBase,
        vyBase,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.8, // Rotación suave
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    const handleMouseMove = (e) => {
      const curX = e.clientX;
      const curY = e.clientY;

      if (lastMouseX !== -1000) {
        mouseSpeedX = curX - lastMouseX;
        mouseSpeedY = curY - lastMouseY;
      }

      mouseX = curX;
      mouseY = curY;
      lastMouseX = curX;
      lastMouseY = curY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId;

    // Bucle Físico a 60 FPS
    const updatePhysics = () => {
      const curWidth = window.innerWidth;
      const curHeight = window.innerHeight;

      particles.forEach((p, i) => {
        // 1. Calcular distancia con el cursor para colisión / empuje
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pushRadius = 170;

        if (dist < pushRadius && dist > 0) {
          // Lanzar el ícono volando en la dirección del empuje
          const overlap = (pushRadius - dist) / pushRadius;
          const force = overlap * 16;
          const angle = Math.atan2(dy, dx);

          p.vx += Math.cos(angle) * force + mouseSpeedX * 0.2;
          p.vy += Math.sin(angle) * force + mouseSpeedY * 0.2;
          p.vr += (Math.random() - 0.5) * 4; // Giro dinámico al ser empujado
        }

        // 2. Mover la posición del ícono libremente
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;

        // 3. Fricción y retorno suave a la velocidad pausada continua de viaje
        p.vx = p.vx * 0.95 + p.vxBase * 0.05;
        p.vy = p.vy * 0.95 + p.vyBase * 0.05;
        p.vr *= 0.97;

        // 4. Reaparición al cruzar los límites de la pantalla (Paseo constante por toda la web)
        const margin = 60;
        if (p.x < -margin) p.x = curWidth + margin;
        if (p.x > curWidth + margin) p.x = -margin;
        if (p.y < -margin) p.y = curHeight + margin;
        if (p.y > curHeight + margin) p.y = -margin;

        // 5. Aplicar posición física directamente al nodo DOM
        const dom = domRefs.current[i];
        if (dom) {
          dom.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
        }
      });

      // Reducir la velocidad del mouse suavemente
      mouseSpeedX *= 0.8;
      mouseSpeedY *= 0.8;

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-[5] select-none"
    >
      {iconTypes.map((IconComponent, index) => (
        <div
          key={index}
          ref={(el) => (domRefs.current[index] = el)}
          className="absolute top-0 left-0 will-change-transform opacity-40 hover:opacity-100 transition-opacity duration-300"
        >
          <IconComponent
            size={32}
            className="text-slate-500 dark:text-slate-400"
          />
        </div>
      ))}
    </div>
  );
};

export default GlobalFloatingBackground;
