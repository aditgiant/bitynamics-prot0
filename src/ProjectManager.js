import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fire from './Fire';
 
class ProjectManager extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('projects');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
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
    
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
    return (
      <div className={"projectmanager-"+this.props.visible}>
      <div className="projectmanager-body">
      <i id="order-formbox-close"class="fa fa-times" onClick={this.props.handleMouseDown}/>
            <h3>List of Projects</h3>
            <br/>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/project/${board.key}`} onClick={this.props.handleMouseDown}>{board.projectName}</Link></td>
                    <td>{board.userID}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>        
    </div>
    );
  }
}
 
export default ProjectManager;