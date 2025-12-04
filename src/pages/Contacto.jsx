export default function Contacto() {
  return (
    <>

      <h3 className="text-sm font-bold text-gray-800 mt-4">Contacto</h3>
      <hr className="border-gray-200 mb-4" />

      <ul className="text-sm text-gray-700 space-y-3 mb-8">
        <li className="flex gap-2">
          <span className="mt-1">•</span>
          <span>Email: jhorman@ejemplo.com • Teléfono: +57 300 123 4567</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1">•</span>
          <span>LinkedIn: linkedin.com/in/tuusuario</span>
        </li>
      </ul>

      <h3 className="text-sm font-bold text-gray-800">Habilidades</h3>
      <hr className="border-gray-200 mb-4" />

      <ul className="text-sm text-gray-700 space-y-2">
        <li className="flex gap-2"><span>•</span> HTML - CSS - JS - React - Node.js - Tailwind CSS - SQL</li>
        <li className="flex gap-2"><span>•</span> Comunicación</li>
        <li className="flex gap-2"><span>•</span> Trabajo en equipo</li>
      </ul>

    </>
  );
}
