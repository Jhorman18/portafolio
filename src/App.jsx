import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Presentacion from "./pages/Presentacion";
import Experiencia from "./pages/Experiencia";
import Contacto from "./pages/Contacto";
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-42">
        <div className="w-full bg-white rounded-3xl shadow-lg p-8">
          <div>
            <Routes>
              <Route path="/" element={<Presentacion />} />
              <Route path="/experiencia" element={<Experiencia />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </div>

        </div>
      </div>
    </>
  );
}


export default App;
