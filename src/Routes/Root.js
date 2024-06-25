import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({ color: isActive ? 'red' : '' });

const Root = () => {
    return (
        <div className="container">
            <nav>
                <ul>
                    <li><NavLink style={linkStyle} to="/">Home</NavLink></li>
                    <li><NavLink style={linkStyle} to="/boulders">Boulders</NavLink></li>
                    <li><NavLink style={linkStyle} to="/map">Map</NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default Root;
