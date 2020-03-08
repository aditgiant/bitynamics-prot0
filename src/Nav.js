import React, { Component } from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom';
import './App.css';

function Nav() {
    return(
        <nav tabs>
            <Link style={{color:'white'}} to="/">
                <h4>Bitynamics ML</h4>
            </Link>
            <ul className="nav-links">
                <Link style={{color:'white'}} to='/uploaddataset'>
                    <li>Upload dataset</li>
                </Link>
                <Link style={{color:'white'}} to='/networksettings'>
                    <li>Network settings</li>
                </Link>
                <Link style={{color:'white'}} to='/sessionsettings'>
                    <li>Session settings</li>
                </Link>
            </ul>
        </nav>
    );

}

export default Nav;