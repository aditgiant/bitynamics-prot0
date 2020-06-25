import React, {Component} from 'react';
import DragAndDrop from './DragAndDrop';
import IconUpload from '../imgsrc/upload.png'  
import 'react-bootstrap';
import fire from '../Fire';

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
            csvDatasetLink:'',
            csvDatasetFile:[],
            csvDatasetName:'',
        };
        this.handleCsvDrop = this.handleCsvDrop.bind(this);
        this.handleCsvClick = this.handleCsvClick.bind(this)
        this.resetUploader = this.resetUploader.bind(this);
        this.uploadCsvToDatabase = this.uploadCsvToDatabase.bind(this);
    }

    handleCsvDrop = (files) => {
        this.uploadCsvToDatabase(files);
        let fileList = this.state.csvDatasetFile
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({...this.state,
            csvDatasetFile: fileList,
            csvDatasetName: fileList[0]
        }, () => console.log(this.state))
        console.log(fileList); //fileList -> previous state + uploaded files
        //4. write this.state.csvDatasetFile[0].name to this.state.csv.Dataset.name
        //5. write this.state.csv.Dataset.name to collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor')
    }

    handleCsvClick = (e) => {
        e.preventDefault();
        this.uploadCsvToDatabase(this.csvTemporary.current.files);
        let fileList = this.state.csvDatasetFile
        let files = this.csvTemporary.current.files //ref -> uploaded files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({...this.state,
            csvDatasetFile: fileList,
            csvDatasetName: fileList[0]
        }, () => console.log(this.state))
        console.log(fileList); //fileList -> previous state + uploaded files
        //4. write this.state.csv.Dataset.name to collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor')
    }

    uploadCsvToDatabase = (files) => {
        //1. upload file to cloud storage
        //2. set this.state.csvDatasetLink to cloud storage link of the file
        //3. write this.state.csvDatasetLink to collection('projects').doc(this.state.id).collection('csvDataset').doc('preprocessor')
    }

    resetUploader = (e) => {
        e.preventDefault();
        this.setState({csvDatasetFile: []})
    }

    render(){
        return(
            <div className="data-selector">
            <h3 style={{"font-size":"1em"}}><strong>Select dataset</strong></h3>
            <h4 style={{"font-size":"1em"}}>Upload a new file</h4>
                
            {this.state.csvDatasetFile[0] == undefined && 
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

            {this.state.csvDatasetFile[0] !== undefined &&
                        <div className="data-uploader">
                            {this.state.csvDatasetFile.map((file, i) =>
                                <div key={i}>{file}</div>
                            )}
                            <button onClick={this.resetUploader}>Change file</button>
                        </div>}
                
            <aside>
              <h4 style={{"font-size":"1em"}}>or select from recent files</h4>
            </aside>
          </div>
        )
    }
}

export default DataSelector;