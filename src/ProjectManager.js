import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fire from './Fire';
 
class ProjectManager extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('projects');
        this.ref2 = fire.firestore().collection('projects').where("userID", "==", fire.auth().currentUser.uid);
        this.unsubscribe = null;
        this.state = {
            boards: [],
            addNewProject: false,
            newProject: {
              projectName:'',
              outputType:'Classification',
              inputType:'Tabular',
              userID:fire.auth().currentUser.uid
            },
        };
      this.handleAddNewProject = this.handleAddNewProject.bind (this);
      this.handleFormNewProject = this.handleFormNewProject.bind (this);
      this.handleSubmitNewProject = this.handleSubmitNewProject.bind (this);
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { projectName, userID, outputType, inputType } = doc.data();
          boards.push({
            key: doc.id,
            projectName, // DocumentSnapshot
            userID,
            outputType,
            inputType
          });
        });
        this.setState({
          boards
       });
      }
    
    componentDidMount() {
        this.unsubscribe = this.ref2.onSnapshot(this.onCollectionUpdate);
    }

    handleAddNewProject () {
      this.setState ({...this.state,
        addNewProject : !this.state.addNewProject
    }, () => console.log (this.state.addNewProject)); 
    }

    handleFormNewProject (e) {
      e.preventDefault();
      let value = e.target.value;
      let name = e.target.name;
      console.log(value);
      this.setState(prevState => ({newProject : {
        ...prevState.newProject, [name]: value
        }}), () => console.log(this.state.newProject)
      )};

    handleSubmitNewProject () {
      const { projectName, outputType, inputType, userID } = this.state.newProject;
      this.ref.add({
        projectName,
        outputType,
        inputType,
        userID
      }).then((docRef) => {
        this.setState({...this.state, 
          addNewProject : !this.state.addNewProject,
          newProject : {
              projectName:'',
              outputType:'Classification',
              inputType:'Tabular',
              userID:fire.auth().currentUser.uid}
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
    
    render() {
    return (
      <div className={"projectmanager-"+this.props.visible}>
      <div className="projectmanager-body">
      <i style={{'cursor':'pointer'}} id="order-formbox-close"class="fa fa-times" onClick={this.props.handleMouseDown}/>
            <h3>List of Projects</h3>
            <h5 style={{'cursor':'pointer'}} onClick={this.handleAddNewProject}><strong>+</strong> Make a new project</h5>
            <br/>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th style={{'minWidth':'20vw'}}>Project Name</th>
                  <th style={{'minWidth':'30vw'}}>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/project/${board.key}`} onClick={this.props.handleMouseDown}>{board.projectName}</Link></td>
                    <td>{board.inputType} {board.outputType}</td>
                    <td/>
                  </tr>
                )}
                {this.state.addNewProject == true &&
                  <tr>
                    <td>
                      <input
                        className="form-control"
                        name="projectName"
                        type="string"
                        placeholder="Project name here"
                        onChange={this.handleFormNewProject}
                      />
                    </td>
                    <td>{this.state.newProject.userID}</td>
                    <td>
                      <button onClick={this.handleSubmitNewProject}>Add project</button>
                      </td>            
                  </tr>}
              <tr>
              <td>
              <Link to="/">See all projects</Link>
              </td>
              </tr>
              </tbody>
            </table>
          </div>        
    </div>
    );
  }
}
 
export default ProjectManager;