import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Presentacion from "./pages/Presentacion";
import Experiencia from "./pages/Experiencia";
import Contacto from "./pages/Contacto";

import Pruebas from "./pages/Pruebas";
import CharactersList from "./features/rickmorty/CharactersList";
import CharacterById from "./features/rickmorty/CharacterById";
import EpisodeById from "./features/rickmorty/EpisodeById";

import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="presentacion">
                  <Presentacion />
                </section>

                <section id="experiencia">
                  <Experiencia />
                </section>

                <section id="contacto">
                  <Contacto />
                </section>
              </>
            }
          />

          <Route path="/pruebas" element={<Pruebas />} />
          <Route path="/pruebas/personajes" element={<CharactersList />} />
          <Route path="/pruebas/personaje" element={<CharacterById />} />
          <Route path="/pruebas/episodio" element={<EpisodeById />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
