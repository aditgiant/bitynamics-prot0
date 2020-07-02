import React, {Component} from 'react';
import {Link, useLocation} from 'react-router-dom';
import fire from '../../Fire';
import './modelComponent.css';
import {withRouter} from 'react-router-dom';

class modelComponent extends Component {
  // constructor(props, context) {
  //   super(props);
  //   this.ref = useLocation();
  // }
  logout() {
    fire.auth().signOut();
  }

  render() {
    console.log(this.props.location.pathname);
    return (
      <div className="model-component">
        <div className="side-menu">
          <ul>
            <Link className="router-link" style={{color:'white'}} onClick={this.logout} to="/">
              <li><div className="fas fa-user fa-2x"></div>
              <div>
                Logout
              </div></li>
            </Link>
            {this.props.location.pathname === "/project/"+this.props.id && <Link className="router-link" style={{color:'white'}} to={`/project/${this.props.id}`} >
              <li id="side-menu-active"><div className="fas fa-home fa-2x"></div>
              <div>
                Home
              </div></li>
            </Link>}
            {this.props.location.pathname !== "/project/"+this.props.id && <Link className="router-link" style={{color:'white'}} to={`/project/${this.props.id}`} >
              <li><div className="fas fa-home fa-2x"></div>
              <div>
                Home
              </div></li>
            </Link>}
            {this.props.location.pathname === "/dataset/"+this.props.id && <Link className="router-link" style={{color:'white'}} to={`/dataset/${this.props.id}`}>
              <li id="side-menu-active"><div className="fas fa-database fa-2x"></div>
              <div>
               Dataset
              </div></li>
            </Link>}
            {this.props.location.pathname !== "/dataset/"+this.props.id && <Link className="router-link" style={{color:'white'}} to={`/dataset/${this.props.id}`}>
              <li><div className="fas fa-database fa-2x"></div>
              <div>
               Dataset
              </div></li>
            </Link>}
            {this.props.location.pathname === "/sessiontraining/" && <Link className="router-link" style={{color:'white'}} to='/sessiontraining'>
            <li id="side-menu-active"><div className="fas fa-list fa-2x"></div>
              <div>
                Session 1
              </div></li>
            </Link>}
            {this.props.location.pathname !== "/sessiontraining/" && <Link className="router-link" style={{color:'white'}} to='/sessiontraining'>
            <li><div className="fas fa-list fa-2x"></div>
              <div>
                Session 1
              </div></li>
            </Link>}

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

export default withRouter(modelComponent);
