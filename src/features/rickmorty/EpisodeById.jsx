import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, ArrowLeft, AlertTriangle } from "lucide-react";

const EpisodeById = () => {
  const [id, setId] = useState("");
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  const buscar = async () => {
    setError("");
    setEpisode(null);
    setCharacters([]);

    try {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);

      if (!res.ok) throw new Error("No existe un episodio con ese ID");

      const data = await res.json();
      setEpisode(data);
      console.log(data);

      const charRequests = data.characters.map((url) => fetch(url).then((r) => r.json()));
      const chars = await Promise.all(charRequests);
      setCharacters(chars);

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
          Buscar <span className="text-gradient">Episodio por ID</span>
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
            <Film className="w-4 h-4" /> Buscar episodio
          </button>
        </div>

        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 text-red-400 flex items-center gap-3 border border-red-400/30 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {episode && (
          <div className="mt-12 card-glass p-6 rounded-2xl">
            <h2 className="font-display text-3xl font-bold mb-2 text-center">
              {episode.name}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {episode.air_date} • {episode.episode}
            </p>

            <h3 className="font-display text-xl mb-4">Personajes:</h3>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((char) => (
                <div
                  key={char.id}
                  className="card-glass rounded-xl p-4 hover:border-primary/40 transition"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="rounded-lg mb-3"
                  />

                  <p className="font-display font-semibold">{char.name}</p>
                  <p className="text-muted-foreground text-sm">{char.species}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EpisodeById;
