import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar fixed-bottom" id="app-menu">
            <div className="container">
                <div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to="/hilfsanzeigen" className="nav-link">Ich möchte Menschen helfen</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/anzeige-erstellen" className="nav-link">Ich brauche Hilfe</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/angebotene-hilfe" className="nav-link">Ich kann helfen</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/konto" className="nav-link">Mein Konto</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;