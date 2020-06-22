import React, {Component} from 'react';
import ModelComponent from './modelComponent/modelComponent.js';
import '../App.css'
class sideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="row">
          <ModelComponent />
        </div>
      </div>
    );
  }
}

export default sideBar;
