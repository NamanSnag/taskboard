import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Navbar = ({ user, setUser }) => {
  
  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="navbar">
      <h2>
      {
        user ? (
          <Link to={"/home"} className="nav__head">
          Welcome {user.username}
        </Link>
        ) : (
          <Link to={"/"} className="nav__head">
          Task Board
        </Link>
        )
      }
      </h2>
      <ul className="nav__list">
        {user ? (
          <>
            <li className="nav__cart" onClick={handleLogout}>
              <Link to="/" className="link">
                LogOut
              </Link>
              <div className="hover"></div>
            </li>
          </>
        ) : (
          <>
            <li className="nav__products">
              <Link to="/register" className="link">
                SignUp
              </Link>
              <div className="hover"></div>
            </li>

            <li className="nav__cart">
              <Link to="/login" className="link">
                LogIn
              </Link>
              <div className="hover"></div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
