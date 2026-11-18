import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/* Fondo del hero: un plano técnico que se dibuja solo.
   Retícula de puntos + trazos de construcción (guías, cotas, cajas) que aparecen y se
   desvanecen, y una luz cálida que sigue al mouse y revela la retícula a su paso. */

const COTAS = ['48', '120', '240', '360', '640', '960', '1440', '24', '8'];
const azar = (min, max) => min + Math.random() * (max - min);
const entero = (min, max) => Math.floor(azar(min, max + 1));
const suave = (t) => 1 - (1 - t) ** 3;

function leerColores() {
  const css = getComputedStyle(document.documentElement);
  const v = (n) => css.getPropertyValue(n).trim();
  return { linea: v('--line'), texto: v('--text-muted'), acento: v('--accent'), oscuro: document.documentElement.classList.contains('dark') };
}

export default function FondoPlano() {
  const ref = useRef(null);
  const reducido = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let ancho = 0, alto = 0, celda = 48, dpr = 1;
    let colores = leerColores();
    let trazos = [];
    let raf = 0, visible = true, previo = performance.now(), proximo = 0;
    const luz = { x: 0, y: 0, tx: 0, ty: 0, ultimoMouse: -1e9 };

    const ajustar = () => {
      const r = canvas.getBoundingClientRect();
      ancho = r.width; alto = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(ancho * dpr); canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      celda = ancho < 834 ? 36 : 48;
      if (!luz.x) { luz.x = luz.tx = ancho * .62; luz.y = luz.ty = alto * .42; }
    };

    const maxTrazos = () => (ancho < 834 ? 4 : 8);

    // Zonas donde no se dibuja: el texto del hero y la barra superior (con margen), para no restarles legibilidad.
    const zonasLibres = () => {
      const c = canvas.getBoundingClientRect();
      return [...document.querySelectorAll('.hero-texto, .hero-meta, .hero-ctas, .hero-pie a, .ensamble-meta, .ensamble-pie, body > #root nav, body > #root header')].map((el) => {
        const r = el.getBoundingClientRect();
        return { x0: r.left - c.left - 28, y0: r.top - c.top - 28, x1: r.right - c.left + 28, y1: r.bottom - c.top + 28 };
      }).filter((z) => z.x1 > z.x0 && z.y1 > z.y0);
    };
    const cajaDe = (t) => (t.tipo === 'caja'
      ? { x0: t.x0, y0: t.y0 - 16, x1: t.x0 + t.w, y1: t.y0 + t.h }
      : { x0: Math.min(t.x0, t.x1) - 14, y0: Math.min(t.y0, t.y1) - 14, x1: Math.max(t.x0, t.x1) + 14, y1: Math.max(t.y0, t.y1) + 14 });
    const choca = (a, zonas) => zonas.some((z) => a.x0 < z.x1 && a.x1 > z.x0 && a.y0 < z.y1 && a.y1 > z.y0);
    const nuevoTrazoLibre = (ahora, dibujado = false) => {
      const zonas = zonasLibres();
      for (let i = 0; i < 14; i++) {
        const t = nuevoTrazo(ahora, dibujado);
        if (!choca(cajaDe(t), zonas)) return t;
      }
      return null;
    };

    const nuevoTrazo = (ahora, dibujado = false) => {
      const cols = Math.floor(ancho / celda), filas = Math.floor(alto / celda);
      const x0 = entero(1, Math.max(1, cols - 2)) * celda, y0 = entero(1, Math.max(1, filas - 2)) * celda;
      const tipo = Math.random() < .28 ? 'caja' : Math.random() < .5 ? 'h' : 'v';
      const largo = entero(3, 9) * celda;
      const t = {
        tipo, x0, y0, nacio: dibujado ? ahora - 1400 : ahora,
        dibujar: azar(1100, 1700), sostener: azar(2200, 3600), apagar: 900,
        cota: Math.random() < .6 ? COTAS[entero(0, COTAS.length - 1)] : null,
      };
      if (tipo === 'h') t.x1 = Math.min(x0 + largo, (cols - 1) * celda), t.y1 = y0;
      else if (tipo === 'v') t.x1 = x0, t.y1 = Math.min(y0 + largo, (filas - 1) * celda);
      else { t.w = entero(3, 7) * celda; t.h = entero(2, 4) * celda; }
      return t;
    };

    const alfaDe = (t, ahora) => {
      const e = ahora - t.nacio;
      if (e < t.dibujar + t.sostener) return 1;
      return Math.max(0, 1 - (e - t.dibujar - t.sostener) / t.apagar);
    };

    const remate = (x, y, vertical) => {
      ctx.beginPath();
      if (vertical) { ctx.moveTo(x - 5, y); ctx.lineTo(x + 5, y); } else { ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5); }
      ctx.stroke();
    };

    const dibujarTrazo = (t, ahora) => {
      const p = reducido ? 1 : suave(Math.min(1, (ahora - t.nacio) / t.dibujar));
      const a = reducido ? 1 : alfaDe(t, ahora);
      if (a <= 0) return;
      ctx.globalAlpha = a * (colores.oscuro ? .55 : .5);
      ctx.strokeStyle = colores.texto; ctx.fillStyle = colores.texto; ctx.lineWidth = 1;
      if (t.tipo === 'caja') {
        // el contorno se traza en orden, como si se dibujara a mano
        const lados = [[t.x0, t.y0, t.x0 + t.w, t.y0], [t.x0 + t.w, t.y0, t.x0 + t.w, t.y0 + t.h], [t.x0 + t.w, t.y0 + t.h, t.x0, t.y0 + t.h], [t.x0, t.y0 + t.h, t.x0, t.y0]];
        const total = (t.w + t.h) * 2; let resto = p * total;
        ctx.setLineDash([4, 4]); ctx.beginPath();
        for (const [ax, ay, bx, by] of lados) {
          const l = Math.hypot(bx - ax, by - ay); if (resto <= 0) break;
          const k = Math.min(1, resto / l); ctx.moveTo(ax, ay); ctx.lineTo(ax + (bx - ax) * k, ay + (by - ay) * k); resto -= l;
        }
        ctx.stroke(); ctx.setLineDash([]);
        if (t.cota && p > .95) {
          ctx.font = '10px "Geist Mono", ui-monospace, monospace';
          ctx.fillText(`${t.cota} × ${Math.round(t.h / celda) * 8}`, t.x0 + 6, t.y0 - 6);
        }
      } else {
        const vertical = t.tipo === 'v';
        const x = t.x0 + (t.x1 - t.x0) * p, y = t.y0 + (t.y1 - t.y0) * p;
        ctx.beginPath(); ctx.moveTo(t.x0, t.y0); ctx.lineTo(x, y); ctx.stroke();
        remate(t.x0, t.y0, vertical);
        if (p > .98) {
          remate(t.x1, t.y1, vertical);
          if (t.cota) {
            ctx.font = '10px "Geist Mono", ui-monospace, monospace';
            if (vertical) { ctx.save(); ctx.translate(t.x0 - 8, (t.y0 + t.y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(t.cota, 0, 0); ctx.restore(); }
            else { ctx.textAlign = 'center'; ctx.fillText(t.cota, (t.x0 + t.x1) / 2, t.y0 - 7); ctx.textAlign = 'start'; }
          }
        } else {
          // punta de flecha mientras se dibuja
          ctx.beginPath();
          if (vertical) { ctx.moveTo(x - 3.5, y - 6); ctx.lineTo(x, y); ctx.lineTo(x + 3.5, y - 6); } else { ctx.moveTo(x - 6, y - 3.5); ctx.lineTo(x, y); ctx.lineTo(x - 6, y + 3.5); }
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const pintar = (ahora) => {
      ctx.clearRect(0, 0, ancho, alto);
      // luz cálida de cobre
      const radio = Math.max(ancho, alto) * .38;
      const g = ctx.createRadialGradient(luz.x, luz.y, 0, luz.x, luz.y, radio);
      g.addColorStop(0, colores.acento);
      g.addColorStop(1, 'transparent');
      ctx.globalAlpha = colores.oscuro ? .085 : .06;
      ctx.fillStyle = g; ctx.fillRect(0, 0, ancho, alto);
      ctx.globalAlpha = 1;
      // retícula: líneas maestras cada 4 celdas + puntos que la luz revela
      ctx.strokeStyle = colores.linea; ctx.lineWidth = 1; ctx.globalAlpha = .35;
      ctx.beginPath();
      for (let x = celda * 4; x < ancho; x += celda * 4) { ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, alto); }
      for (let y = celda * 4; y < alto; y += celda * 4) { ctx.moveTo(0, y + .5); ctx.lineTo(ancho, y + .5); }
      ctx.stroke();
      const r2 = (radio * .8) ** 2;
      for (let x = celda; x < ancho; x += celda) {
        for (let y = celda; y < alto; y += celda) {
          const d = (x - luz.x) ** 2 + (y - luz.y) ** 2;
          const cerca = d < r2 ? 1 - d / r2 : 0;
          ctx.globalAlpha = .45 + cerca * .55;
          ctx.fillStyle = cerca > .15 ? colores.texto : colores.linea;
          ctx.fillRect(x - .75, y - .75, 1.5, 1.5);
        }
      }
      ctx.globalAlpha = 1;
      for (const t of trazos) dibujarTrazo(t, ahora);
    };

    const frame = (ahora) => {
      const dt = Math.min(.05, (ahora - previo) / 1000); previo = ahora;
      // la luz sigue al mouse; sin mouse deriva lento
      if (ahora - luz.ultimoMouse > 3000) {
        const s = ahora / 1000;
        luz.tx = ancho * (.6 + Math.sin(s * .21) * .18);
        luz.ty = alto * (.42 + Math.cos(s * .17) * .16);
      }
      const k = 1 - Math.exp(-dt * 3);
      luz.x += (luz.tx - luz.x) * k; luz.y += (luz.ty - luz.y) * k;
      trazos = trazos.filter((t) => alfaDe(t, ahora) > 0);
      if (ahora > proximo && trazos.length < maxTrazos()) { const t = nuevoTrazoLibre(ahora); if (t) trazos.push(t); proximo = ahora + azar(550, 1100); }
      pintar(ahora);
      raf = requestAnimationFrame(frame);
    };

    const arrancar = () => { cancelAnimationFrame(raf); if (visible && !document.hidden && !reducido) { previo = performance.now(); raf = requestAnimationFrame(frame); } };
    const composicionFija = () => {
      const ahora = performance.now();
      trazos = Array.from({ length: maxTrazos() - 2 }, () => nuevoTrazoLibre(ahora, true)).filter(Boolean);
      pintar(ahora);
    };

    ajustar();
    if (reducido) composicionFija(); else { trazos = [nuevoTrazoLibre(performance.now(), true), nuevoTrazoLibre(performance.now(), true)].filter(Boolean); arrancar(); }

    const alMover = (e) => {
      const r = canvas.getBoundingClientRect();
      luz.tx = e.clientX - r.left; luz.ty = e.clientY - r.top; luz.ultimoMouse = performance.now();
    };
    const alCambiarTamano = () => { ajustar(); if (reducido) composicionFija(); };
    const alCambiarTema = () => { colores = leerColores(); if (reducido) pintar(performance.now()); };
    const alCambiarVisibilidad = () => arrancar();

    const ro = new ResizeObserver(alCambiarTamano); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; arrancar(); });
    io.observe(canvas);
    const mo = new MutationObserver(alCambiarTema);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('pointermove', alMover, { passive: true });
    document.addEventListener('visibilitychange', alCambiarVisibilidad);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect();
      window.removeEventListener('pointermove', alMover);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
    };
  }, [reducido]);

  return <canvas ref={ref} className="fondo-plano" aria-hidden="true" />;
}
