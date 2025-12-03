export default function Presentacion() {
  return (
    <>
      <div className="flex justify-center gap-6 mb-6 ">
        <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex justify-center items-center text-xs text-gray-400 ">
          Foto
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-700">Tu Nombre</h1>

          <h2 className="text-sm font-semibold text-gray-700 mt-1">
            Tu Profesión u Ocupación
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Breve resumen profesional para destacar fortalezas.
          </p>
        </div>

      </div>

      <hr className="border-gray-200" />
    </>
  );
}
