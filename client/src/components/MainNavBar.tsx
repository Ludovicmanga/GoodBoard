import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNavBar() {
  return (
    <nav className="mainNavbar">
        <div className="mainNavbar--container">
            <div className="logo">
                <NavLink to="/">
                    <div className="logo_container">
                        <img src="./images/site_logo.png" alt="icon" />
                    </div>
                </NavLink>
            </div>
            <ul className="mainNavbar--linksContainer">
                <li className='/signup'>
                    <NavLink to="/signUp">
                        <h5>Fonctionnalités</h5>
                    </NavLink>
                </li>
                <li className='/signup'>
                    <NavLink to="/signUp">
                        <h5>Tarif</h5>
                    </NavLink>
                </li>
                <li className='/login'>
                    <NavLink to="/signIn">
                        <h5>Se connecter</h5>
                    </NavLink>
                </li>
                <li className='/signup'>
                    <NavLink to="/signUp">
                        <h5>S'inscrire</h5>
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
  )
}