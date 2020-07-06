import React from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css"
const NavBar = () => {
  return (
    <>
      <ul className="navbar">
        <li><Link to="/">홈</Link></li>
        <li><Link to="/redis">레디스</Link></li>
      </ul>
    </>
  );
};

export default NavBar;