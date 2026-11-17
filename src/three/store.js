/* Estado del recorrido (§8.18). Las secciones lo actualizan; la escena 3D lo lee.
   Este archivo NO importa three: vive en el bundle inicial. */
import { create } from 'zustand';

const CLAVE_OCULTO = 'avatar-oculto';

function leerOculto() {
  try { return localStorage.getItem(CLAVE_OCULTO) === '1'; } catch { return false; }
}

export const useTaller = create((set) => ({
  // Recorrido del avatar
  seccion: 'inicio',          // inicio | sobre-mi | servicios | proyectos | contacto | footer
  filaServicio: null,         // índice de la fila abierta (o null)
  estadoFormulario: 'reposo', // reposo | enviando | exito | error
  escribiendo: false,
  detalleAbierto: false,
  avatarOculto: leerOculto(),
  avatarListo: false,
  // Escena
  perfil: 'pendiente',        // pendiente | completo | ligero | estatico | sin-webgl
  escenaLista: false,
  acoplado: false,            // avatar acoplado en la esquina (móvil y movimiento reducido)

  set,
  alternarAvatar: () => set((s) => {
    const avatarOculto = !s.avatarOculto;
    try { localStorage.setItem(CLAVE_OCULTO, avatarOculto ? '1' : '0'); } catch { /* solo en memoria */ }
    return { avatarOculto };
  }),
}));

/* Valores que cambian en cada frame: se leen sin provocar renders de React. */
export const vivo = {
  pointer: { x: 0, y: 0 },
  golpe: 0,
  heroProgreso: 0,   // 0 → 1 a lo largo del hero fijo
  revelando: 0,      // nº de titulares revelándose (el avatar baja el ritmo, §9)
  ensambleFin: 0,    // performance.now() en que termina el ensamble del hero
  cierre: 0,         // performance.now() del último envío exitoso
  saludo: 0,         // performance.now() del último toque al avatar acoplado
  asiento: null,     // { x, y } en px del viewport: tope del objeto de contacto
};
