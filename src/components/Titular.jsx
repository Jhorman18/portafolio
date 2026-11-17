/**
 * Titular con revelado por líneas (§9). Cada línea vive en un contenedor con
 * overflow oculto; la palabra clave va en <em> (Fraunces itálica).
 */
export default function Titular({ as: Etiqueta = 'h2', className = 'h2', lineas, ...resto }) {
  return (
    <Etiqueta className={`${className} titular`} {...resto}>
      {lineas.map((linea, i) => (
        <span className="linea" key={i}>
          <span>{linea}</span>
        </span>
      ))}
    </Etiqueta>
  );
}
