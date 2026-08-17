import { useEffect, useRef, useState } from "react";

/**
 * AsciiBrain3D — Responsive Pure 3D ASCII Animation
 *
 * Scaled dynamically to fit beside text on 1366x768 / 1536x864 / 1920x1080 screens
 * without forcing vertical scrollbars or breaking the viewport layout.
 */
const AsciiBrain3D = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = Math.min(parent.clientWidth || 450, 460);
      const height = Math.min(width * 0.88, 390);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const CODE_SNIPPETS = [
      "{ }", "< >", "0 1", "=>", "i++", "fn()", "REST", "SQL",
      "React", "Node", "Prisma", "API", "async", "await", "100%",
      "Vite", "MySQL", "Git", "SaaS", "JWT"
    ];

    const points = [];
    const numPoints = 950;

    for (let i = 0; i < numPoints; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * Math.PI;

      const side = Math.sin(u) > 0 ? 1 : -1;
      const gap = 0.24 * side;
      const fold = 0.2 * Math.sin(u * 5) * Math.cos(v * 6);

      const r = 1.45 + fold;
      let x = (r * Math.cos(v) * Math.cos(u) + gap) * 1.25;
      let y = (r * Math.sin(v) * 0.95) * 1.25;
      let z = (r * Math.cos(v) * Math.sin(u)) * 1.25;

      if (i > numPoints - 80) {
        x = (Math.random() - 0.5) * 0.4;
        y = -1.25 - Math.random() * 0.7;
        z = (Math.random() - 0.5) * 0.4;
      }

      const glyph = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      points.push({ x, y, z, origX: x, origY: y, origZ: z, glyph });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const centerX = width / 2;
      const centerY = height / 2;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      angleY += 0.009 + mouseRef.current.x * 0.0006;
      angleX = Math.sin(Date.now() * 0.001) * 0.12 + mouseRef.current.y * 0.006;

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const pulse = 1 + Math.sin(Date.now() * 0.003 + p.origY * 2) * 0.04;
        let px = p.origX * pulse;
        let py = p.origY * pulse;
        let pz = p.origZ * pulse;

        let x1 = px * cosY - pz * sinY;
        let z1 = pz * cosY + px * sinY;

        let y1 = py * cosX - z1 * sinX;
        let z2 = z1 * cosX + py * sinX;

        const scale = 180 / (2.7 + z2 / 1.8);
        const screenX = centerX + x1 * scale;
        const screenY = centerY - y1 * scale;

        projected.push({
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          glyph: p.glyph,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const depthNorm = (pt.z + 2.5) / 5;
        const alpha = Math.max(0.3, Math.min(1, depthNorm * 0.95 + 0.2));

        let color;
        if (isDark) {
          if (depthNorm > 0.65) color = `rgba(0, 240, 255, ${alpha})`;
          else if (depthNorm > 0.35) color = `rgba(59, 130, 246, ${alpha})`;
          else color = `rgba(147, 51, 234, ${alpha * 0.85})`;
        } else {
          if (depthNorm > 0.65) color = `rgba(26, 47, 251, ${alpha * 0.95})`;
          else if (depthNorm > 0.35) color = `rgba(15, 23, 42, ${alpha * 0.9})`;
          else color = `rgba(71, 85, 105, ${alpha * 0.75})`;
        }

        ctx.fillStyle = color;

        if (i % 5 === 0) {
          const fontSize = Math.max(10, Math.floor(pt.scale * 0.088));
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(pt.glyph, pt.x, pt.y);
        } else {
          const charList = "@#%*+=:-. ";
          const charIdx = Math.floor(depthNorm * (charList.length - 1));
          const char = charList[charIdx] || ".";
          const fontSize = Math.max(9, Math.floor(pt.scale * 0.082));
          ctx.font = `${fontSize}px monospace`;
          ctx.fillText(char, pt.x, pt.y);
        }
      }

      // Orbital Rings
      const drawRing = (radius, count, speed, tiltOffset, labelPrefix) => {
        for (let i = 0; i < count; i++) {
          const ringAngle = (i / count) * Math.PI * 2 + Date.now() * speed;
          const rx = Math.cos(ringAngle) * radius;
          const rz = Math.sin(ringAngle) * radius * 0.38;
          const ry = Math.sin(ringAngle * 2 + tiltOffset) * 18;

          const rx1 = rx * cosY - rz * sinY;
          const rz1 = rz * cosY + rx * sinY;
          const ry1 = ry * cosX - rz1 * sinX;
          const rz2 = rz1 * cosX + ry * sinX;

          const rScreenX = centerX + rx1;
          const rScreenY = centerY - ry1;

          const rAlpha = Math.max(0.35, (rz2 + 200) / 400);
          ctx.fillStyle = isDark
            ? `rgba(59, 130, 246, ${rAlpha})`
            : `rgba(26, 47, 251, ${rAlpha})`;
          ctx.font = "bold 10px monospace";
          ctx.fillText(`${labelPrefix}${(i * 13).toString(16).toUpperCase()}`, rScreenX, rScreenY);
        }
      };

      drawRing(170, 36, 0.0007, 0, "0x");
      drawRing(130, 20, -0.0009, Math.PI / 2, "::");

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = (e.clientX - rect.left - rect.width / 2) * 0.6;
    mouseRef.current.targetY = (e.clientY - rect.top - rect.height / 2) * 0.6;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center cursor-pointer select-none group"
    >
      <div className="absolute w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-tr from-[#1A2FFB]/25 via-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      <canvas
        ref={canvasRef}
        className="w-full max-w-[460px] h-[320px] sm:h-[360px] lg:h-[390px] object-contain drop-shadow-[0_0_30px_rgba(26,47,251,0.35)] transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

export default AsciiBrain3D;
