import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Header.css"; // Импортируйте файл со стилями

function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="header-link">
        Go back to Home Page
      </Link>
      <Link to="/superhero">Go to Superhero Page</Link>
    </div>
  );
}

export default Header;
