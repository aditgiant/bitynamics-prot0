import React, {Component} from 'react';
import ModelComponent from './modelComponent/modelComponent.js';
import '../App.css'
class sideBar extends Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      id:'',
    };
  }

  componentDidMount() {
    console.log("componentDidMount: SideBar")
    this.setState({ ...this.state,
      id : this.props.id});
    console.log(this.state.id);

  }    

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate: SideBar")
    if (this.props.id !== prevProps.id) {
      console.log("componentDidUpdate ChangeProps: Sidebar")
      this.setState({ ...this.state,
        id : this.props.id});
      console.log(this.state.id);
    }
  }


  render() {
    return (
      <div className="sidebar">
        <div className="row">
          <ModelComponent id={this.state.id}/>
        </div>
      </div>
    );
  }
}

export default sideBar;
