import React, {Component} from 'react';
import Bitynamics from './imgsrc/Bitynamics.png';
import Project from './imgsrc/Project.png';
import {Link} from 'react-router-dom';
import './App.css';
import ProjectManager from './ProjectManager';
import fire, {storage} from './Fire';

class Nav extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: this.props.id,
      projectName: '',
      visible: false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    console.log(this.props.id);
    const ref = fire.firestore().collection('projects').doc(this.props.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          projectName: board.projectName,
        });
      } else {
        console.log('No such document!');
      }
    });
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps) {
    // if (this.props.id !== prevProps.id) {
    const ref = fire.firestore().collection('projects').doc(this.props.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          projectName: board.projectName,
        });
      } else {
        console.log('No such document!');
      }
    });
    // }
    // console.log("componentDidUpdate : "+this.state.projectName)
  }

  handleMouseDown(e) {
    this.toggleMenu();
    console.log(this.props);
    console.log('clicked');
    console.log(this.state.visible);
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    return (
      <div id="top-bar" tabs>
        <div
          id="project-switch"
          style={{cursor: 'pointer'}}
          onClick={this.handleMouseDown}
          visible={this.state.visible}>
          <img id="project-icon-top" src={Project} />
          <div id="project-title-top">
            <strong>{this.state.projectName}</strong>{' '}
          </div>
          <i class="fas fa-caret-down"></i>
        </div>
        <img id="logo" src={Bitynamics} />
        <ProjectManager
          handleMouseDown={this.handleMouseDown}
          visible={this.state.visible}
        />
      </div>
    );
  }
}
export default Nav;
