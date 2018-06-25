import React from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column mt-10">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <span className="oi oi-briefcase" />
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                <span className="oi oi-clipboard" />
                Pedidos <span className="badge badge-light">0</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <span className="oi oi-box" />
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link">
                <span className="oi oi-people" />
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">
                <span className="oi oi-excerpt" />
                Reportes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoices">
                <span className="oi oi-document" />
                Facturacion
              </Link>
            </li>
          </ul>

          <h6 className="pl-10 text-muted nav-separator">
            <span>OTROS LINKS</span>
          </h6>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/settings">
                <span className="oi oi-cog" />
                Configuracion
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
