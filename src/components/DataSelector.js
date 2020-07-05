import React, {Component} from 'react';
import DragAndDrop from './DragAndDrop';
import IconUpload from '../imgsrc/upload.png'  
import 'react-bootstrap';
import fire, {storage}  from '../Fire';

class DataSelector extends Component {

// 1. build a connection to firebase in componentDidMount
// 2. function to handle Drag and Drop file ->
// a. if collections.doc(id).dataset.preprocessor doesn't exist, create new one
// b. if exist, put link in csvDatasetLink parameter
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('projects');
        this.unsubscribe = null;
        this.csvTemporary = React.createRef();
        this.state = {
            id:this.props.id,
            csvDatasetFile:[],
            uploadFinish:false,
            preprocessor : {
                csvDatasetLink:'',
                csvDatasetLinkPrep:'',
                csvDatasetName:'',
                featureSelection:false,
                featuresPerTime:0,
                header:false,
                imageDimensionH:0,
                imageDimensionW:0,
                missingEncoded:"",
                multipleOutputs:1,
                normalization:false,
                removeMissingData:true
            }
        };
        this.handleCsvDrop = this.handleCsvDrop.bind(this);
        this.handleCsvClick = this.handleCsvClick.bind(this);
        this.resetUploader= this.resetUploader.bind(this);
        this.submitToDatabase = this.submitToDatabase.bind(this);
        this.uploadCsvToDatabase = this.uploadCsvToDatabase.bind(this);
    }

    // componentDidUpdate() {
    //     console.log('Read UploadFinish with this project ID: '+this.state.id);
    //     //Check if the project has already been assigned with a dataset
    //     const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
    //     ref.get().then((doc) => {
    //       if (doc.exists) {
    //         const board = doc.data();
    //         if (board.csvDatasetLink !== '') {
    //             this.setState(prevState => ({
    //                 ...prevState,
    //                     uploadFinish: true
    //                 }), () => console.log("upload is done : "+this.state.uploadFinish))
    //         } else { console.log ("CSV Link is still empty.")}
    //         } else {
    //         console.log("No such document!");
    //       }
    //     });
    //   }

    handleCsvDrop = (files) => {
        let fileList = this.state.csvDatasetFile
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState(prevState => ({
            csvDatasetFile: files[0],
            preprocessor :
                {...prevState.preprocessor,
                csvDatasetName: fileList[0]
                }
        }), () => console.log(this.state))
        console.log(this.state.csvDatasetFile); //fileList -> previous state + uploaded files
        // this.uploadCsvToDatabase(files[0]);
    }

    handleCsvClick = (e) => {
        e.preventDefault();
        let fileList = this.state.csvDatasetFile
        let files = this.csvTemporary.current.files //ref -> uploaded files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState(prevState => ({
            csvDatasetFile: files[0],
            preprocessor :
                {...prevState.preprocessor,
                csvDatasetName: fileList[0]
                }
        }), () => console.log(this.state))
        console.log(this.state.csvDatasetFile); //fileList -> previous state + uploaded files
        // this.uploadCsvToDatabase(this.csvTemporary.current.files[0]);
    }

    //Upload file to cloud storage
    uploadCsvToDatabase () {
        const uploadTask = storage.ref(`csvFiles/${this.state.preprocessor.name}`).put(this.state.csvDatasetFile);
        uploadTask.on('state_changed',
        () => {
            // Get file URL, set to this.state, call SubmitToDatabase
            storage.ref(`csvFiles/${this.state.preprocessor.name}`).getDownloadURL()
                .then(
                    url => {
                        this.setState(prevState => ({
                            uploadFinish: true,
                            preprocessor :
                                {...prevState.preprocessor,
                                csvDatasetLink: url
                                }
                        }),
                        // 
                        () => {
                        this.props.isUploadFinish();
                        console.log (this.state)
                        this.submitToDatabase()}
                        )
                    }   
            )},
        (error) => {
            // error function ....
            console.log(error);
        }, 
        )
    }

    //Delete preprocessor content
    resetUploader () {
        // const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
        this.setState(prevState => ({
            //also empty input form
            csvDatasetFile: [],
            uploadFinish:false,
            preprocessor :
                {...prevState.preprocessor,
                    csvDatasetLink:'',
                    csvDatasetLinkPrep:'',
                    csvDatasetName:'',
                    featureSelection:false,
                    featuresPerTime:0,
                    header:false,
                    imageDimensionH:0,
                    imageDimensionW:0,
                    missingEncoded:"",
                    multipleOutputs:1,
                    normalization:false,
                    removeMissingData:true
                }
        }),
        // () =>
        // {
        console.log(this.state)
        // ref.delete().then(() => {
        //         console.log("Dataset successfully deleted!");
        //       }).catch((error) => {
        //         console.error("Error deleting dataset: ", error);
        //       });
        // }
        )
    }

    //Submit to firebase
    //Called automatically after uploadCsvToDatabase and resetUploader
    submitToDatabase () {
        const { csvDatasetLink, csvDatasetLinkPrep, csvDatasetName, featureSelection, featuresPerTime, header, imageDimensionH, imageDimensionW, missingEncoded, multipleOutputs, normalization, removeMissingData } = this.state.preprocessor;
        const ref = fire.firestore().collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor');
        ref.set({
            csvDatasetLink, csvDatasetLinkPrep, csvDatasetName, featureSelection, featuresPerTime, header, imageDimensionH, imageDimensionW, missingEncoded, multipleOutputs, normalization, removeMissingData
        }).catch((error) => {
            console.error("Error adding document: ", error);
          });
    }

    render(){
        // console.log(this.state)
        return(
            <div className="data-selector">
            <h3 style={{"font-size":"1em"}}><strong>Select dataset</strong></h3>
            <h4 style={{"font-size":"1em"}}>Upload a new file</h4>        
            {this.state.preprocessor.csvDatasetName[0] == undefined && 
                        <DragAndDrop handleDrop={this.handleCsvDrop}>
                        <div className="data-uploader">
                            <img src={IconUpload}/>
                            <p></p>
                            <p>Drag and drop a .csv file here or click to browse instead.</p>
                            <form>
                                <input type="file" ref={this.csvTemporary} onChange={this.handleCsvClick} />
                            </form>
                        </div>
                        </DragAndDrop>}

            {this.state.preprocessor.csvDatasetName[0] !== undefined &&
                        <div className="data-uploader">
                            {/* {this.state.csvDatasetFile.map((file, i) =>
                                <div key={i}>{file}</div>
                            )} */}
    
                            
                            <div>{this.state.preprocessor.csvDatasetName}</div>
                            <button onClick={this.resetUploader}>Change file</button>
                            {this.state.uploadFinish === false && <button onClick={this.uploadCsvToDatabase}>Upload file</button>}
                            {/* {this.state.uploadFinish === false && <h4 style={{"font-size":"0.75em"}}>Uploading...</h4>} */}
                            {this.state.uploadFinish === true && <h4 style={{"font-size":"0.75em"}}>Uploaded!</h4>}
                        </div>}
                
            <aside>
              {/* <h4 style={{"font-size":"1em"}}>or select from recent files</h4> */}
            </aside>
          </div>
        )
    }
}

export default DataSelector;