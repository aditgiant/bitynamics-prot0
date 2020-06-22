import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './modelComponent.css';

class modelComponent extends Component {
  render() {
    return (
      <div className="model-component">
        <div className="side-menu">
          <ul>
            <Link className="router-link" style={{color:'white'}} to='/'>
              <li><div className="fas fa-home fa-2x"></div>
              <div>
                Home
              </div></li>
            </Link>

            <Link className="router-link" style={{color:'white'}} to='/uploaddataset'>
              <li><div className="fas fa-database fa-2x"></div>
              <div>
               Dataset
              </div></li>
            </Link>

            <Link className="router-link" style={{color:'white'}} to='/sessiontraining'>
            <li><div className="fas fa-list fa-2x"></div>
              <div>
                Session 1
              </div></li>
            </Link>

            <li>
              <div className="fas fa-plus-circle fa-2x"></div>
              <div>
                <a href="#">New Session</a>{' '}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default modelComponent;
