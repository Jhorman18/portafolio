import { CV, GITHUB } from '../data/contenido';
import { Reloj } from './Basicos';

export default function Footer() {
  return (
    <footer className="pie-sitio" id="pie" data-seccion="footer">
      <div className="contenedor">
        {/* El avatar se para sobre la última letra y se despide (§7.6) */}
        <a className="hablemos fraunces" href="#contacto" aria-label="Hablemos. Ir a contacto">
          Hablemo<span data-zona="footer">s</span>.
        </a>
        <div className="pie-cols small">
          <p>© 2026 Jhorman Steven Cortes Lasso</p>
          <p>Bogotá, <Reloj /></p>
          <p className="pie-links">
            <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="link" href={CV} download>CV</a>
            <a className="link" href="#inicio">Volver arriba ↑</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
