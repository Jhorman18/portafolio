export default function Experiencia() {
  return (
    <>
      <h3 className="text-sm font-bold text-gray-800">Experiencia laboral</h3>
      <hr className="border-gray-200 mb-4" />

      <div className="border-l-4 border-blue-600 pl-4 py-2 mb-8">
        <h4 className="text-sm font-bold text-blue-700">Puesto, Empresa</h4>
        <p className="text-xs text-gray-500">Fecha inicio - Fecha fin</p>
        <p className="text-sm text-gray-700 mt-2">
          Descripción breve de responsabilidades o logros.
        </p>
      </div>

      <h3 className="text-sm font-bold text-gray-800">Educación</h3>
      <hr className="border-gray-200 mb-4" />

      <div className="border-l-4 border-blue-600 pl-4 py-2">
        <h4 className="text-sm font-bold text-blue-700">
          Nombre de la titulación
        </h4>
        <p className="text-sm text-gray-700">Centro educativo, año de finalización</p>
      </div>

    </>
  );
}
