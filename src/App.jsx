import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import GuiaManita from './components/GuiaManita';
import Inicio from './sections/Inicio';
import SobreMi from './sections/SobreMi';
import Servicios from './sections/Servicios';
import Proyectos from './sections/Proyectos';
import Contacto from './sections/Contacto';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useMediaQuery } from './hooks/useMediaQuery';

import { useTaller, vivo } from './three/store';
import './styles/componentes.css';
import './styles/secciones.css';
import './styles/ajustes.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function App() {
  const reducido = useReducedMotion();
  const movil = useMediaQuery('(max-width: 833px)');
  const perfil = useTaller((s) => s.perfil);
  const progreso = useRef(null);
  useLenis(!reducido && !movil);
  useEffect(() => {
    document.documentElement.classList.toggle('con-scrub', !movil && ['completo', 'ligero'].includes(perfil));
    ScrollTrigger.refresh();
  }, [perfil, movil]);
  useEffect(() => {
    document.documentElement.classList.toggle('reducido', reducido);
    const id = setTimeout(() => {
      const perfil = reducido ? 'estatico' : 'ligero';
      useTaller.getState().set({ perfil, acoplado: movil || reducido });
      document.documentElement.classList.toggle('con-scrub', !movil && ['completo', 'ligero'].includes(perfil));
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(id);
  }, [reducido, movil]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.add('is-in'); observer.unobserve(target); }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.titular, .aparecer, .etiqueta, .lista-servicios').forEach((el) => observer.observe(el));
    const actualizar = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      progreso.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      const sections = [...document.querySelectorAll('[data-seccion]')];
      const activa = sections.findLast((el) => el.getBoundingClientRect().top <= innerHeight * 0.5) || sections[0];
      if (activa) useTaller.getState().set({ seccion: activa.dataset.seccion });
    };
    actualizar();
    const mover = (e) => { vivo.pointer.x = e.clientX / innerWidth * 2 - 1; vivo.pointer.y = 1 - e.clientY / innerHeight * 2; };
    const tocar = (e) => {
      if (e.target.closest('a, button, input, textarea')) return;
      const r = document.querySelector('[data-vista="hero"]').getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) vivo.golpe = performance.now();
    };
    window.addEventListener('scroll', actualizar, { passive: true });
    window.addEventListener('pointermove', mover, { passive: true });
    window.addEventListener('click', tocar);
    return () => { observer.disconnect(); window.removeEventListener('scroll', actualizar); window.removeEventListener('pointermove', mover); window.removeEventListener('click', tocar); };
  }, []);
  return <>
    <a href="#contenido" className="saltar">Saltar al contenido</a>
    <div className="progreso" ref={progreso} aria-hidden="true" />
    <Navbar />
    <main id="contenido"><Inicio /><SobreMi /><Servicios /><Proyectos /><Contacto /></main>
    <Footer />

    <GuiaManita />
  </>;
}
