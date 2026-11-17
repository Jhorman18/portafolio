/* Contenido definitivo (DESIGN.md §10). Un solo lugar para los textos del sitio.
   Los datos sin confirmar llevan el marcador ⟦CONFIRMAR⟧ y se pintan visibles. */

export const EMAIL = 'jhormanc150@gmail.com';
export const GITHUB = 'https://github.com/Jhorman18';
export const LINKEDIN = 'https://www.linkedin.com/in/jhorman-cortes/';
export const CV = '/cv_Jhorman_Cortes.pdf';

export const navegacion = [
  { id: 'sobre-mi', texto: 'Sobre mí' },
  { id: 'servicios', texto: 'Servicios' },
  { id: 'proyectos', texto: 'Proyectos' },
  { id: 'contacto', texto: 'Contacto' },
];

export const inicio = {
  quien: 'Jhorman Cortes — Bogotá',
  disponible: 'Disponible para proyectos y equipos',
  lead: 'Desarrollador full stack. Diseño y construyo aplicaciones web, APIs y automatizaciones que las empresas usan todos los días.',
};

export const sobreMi = {
  lead: 'Soy Jhorman, desarrollador full stack en Bogotá. Llevo más de tres años construyendo software que empresas reales usan para operar todos los días.',
  body: 'Me gusta entender cómo funciona el negocio antes de escribir la primera línea. Así he pasado procesos que vivían en hojas de cálculo y correos a plataformas que se sostienen solas: selección de personal, gestión documental, campañas de correo y sitios corporativos.',
  personal: 'Lo que más disfruto es crear cosas y quitarle a la gente el trabajo repetitivo: buscar otra forma de hacer los procesos para que sean más ágiles y más llevaderos para quien los usa todos los días.',
  pasos: [
    { n: '01', titulo: 'Entiendo', texto: 'Primero el problema y quién lo sufre; después la tecnología.' },
    { n: '02', titulo: 'Diseño', texto: 'Propongo la solución más simple que resuelva todo el problema.' },
    { n: '03', titulo: 'Construyo', texto: 'Entregas cortas y visibles, con metodología Scrum. Ves avances cada semana.' },
    { n: '04', titulo: 'Acompaño', texto: 'No desaparezco en producción: soporte, ajustes y mejoras.' },
  ],
  datos: [
    { k: 'Ubicación', v: 'Bogotá, Colombia' },
    { k: 'Experiencia', v: '3+ años' },
    { k: 'Enfoque', v: 'Full stack: interfaz, API y datos' },
    { k: 'Formación', v: 'Técnico en Programación de Software · Tecnólogo en Análisis y Desarrollo de Software (finaliza en diciembre de 2026)' },
    { k: 'Idiomas', v: 'Español nativo, inglés básico (A2)' },
  ],
};

export const servicios = [
  { n: '01', titulo: 'Interfaces web', pieza: 'interfaces', desc: 'Interfaces rápidas, accesibles y cuidadas al detalle, que funcionan igual de bien en el celular.', caps: ['React', 'Diseño responsive', 'Microinteracciones'] },
  { n: '02', titulo: 'APIs y backend', pieza: 'apis', desc: 'Servicios sólidos y seguros que conectan todo: autenticación, roles, validación y documentación.', caps: ['Node.js', 'Express', 'JWT'] },
  { n: '03', titulo: 'Bases de datos', pieza: 'datos', desc: 'Modelos de datos claros, consultas que no se caen con el volumen y migraciones sin sustos.', caps: ['Prisma', 'MySQL', 'MariaDB'] },
  { n: '04', titulo: 'Software empresarial', pieza: 'empresarial', desc: 'Plataformas internas a medida: gestión documental, selección de personal, operación comercial.', caps: ['SaaS', 'Roles y permisos', 'Scrum'] },
  { n: '05', titulo: 'Automatizaciones', pieza: 'automatizaciones', desc: 'Flujos que eliminan el trabajo repetitivo y conectan sistemas que antes no se hablaban.', caps: ['n8n', 'Python', 'Integraciones'] },
  { n: '06', titulo: 'Análisis de datos', pieza: 'analisis', desc: 'Datos limpios y reportes que sirven para decidir, no solo para mirar.', caps: ['ETL', 'Pandas', 'Dashboards'] },
];

export const stack = [
  { cat: 'Frontend', tec: ['React 19', 'JavaScript', 'Tailwind CSS', 'Vite'] },
  { cat: 'Backend', tec: ['Node.js', 'Express', 'Postman'] },
  { cat: 'Datos', tec: ['Prisma', 'MySQL', 'MariaDB', 'PostgreSQL'] },
  { cat: 'Automatización', tec: ['Python', 'n8n', 'Pandas'] },
  { cat: 'Flujo de trabajo', tec: ['Git', 'GitHub', 'Scrum'] },
];

export const metricas = [
  { valor: 3, sufijo: '+', etiqueta: 'años de experiencia' },
  { valor: 4, sufijo: '', etiqueta: 'sistemas en producción' },
  { valor: 10, sufijo: '+', etiqueta: 'tecnologías' },
];
