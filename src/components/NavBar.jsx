import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between shadow-md">
      <h2 className="text-xl font-bold">CV</h2>

      <ul className="flex gap-6">
        <li>
          <Link className="hover:text-gray-200" to="/">Presentación</Link>
        </li>
        <li>
          <Link className="hover:text-gray-200" to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link className="hover:text-gray-200" to="/experiencia">Experiencia</Link>
        </li>
      </ul>
    </nav>
  );
}
