import Navbar from "./components/NavBar";
import Presentacion from "./pages/Presentacion";
import Experiencia from "./pages/Experiencia";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section id="presentacion">
          <Presentacion />
        </section>

        <section id="experiencia">
          <Experiencia />
        </section>

        <section id="contacto">
          <Contacto />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
