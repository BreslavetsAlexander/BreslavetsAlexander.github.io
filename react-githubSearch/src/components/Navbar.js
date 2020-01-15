import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-primary mb-4 navbar-expand-lg">
            <div className="navbar-brand">Github Search</div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        exact
                        activeClassName="active"
                        className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        exact
                        activeClassName="active"
                        className="nav-link">
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
