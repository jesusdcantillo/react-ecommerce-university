import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [cartCount] = useState(0);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            🛒 TechShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">
                  🛒 Carrito ({cartCount})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
