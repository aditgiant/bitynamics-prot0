import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../../Fire';
import './modelComponent.css';

class modelComponent extends Component {
  logout() {
    fire.auth().signOut();
  }
  render() {
    console.log(this.props.id);
    return (
      <div className="model-component">
        <div className="side-menu">
          <ul>
            <Link className="router-link" style={{color:'white'}} onClick={this.logout}>
              <li><div className="fas fa-user fa-2x"></div>
              <div>
                Logout
              </div></li>
            </Link>
            <Link className="router-link" style={{color:'white'}} to={`/project/${this.props.id}`} >
              <li><div className="fas fa-home fa-2x"></div>
              <div>
                Home
              </div></li>
            </Link>

            <Link className="router-link" style={{color:'white'}} to={`/dataset/${this.props.id}`}>
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
