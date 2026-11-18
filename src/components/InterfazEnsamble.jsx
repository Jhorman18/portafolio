import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Hacia dónde sale cada pieza al desarmarse: [x, y, giro]. La entrada usa el mismo camino al revés.
const rumbos = [[-.55, .4, -6], [.85, -.75, 4], [1, -.15, 5], [-.6, 1, -4], [.35, 1, 3]];
const etapas = ['01 — La estructura', '02 — La navegación', '03 — El contenido', '04 — Todo conectado'];
const suave = (t) => 1 - Math.pow(1 - t, 3);
const limitar = (v) => Math.min(1, Math.max(0, v));

export default function InterfazEnsamble() {
  const ref = useRef(null);
  const reducido = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const partes = [...el.querySelectorAll('[data-pieza]')];
    const etiqueta = el.querySelector('[data-etapa]');
    const hero = document.querySelector('#inicio');
    let raf = 0, inicio = 0, entradaLista = reducido, etapaPrevia = '';

    const pintar = (ahora) => {
      // Entrada: las piezas llegan una tras otra (≈1,8 s en total).
      const entrada = entradaLista ? 1 : limitar((ahora - inicio) / 1800);
      // Salida: al bajar, las piezas se separan en orden inverso.
      const recorrido = innerWidth < 834 ? 420 : Math.max(1, (hero?.offsetHeight || innerHeight) - innerHeight) * .75;
      const salida = reducido ? 0 : limitar(scrollY / recorrido);

      partes.forEach((pieza, i) => {
        const llegada = suave(limitar((entrada - i * .13) / .48));
        const j = partes.length - 1 - i;
        const separacion = suave(limitar((salida - j * .08) / .68));
        const fuera = Math.max(1 - llegada, separacion);
        const [rx, ry, giro] = rumbos[i % rumbos.length];
        const distancia = innerWidth < 834 ? 70 : 150;
        pieza.style.opacity = (1 - fuera * .85).toFixed(3);
        pieza.style.transform = fuera < .001 ? '' :
          `translate3d(${(rx * distancia * fuera).toFixed(1)}px,${(ry * distancia * fuera).toFixed(1)}px,0) rotate(${(giro * fuera).toFixed(2)}deg) scale(${(1 - fuera * .06).toFixed(3)})`;
      });

      const progreso = salida > .02 ? 1 - salida : entrada;
      const etapa = salida > .02 ? 'Pieza por pieza' : etapas[Math.min(3, Math.floor(progreso * 3.999))];
      if (etapa !== etapaPrevia) { etiqueta.textContent = etapa; etapaPrevia = etapa; }

      if (!entradaLista && entrada >= 1) entradaLista = true;
      raf = entradaLista ? 0 : requestAnimationFrame(pintar);
    };

    const alMover = () => { if (!raf) raf = requestAnimationFrame(pintar); };
    const arrancar = setTimeout(() => { inicio = performance.now(); raf = requestAnimationFrame(pintar); }, reducido ? 0 : 350);
    // Antes de arrancar: todo desarmado (o armado con movimiento reducido).
    if (!reducido) partes.forEach((p, i) => { const [rx, ry, g] = rumbos[i % rumbos.length]; p.style.opacity = '.15'; p.style.transform = `translate3d(${rx * 150}px,${ry * 150}px,0) rotate(${g}deg) scale(.94)`; });

    window.addEventListener('scroll', alMover, { passive: true });
    window.addEventListener('resize', alMover);
    return () => {
      clearTimeout(arrancar); cancelAnimationFrame(raf);
      window.removeEventListener('scroll', alMover);
      window.removeEventListener('resize', alMover);
    };
  }, [reducido]);

  return <div className="interfaz-ensamble" ref={ref} aria-label="Una aplicación se arma por capas y se desarma al desplazarte">
    <div className="ensamble-meta label"><span>De una idea a un sistema.</span><span data-etapa>01 — La estructura</span></div>
    <div className="app-marco">
      <div className="app-barra"><span className="app-puntos">● ● ●</span><span>Mi espacio de trabajo</span><span>↗</span></div>
      <div className="app-grid">
        <aside data-pieza className="app-lateral"><strong>taller.</strong><span className="seleccion">▦ &nbsp; Proyectos</span><span>⌁ &nbsp; Actividad</span><span>▤ &nbsp; Documentos</span><span className="app-perfil">JC <small>Jhorman Cortes</small></span></aside>
        <div className="app-contenido">
          <header data-pieza><span className="label muted">Tu próximo proyecto</span><h3>Las ideas toman forma.</h3><p>Una interfaz clara. Un sistema conectado.</p></header>
          <div data-pieza className="app-resumen"><span><i />Interfaz</span><span><i />API</span><span><i />Datos</span></div>
          <section data-pieza className="app-tablero"><div className="app-tablero-cab"><strong>Construyendo juntos</strong><span>＋</span></div>{[['Entender el problema','Listo'],['Diseñar la solución','Listo'],['Construir y conectar','En proceso']].map(([t,e],i)=><div className="app-tarea" key={t}><span className={i<2?'check':''}>{i<2?'✓':'◌'}</span><span>{t}</span><small>{e}</small></div>)}</section>
          <footer data-pieza className="app-conectado"><span>↳</span><div><strong>Cada pieza tiene su lugar.</strong><p>Diseño, desarrollo y datos, trabajando juntos.</p></div><span>✓</span></footer>
        </div>
      </div>
    </div>
    <p className="ensamble-pie label">Desplázate para desarmarla <span>↓</span></p>
  </div>;
}
