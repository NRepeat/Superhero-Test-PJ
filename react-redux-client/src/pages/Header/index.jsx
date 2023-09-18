import React from "react";

import { Link } from "react-router-dom";

import "./Header.scss";

function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="header-link">
        Go back to Home Page
      </Link>
      <Link to="/superhero" className="header-link">Go to Superhero Page</Link>
    </div>
  );
}

export default Header;
