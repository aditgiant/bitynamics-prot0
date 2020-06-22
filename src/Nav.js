import React, { Component } from 'react';
import Bitynamics from './imgsrc/Bitynamics.png';
import Project from './imgsrc/Project.png';
import {Link} from 'react-router-dom';
import './App.css';

function Nav() {
    return(
        <div id="top-bar" tabs>
            <div id="project-switch">
            <Link to="/">
                <img id="project-icon-top" src={Project}/>
                <div id="project-title-top"><strong>Project 1</strong> </div>
                <i class="fas fa-caret-down"></i>
            </Link>
            </div>
            <img id="logo" src={Bitynamics}/>
        </div>
    );

}

export default Nav;