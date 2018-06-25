import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  const logoStyle = {
    width: 150
  };
  return (
    <nav className="navbar fixed-top navbar-light bg-dark">
      <Link className="navbar-brand" to="/">
        {" "}
        <img
          src={window.location.origin + "/logo_deltom_white.png"}
          style={logoStyle}
          alt="Deltom S.A."
        />
      </Link>
    </nav>
  );
};

export default Navbar;
