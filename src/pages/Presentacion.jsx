import perfil from "../assets/perfil.jpeg";

export default function Presentacion() {
  return (
    <>
      <div className="flex justify-center gap-6 mb-6 ">
        <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden">
          <img
            src={perfil}
            alt="Jhorman Cortes"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-700">Jhorman Cortes</h1>

          <h2 className="text-sm font-semibold text-gray-700 mt-1">
            Desarrolador de Software
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Full Stack Developer con experiencia en React, Node.js, Tailwind y SQL. <br /> Enfocado en soluciones eficientes, código limpio y aprendizaje constante
          </p>
        </div>

      </div>

      <hr className="border-gray-200" />
    </>
  );
}
