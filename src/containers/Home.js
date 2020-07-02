import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fire from '../Fire';
import Project from '../imgsrc/Project.png';
import AddNew from '../imgsrc/icon_AddNew.png';
import { Redirect } from "react-router-dom";
import '../App.css';

// add later verification if user has made a project before

// if yes,
// 1. directly fill projectID with latest projectID
// 2. directly fill redirect with redirect

// if no,
// 1. create a new project with new projectID
// 2. fill projectID with new projectID
// 3. fill fill redirect with redirect

// temporary random pick one projectID

class Home extends Component {
    constructor(props) {
        super(props);
        this.ref2 = fire.firestore().collection('projects').where("userID", "==", fire.auth().currentUser.uid);
        this.state = {
            email:fire.auth().currentUser.email,
            projectID: '',
            boards: []
        }
        this.logout = this.logout.bind(this);
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { projectName, userID } = doc.data();
          boards.push({
            key: doc.id,
            projectName, // DocumentSnapshot
            userID
          });
        });
        this.setState({
          boards
       });
      }

    componentDidMount () {
        this.unsubscribe = this.ref2.onSnapshot(this.onCollectionUpdate);
    }

    logout() {
        fire.auth().signOut();
      }
    
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
                projectName:'New',
                outputType:'Classification',
                inputType:'Tabular',
                userID:fire.auth().currentUser.uid}
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }

    // const [projectID, setProjectID]= useState('QEBkUkkHYC0EE5sxqUxC')
    // const [redirect, setRedirect]= useState(true)
    render() {
        return (
            // <Redirect to={`/project/${this.state.projectID}`} />
            <div className="home-body">
                <div>
                <h2 style={{'display':'inline-block'}}>Welcome back, {this.state.email}</h2>
                <Link className="router-link" onClick={this.logout} to="/"><p style={{'display':'inline-block', 'color':'#015892', 'cursor':'pointer'}}>&nbsp;&nbsp;Logout</p></Link>
                <h3>Open a project</h3>
                <div style={{'display':'flex'}}>
                <br/>
                      {this.state.boards.map(board =>
                        <Link to={`/project/${board.key}`}>
                            <div className="home-body-selector">
                                <img src={Project}/>
                                <p>{board.projectName}</p>
                            <td/>
                            </div>
                            <br/>
                        </Link>
                      )}
                {/* <div className="home-body-selector">
                                <img src={AddNew}/>
                                <p>Add new...</p>
                            <td/>
                            </div> */}
                <br/>
                </div> 
                </div>  
            </div> 
    )}
}

export default Home;