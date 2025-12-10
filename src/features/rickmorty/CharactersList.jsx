import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCharacters = async () => {
    try {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error al cargar personajes", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <section className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(175_80%_50%_/_0.05),_transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">

        <Link
          to="/pruebas"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-10 text-center">
          Lista de <span className="text-gradient">Personajes</span>
        </h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Cargando...</p>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {characters.map((char) => (
              <div
                key={char.id}
                className="card-glass rounded-2xl p-5 transition-all hover:border-primary/40"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="rounded-xl w-full mb-4"
                />

                <h3 className="font-display text-xl font-bold">{char.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {char.species}
                </p>

                <p
                  className={`mt-2 text-sm font-semibold ${
                    char.status === "Alive"
                      ? "text-green-400"
                      : char.status === "Dead"
                      ? "text-red-400"
                      : "text-yellow-300"
                  }`}
                >
                  {char.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CharactersList;
