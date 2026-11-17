import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Boton from '../components/Boton';
import Titular from '../components/Titular';
import { Confirmar, Etiqueta, Reloj } from '../components/Basicos';
import { CV, EMAIL, GITHUB } from '../data/contenido';
import { useTaller, vivo } from '../three/store';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER;
const EMAILJS_TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const REGLAS = {
  name: (v) => v.trim().length >= 2 || 'Escribe tu nombre o el de tu empresa (mínimo 2 letras).',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Revisa el email: debe tener la forma nombre@dominio.com.',
  message: (v) => v.trim().length >= 10 || 'Cuéntame un poco más: escribe al menos 10 caracteres sobre lo que quieres construir.',
};
const CAMPOS = [
  { nombre: 'name', etiqueta: 'Nombre o empresa', tipo: 'text', autoComplete: 'name' },
  { nombre: 'email', etiqueta: 'Email', tipo: 'email', autoComplete: 'email', inputMode: 'email' },
  { nombre: 'message', etiqueta: '¿Qué quieres construir?', area: true },
];
const VACIO = { name: '', email: '', message: '' };

/** 7.5 Contacto — "Cierre del ensamble". Envío real con EmailJS. */
export default function Contacto() {
  const [formData, setFormData] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState('reposo'); // reposo | enviando | exito | error
  const [resumen, setResumen] = useState('');
  const [copiado, setCopiado] = useState(null);
  const refs = useRef({});
  const temporizadores = useRef({});
  const set = useTaller((s) => s.set);




  useEffect(() => {
    const t = temporizadores.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  const cambiarEstado = (e) => { setEstado(e); set({ estadoFormulario: e }); };

  const validar = (nombre, valor) => {
    const r = REGLAS[nombre](valor);
    setErrores((prev) => ({ ...prev, [nombre]: r === true ? undefined : r }));
    return r === true;
  };

  const alEscribir = (nombre, valor) => {
    setFormData((prev) => ({ ...prev, [nombre]: valor }));
    if (errores[nombre]) validar(nombre, valor);
    // El avatar teclea más rápido mientras el visitante escribe (§8.15)
    set({ escribiendo: true });
    clearTimeout(temporizadores.current.escribir);
    temporizadores.current.escribir = setTimeout(() => set({ escribiendo: false }), 1200);
  };

  const copiar = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      const t = document.createElement('textarea');
      t.value = EMAIL; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      t.remove();
    }
    setCopiado(ok);
    clearTimeout(temporizadores.current.copiar);
    temporizadores.current.copiar = setTimeout(() => setCopiado(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estado === 'enviando') return;
    const malos = Object.keys(REGLAS).filter((n) => !validar(n, formData[n]));
    if (malos.length) {
      setResumen(malos.length === 1 ? 'Revisa el campo marcado.' : `Revisa los ${malos.length} campos marcados.`);
      refs.current[malos[0]]?.focus();
      return;
    }
    setResumen('');
    cambiarEstado('enviando');
    clearTimeout(temporizadores.current.estado);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Notificación al dueño del portafolio: es el envío crítico, si falla se
      // muestra error al visitante.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_OWNER,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Auto-respuesta al cliente: best-effort. Si falla, el mensaje del
      // visitante ya llegó igual, así que no se le muestra error por esto.
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CLIENT, templateParams, EMAILJS_PUBLIC_KEY)
        .catch(() => {});

      vivo.cierre = performance.now();
      cambiarEstado('exito');
      setFormData(VACIO);
      setErrores({});
      temporizadores.current.estado = setTimeout(() => cambiarEstado('reposo'), 6000);
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error);
      cambiarEstado('error');
      temporizadores.current.estado = setTimeout(() => cambiarEstado('reposo'), 8000);
    }
  };

  const textoBoton = estado === 'enviando' ? 'Enviando…' : estado === 'exito' ? 'Recibido. Te respondo pronto.' : 'Enviar mensaje';

  return (
    <section id="contacto" className="seccion contacto" data-seccion="contacto" aria-labelledby="contacto-titulo">
      <div className="contenedor grid12 contacto-grid">
        <div className="contacto-info">
          <Etiqueta numero="05">Contacto</Etiqueta>
          <Titular id="contacto-titulo" lineas={['¿Tienes algo', <><em>en mente</em>?</>]} />
          <p className="lead aparecer">
            Cuéntame qué necesitas construir. Te respondo lo antes posible.
          </p>
          <div className="correo aparecer">
            <a className="h3 link correo-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className={`btn-texto label copiar ${copiado ? 'is-copiado' : ''}`} type="button" onClick={copiar}>
              {copiado === null ? 'Copiar' : copiado ? 'Copiado' : 'Selecciónalo y copia'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copiado === null ? '' : copiado ? 'Email copiado al portapapeles' : 'No se pudo copiar automáticamente'}
            </span>
          </div>
          <dl className="datos aparecer">
            <div>
              <dt className="label muted">Ubicación</dt>
              <dd>Bogotá, Colombia · <Reloj /> <span className="muted">GMT−5</span></dd>
            </div>
            <div>
              <dt className="label muted">Enlaces</dt>
              <dd className="enlaces">
                <a className="link" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a className="link" href={CV} download>Descargar CV</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contacto-form">
          {/* Móvil: imagen estática del objeto como cierre visual (§7.5) */}
          
          <form className="formulario aparecer" onSubmit={handleSubmit} noValidate aria-describedby="form-estado">
            {CAMPOS.map((c) => {
              const Control = c.area ? 'textarea' : 'input';
              const error = errores[c.nombre];
              return (
                <div className={`campo ${formData[c.nombre] ? 'is-lleno' : ''} ${error ? 'is-error' : ''}`} key={c.nombre}>
                  <Control
                    id={`f-${c.nombre}`}
                    name={c.nombre}
                    ref={(el) => { refs.current[c.nombre] = el; }}
                    type={c.area ? undefined : c.tipo}
                    rows={c.area ? 4 : undefined}
                    autoComplete={c.autoComplete}
                    inputMode={c.inputMode}
                    spellCheck={c.nombre === 'email' ? false : undefined}
                    required
                    value={formData[c.nombre]}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `f-${c.nombre}-msg` : undefined}
                    disabled={estado === 'enviando'}
                    onChange={(e) => alEscribir(c.nombre, e.target.value)}
                    onBlur={(e) => { if (e.target.value !== '') validar(c.nombre, e.target.value); }}
                  />
                  <label htmlFor={`f-${c.nombre}`}>{c.etiqueta} <span aria-hidden="true">*</span></label>
                  <span className="linea" aria-hidden="true" />
                  {error && <span className="msg" id={`f-${c.nombre}-msg`}>{error}</span>}
                </div>
              );
            })}
            <p className="small muted nota-req">Todos los campos son obligatorios.</p>
            <div className="enviar-fila">
              <Boton
                type="submit"
                flecha={estado === 'reposo' || estado === 'error'}
                cargando={estado === 'enviando'}
                exito={estado === 'exito'}
                aria-disabled={estado === 'enviando' ? 'true' : undefined}
              >
                {textoBoton}
              </Boton>
            </div>
            <p
              className={`form-estado small ${estado === 'error' || resumen ? 'is-error' : ''} ${estado === 'exito' ? 'is-ok' : ''}`}
              id="form-estado"
              role="status"
              aria-live="polite"
            >
              {resumen}
              {estado === 'exito' && 'Mensaje enviado.'}
              {estado === 'error' && (
                <>No se pudo enviar. Escríbeme a <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a></>
              )}
            </p>
          </form>
        </div>

        {/* Zona del objeto y del avatar: él teclea sentado sobre el objeto (§7.5) */}
        <div className="zona-avatar" data-zona="contacto" aria-hidden="true">
          <div className="vista vista-contacto" data-vista="contacto">
            
          </div>
        </div>
      </div>
    </section>
  );
}
