import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTheme } from '../context/ThemeContext';
import { useTaller } from '../three/store';
import { CV, EMAIL, GITHUB, LINKEDIN, navegacion } from '../data/contenido';

const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const seccion = useTaller((s) => s.seccion);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const btnMenuRef = useRef(null);
  const btnCerrarRef = useRef(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Se oculta al bajar más de 80 px y reaparece al subir (§9)
  useGSAP(() => {
    const nav = navRef.current;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        nav.classList.toggle('is-scroll', y > 8);
        if (self.direction > 0 && y > 80) nav.classList.add('is-oculta');
        else if (self.direction < 0) nav.classList.remove('is-oculta');
      },
    });
  }, []);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1E1520' : '#FFFFFF');
  }, [theme]);

  const cambiarTema = () => {
    const html = document.documentElement;
    if (!reducido()) {
      html.classList.add('tema-transicion');
      window.setTimeout(() => html.classList.remove('tema-transicion'), 450);
    }
    toggleTheme();
  };

  const abrirMenu = () => {
    menuRef.current.showModal();
    setMenuAbierto(true);
    requestAnimationFrame(() => {
      menuRef.current?.classList.add('is-abierto');
      btnCerrarRef.current?.focus();
    });
  };
  const cerrarMenu = (devolverFoco = true) => {
    const menu = menuRef.current;
    menu.classList.remove('is-abierto');
    window.setTimeout(() => {
      if (menu.open) menu.close();
      setMenuAbierto(false);
      if (devolverFoco) btnMenuRef.current?.focus();
    }, reducido() || !devolverFoco ? 0 : 300);
  };

  return (
    <>
      <header className="nav" ref={navRef} onFocus={() => navRef.current.classList.remove('is-oculta')}>
        <div className="contenedor">
          <a className="marca" href="#inicio">Jhorman Cortes</a>
          <nav className="links" aria-label="Principal">
            {navegacion.map((n) => (
              <a key={n.id} className="navlink" href={`#${n.id}`} aria-current={seccion === n.id ? 'true' : undefined}>
                {n.texto}
              </a>
            ))}
          </nav>
          <div className="acciones">
            <button
              className="btn-icono"
              type="button"
              onClick={cambiarTema}
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} aria-hidden="true" /> : <Moon size={20} strokeWidth={1.5} aria-hidden="true" />}
            </button>
            <a className="link cv" href={CV} download>Descargar CV</a>
            <button
              className="btn-texto solo-movil"
              type="button"
              ref={btnMenuRef}
              onClick={abrirMenu}
              aria-haspopup="dialog"
              aria-expanded={menuAbierto}
            >
              Menú
            </button>
          </div>
        </div>
      </header>

      <dialog
        className="menu-movil"
        ref={menuRef}
        aria-label="Menú"
        onCancel={(e) => { e.preventDefault(); cerrarMenu(); }}
      >
        <div className="contenedor cabeza">
          <span className="marca-menu fraunces">Jhorman Cortes</span>
          <button className="btn-texto" type="button" ref={btnCerrarRef} onClick={() => cerrarMenu()}>Cerrar</button>
        </div>
        <nav className="contenedor" aria-label="Menú móvil">
          {navegacion.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => cerrarMenu(false)}>{n.texto}</a>
          ))}
        </nav>
        <div className="contenedor pie label">
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a className="link" href={CV} download>Descargar CV</a>
        </div>
      </dialog>
    </>
  );
}
