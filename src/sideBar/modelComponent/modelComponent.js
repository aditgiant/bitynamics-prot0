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
            <Link
              className="router-link"
              style={{color: 'white'}}
              onClick={this.logout}
              to="/">
              <li>
                <div className="fas fa-user fa-2x"></div>
                <div>Logout</div>
              </li>
            </Link>
            {this.props.location.pathname === '/project/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/project/${this.props.id}`}>
                <li id="side-menu-active">
                  <div className="fas fa-home fa-2x"></div>
                  <div>Home</div>
                </li>
              </Link>
            )}
            {this.props.location.pathname !== '/project/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/project/${this.props.id}`}>
                <li>
                  <div className="fas fa-home fa-2x"></div>
                  <div>Home</div>
                </li>
              </Link>
            )}
            {this.props.location.pathname === '/dataset/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/dataset/${this.props.id}`}>
                <li id="side-menu-active">
                  <div className="fas fa-database fa-2x"></div>
                  <div>Dataset</div>
                </li>
              </Link>
            )}
            {this.props.location.pathname !== '/dataset/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/dataset/${this.props.id}`}>
                <li>
                  <div className="fas fa-database fa-2x"></div>
                  <div>Dataset</div>
                </li>
              </Link>
            )}
            {this.props.location.pathname ===
              '/sessiontraining/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/sessiontraining/${this.props.id}`}>
                <li id="side-menu-active">
                  <div className="fas fa-list fa-2x"></div>
                  <div>Parameter </div>
                </li>
              </Link>
            )}
            {this.props.location.pathname !==
              '/sessiontraining/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/sessiontraining/${this.props.id}`}>
                <li>
                  <div className="fas fa-list fa-2x"></div>
                  <div>Parameter </div>
                </li>
              </Link>
            )}

            {this.props.location.pathname ===
              '/sessionmodel/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/sessionmodel/${this.props.id}`}>
                <li id="side-menu-active">
                  <i class="fa fa-th-large fa-2x" aria-hidden="true"></i>
                  <div>Models </div>
                </li>
              </Link>
            )}
            {this.props.location.pathname !==
              '/sessionmodel/' + this.props.id && (
              <Link
                className="router-link"
                style={{color: 'white'}}
                to={`/sessionmodel/${this.props.id}`}>
                <li>
                  <i class="fa fa-th-large fa-2x" aria-hidden="true"></i>

                  <div>Models </div>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(modelComponent);
