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
                        <h3>GoodBoard</h3>
                    </div>
                </NavLink>
            </div>
            <ul className="mainNavbar--linksContainer">
                <li className='/login'>
                    <NavLink to="/login">
                        <h5>login</h5>
                    </NavLink>
                </li>
                <li className='/signup'>
                    <NavLink to="/signUp">
                        <h5>Sign up</h5>
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
  )
}