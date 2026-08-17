import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import ScrollProgress from "./components/ScrollProgress";
import GlobalFloatingBackground from "./components/GlobalFloatingBackground";
import ScrollSectionStack from "./components/ScrollSectionStack";
import TechMarquee from "./components/TechMarquee";
import Presentacion from "./pages/Presentacion";
import Experiencia from "./pages/Experiencia";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#090A0F] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <GlobalFloatingBackground />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 px-2 sm:px-4 md:px-6 max-w-[1550px] mx-auto pt-2">
        <Routes>
          <Route
            path="/"
            element={
              <ScrollSectionStack>
                {/* Capa 1: Hero & Marquee */}
                <section id="hero" className="w-full">
                  <Presentacion />
                  <TechMarquee />
                </section>

                {/* Capa 2: Experiencia & Stack */}
                <section id="experiencia" className="w-full">
                  <Experiencia />
                </section>

                {/* Capa 3: Proyectos */}
                <section id="proyectos" className="w-full">
                  <Proyectos />
                </section>

                {/* Capa 4: Contacto */}
                <section id="contacto" className="w-full">
                  <Contacto />
                </section>
              </ScrollSectionStack>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
