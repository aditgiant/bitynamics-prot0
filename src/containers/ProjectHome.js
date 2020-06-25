import React, { Component, useEffect } from 'react';
import '../App.css';
import Nav from '../Nav'
import SideBar from '../sideBar/sideBar';
import Button from '../components/Button';
import Input from '../components/Input';  
import Select from '../components/Select';
import IconTabular from '../imgsrc/outputTabular.png';
import IconTimeSeries from '../imgsrc/outputTimeSeries.png';
import IconImage from '../imgsrc/outputImage.png';
import {Container, Row, Col} from 'react-bootstrap';
import fire, {storage} from '../Fire';

class ProjectHome extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          newProject: {
            key:'projectnotfound',
            projectName:'',
            outputType:'',
            inputType:''
          },
    
          outputTypes: ['Classification', 'Regression'],
          inputTypes: ['Tabular', 'TimeSeries', 'Image'],    
        }
        this.handleProjectName = this.handleProjectName.bind(this);
        this.handleOutputType = this.handleOutputType.bind(this);
        this.handleInputType = this.handleInputType.bind(this);
        // this.handleNextStep = this.handleNextStep.bind(this);
      }

      // Find from Firebase
      componentDidMount() {
          console.log(this.props);
          const ref = fire.firestore().collection('projects').doc(this.props.match.params.id);
          ref.get().then((doc) => {
            if (doc.exists) {
              console.log("componentDidMount-success");
              const board = doc.data();
              this.setState({ ...this.state,
                newProject : {
                key: doc.id,
                projectName:board.projectName,
                outputType:board.outputType,
                inputType:board.inputType
              }});
            } else {
              console.log("No such document!");
            }
          });
      console.log("componentDidMount");
      console.log(this.state.newProject.projectName)
      }    

      componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
          console.log(this.props.match.params.id);
          const ref = fire.firestore().collection('projects').doc(this.props.match.params.id);
          ref.get().then((doc) => {
            if (doc.exists) {
              const board = doc.data();
              this.setState({ ...this.state, newProject : {
                key: doc.id,
                projectName:board.projectName,
                outputType:board.outputType,
                inputType:board.inputType
              }});
            } else {
              console.log("No such document!");
            }
          });
        }
      console.log("componentDidUpdate");
      console.log(this.state.newProject.projectName);
      }    
      /* This life cycle hook gets executed when the component mounts */
    
      handleNextStep(e) {
        e.preventDefault();
        let projectData = this.state.newProject;
        window.alert(JSON.stringify(projectData, 0, 2))
        // fetch('/addtraining',{
        //     method: "POST",
        //     body: JSON.stringify(trainingData),
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //   }).then(response => {
        //     response.json().then(data =>{
        //       console.log("Successful" + data);
        //     })
        // })
      }   
      
      handleProjectName(e) {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => ({ newProject : 
         {...prevState.newProject, [name]: value
         }
         }), () => console.log(this.state.newProject))
    }
      handleOutputType (e) {
        let value = e.target.value;
        this.setState( prevState => ({ newProject : 
       {...prevState.newProject, outputType: value, inputType: 'Tabular'
       }
       }), () => console.log(this.state.newProject))
    }
      handleInputType (e) {
        let value = e.target.value;
        this.setState( prevState => ({ newProject : 
      {...prevState.newProject, inputType: value
      }
      }), () => console.log(this.state.newProject))
    }
      
      render() {
        return (
          <div>
          <form className="container" onSubmit={this.handleProjectName}>
            <Container id="home-container">
              <div id="project-name" className="form-group row">
                <label for={'projectName'} className="form-label col-sm-3">Project Name</label>
                <div className="col-sm-6">
                  <input
                    className="form-control"
                    id={'projectName'}
                    name={'projectName'}
                    type="string"
                    value={this.state.newProject.projectName} 
                    onChange={this.handleProjectName}
                    placeholder="Project name here"
                    />
                </div>
              </div>

              <div id="project-type" className="form-group row">
            <div id="output-input-type-title" className="form-label col-sm-3">
                <p><strong>Type</strong></p>
            </div>
            <div id="output-type-option" className="col-sm-8">
                <div id="output-type">
                  <input 
                      id="Classification" class="input-hidden" type="radio" onChange={this.handleOutputType} checked={this.state.newProject.outputType === "Classification"} value="Classification"
                      />
                  <label for="Classification">
                    <p>Classification</p>
                  </label>
                  <input 
                      id="Regression" class="input-hidden" type="radio" onChange={this.handleOutputType} checked={this.state.newProject.outputType === "Regression"} value="Regression"
                      />
                  <label for="Regression">
                    <p>Regression</p>
                  </label>
                </div>
                <div className="input-type">
                {this.state.newProject.outputType === 'Classification' && (
                <div id="input-type-classification">
                    <input 
                      id="TabClass" class="input-hidden" type="radio" onChange={this.handleInputType} checked={this.state.newProject.inputType === "Tabular"} value="Tabular"
                      />
                    <label for="TabClass">
                      <img 
                        src={IconTabular}/>
                    </label>
                    <input 
                      id="TimeClass" class="input-hidden" type="radio" onChange={this.handleInputType} checked={this.state.newProject.inputType === "TimeSeries"} value="TimeSeries"
                      />
                    <label for="TimeClass">
                      <img 
                        src={IconTimeSeries}/>
                    </label>
                    <input 
                      id="ImgClass" class="input-hidden" type="radio" onChange={this.handleInputType} checked={this.state.newProject.inputType === "Image"} value="Image"
                      />
                    <label for="ImgClass">
                      <img 
                        src={IconImage}/>
                    </label>
                </div>
                )}
                {this.state.newProject.outputType === 'Regression' && (
                <div id="input-type-regression">
                    <input 
                      id="TabReg" class="input-hidden" type="radio" onChange={this.handleInputType} checked={this.state.newProject.inputType === "Tabular"} value="Tabular"
                      />
                    <label for="TabReg">
                      <img 
                        src={IconTabular}/>
                    </label>
                    <input 
                      id="TimeReg" class="input-hidden" type="radio" onChange={this.handleInputType} checked={this.state.newProject.inputType === "TimeSeries"} value="TimeSeries"
                      />
                    <label for="TimeReg">
                      <img 
                        src={IconTimeSeries}/>
                    </label>
                </div>
                )}
                </div>

            <div id="project-type-descriptions" className="project-type-descriptions">
              {(this.state.newProject.outputType === 'Classification' && this.state.newProject.inputType === 'Tabular') && (
              <p id="TabClas-description" className="decription-item"><strong>Table classification</strong> is a technique to categorize basic two-dimensional data into a given number of classes.</p>)}
              {(this.state.newProject.outputType === 'Classification' && this.state.newProject.inputType === 'TimeSeries') && (
              <p id="TimeClas-description" className="decription-item"><strong>Time-series classification</strong> recognizes pattern and categorizes data with time order.</p>)}
              {(this.state.newProject.outputType === 'Classification' && this.state.newProject.inputType === 'Image') && (
              <p id="ImgClas-description" className="decription-item"><strong>Image classification</strong> model is trained to recognize images. When you give it an image, it responds with a label for that image.</p>)}
              {(this.state.newProject.outputType === 'Regression' && this.state.newProject.inputType === 'Tabular') && (
              <p id="TabReg-description" className="decription-item"><strong>Table regression</strong> recognizes the samples in basic two-dimensional table as continuous value instead of discrete categorization.</p>)}
              {(this.state.newProject.outputType === 'Regression' && this.state.newProject.inputType === 'TimeSeries') && (
              <p id="ImgReg-description" className="decription-item"><strong>Time-series regression</strong> maps the samples in data with time order into continuous values instead of discrete categorization.</p>)}
            </div>
            </div>
            </div>

            <Button 
                action = {this.handleProjectName}
                type = {'primary'} 
                title = {'Save changes'} 
                style = {buttonStyle}
                /> { /*Submit */ } 
            </Container>
          </form>
          <SideBar id={this.state.newProject.key}/>
          <Nav id={this.state.newProject.key}/>
          </div>
        );
      }
    }

const buttonStyle = {
    margin : '10px 10px 10px 0px',
    position : 'absolute',
    bottom : '20px',
    right :'10px'
  }  

  export default ProjectHome;