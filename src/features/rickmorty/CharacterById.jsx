import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, AlertTriangle } from "lucide-react";

const CharacterById = () => {
  const [id, setId] = useState("");
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  const buscar = async () => {
    setError("");
    setCharacter(null);

    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      
      if (!res.ok) throw new Error("No existe un personaje con ese ID");

      const data = await res.json();
      setCharacter(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(175_80%_50%_/_0.05),_transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">

        <Link
          to="/pruebas"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-10">
          Buscar <span className="text-gradient">Personaje por ID</span>
        </h1>

        <div className="max-w-md mx-auto card-glass p-6 rounded-2xl">
          <label className="text-sm text-muted-foreground mb-2 block">
            Ingresa un ID
          </label>

          <input
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary transition"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button
            onClick={buscar}
            className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-primary text-primary-foreground rounded-xl glow-effect hover:opacity-90 transition"
          >
            <Search className="w-4 h-4" /> Buscar
          </button>
        </div>

        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 text-red-400 flex items-center gap-3 border border-red-400/30 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {character && (
          <div className="max-w-md mx-auto card-glass p-6 rounded-2xl mt-10">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-xl w-full mb-4"
            />

            <h2 className="font-display text-2xl font-bold mb-2">
              {character.name}
            </h2>

            <p className="text-muted-foreground">{character.species}</p>
            <p className="text-muted-foreground capitalize">{character.gender}</p>
            <p className="mt-2 font-semibold text-primary">{character.status}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CharacterById;
