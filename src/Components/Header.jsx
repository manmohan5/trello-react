import React from 'react';
import logo from '../trello.png';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="trello-header">
      <Link to="/">
        <button className="btn btn-secondary mr-3 btn-sm">home</button>
      </Link>
      <Link to="/boards">
        <button className="btn btn-secondary btn-sm ">boards</button>
      </Link>

      <img id="logo" src={logo} alt="logo" />
    </div>
  );
};
export default Header;
