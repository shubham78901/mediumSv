import React, {useState} from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
const Navbar = () => {
const {isUserAuthenticated, setIsUserAuthenticated} = React.useContext(AuthContext);
  const NavItem = ({ label, href, onClick }) => (
    <Link to={href} className="nav-item" onClick={onClick}>
      {label}
    </Link>
  );

  const handleLogout = () => {
    setIsUserAuthenticated(false);
    sessionStorage.removeItem('accessToken');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">MediumSV</Link>
        <nav className="nav">
          <NavItem label="About" href="/about" />
          <NavItem label="Contact" href="/contact" />
          <NavItem label="Create" href="/create" />
          
          {isUserAuthenticated ? (
            <NavItem label="Logout" href="/" onClick={handleLogout} />
          ) : (
            <>
              <NavItem label="Log in" href="/account" />
              <NavItem label="Log out" href="/account" onClick={handleLogout} />
            </>
          )}
        </nav>
      </div>
      <style>
        {`
          .header {
            background-color: #20294c;
            color: #f5f5f5;
            padding: 16px 0;
          }

          .container {
            max-width: 1120px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 24px;
            font-weight: bold;
            color: inherit;
            text-decoration: none;
          }

          .nav {
            display: flex;
            gap: 24px;
          }

          .nav-item {
            color: inherit;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .nav-item:hover {
            color: #c0c0c0;
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;