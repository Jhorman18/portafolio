import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function InterfazEnsamble() {
  const ref = useRef(null);
  const reducido = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const partes = [...el.querySelectorAll('[data-pieza]')];
    const actualizar = () => {
      const hero = document.querySelector('#inicio');
      const recorrido = innerWidth < 834 ? 350 : Math.max(1, hero.offsetHeight - innerHeight);
      const p = reducido ? 1 : Math.min(1, Math.max(0, 0.22 + scrollY / recorrido * .78));
      el.dataset.progreso = String(p);
      partes.forEach((pieza, i) => {
        const t = reducido ? 1 : Math.min(1, Math.max(0, (p - i * .13) / .22));
        pieza.style.opacity = String(.3 + t * .7);
        pieza.style.transform = `translate3d(${(1-t)*(i%2?48:-48)}px, ${(1-t)*60}px, 0) rotate(${(1-t)*(i%2?3:-3)}deg)`;
      });
      el.querySelector('[data-etapa]').textContent = p < .2 ? '01 — La estructura' : p < .45 ? '02 — La navegación' : p < .7 ? '03 — El contenido' : '04 — Todo conectado';
    };
    actualizar(); window.addEventListener('scroll', actualizar, {passive:true}); window.addEventListener('resize',actualizar);
    return () => {window.removeEventListener('scroll',actualizar);window.removeEventListener('resize',actualizar);};
  },[reducido]);
  return <div className="interfaz-ensamble" ref={ref} aria-label="Una aplicación se construye por capas al desplazarte">
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
    <p className="ensamble-pie label">Desplázate para construirla <span>↓</span></p>
  </div>;
}

