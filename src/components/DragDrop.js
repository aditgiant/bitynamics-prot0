import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import IconUpload from '../imgsrc/upload.png'  
import Button from '../components/Button';
import {Container, Row, Col} from 'react-bootstrap';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DragDrop(props) {
    const {acceptedFiles,
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject} = useDropzone({
        // accept: 'file/csv'
    });
    
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);

    const files = acceptedFiles.map(file => (
      <p key={file.path}>
        {file.path} - {file.size} bytes
      </p>
    ));

      return (
        <section className="DragDrop">
          <h3 style={{"font-size":"1em"}}><strong>Select dataset</strong></h3>
          <h4 style={{"font-size":"1em"}}>Upload a new file</h4>
          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>{files}</p>
            {files == ''  && (
              <>
                <img src={IconUpload}/>
                <p></p>
                <p>Drag and drop a .csv file here or click to browse instead.</p></>)}
          </div>
          <aside>
            <h4 style={{"font-size":"1em"}}>or select from recent files</h4>
          </aside>
        </section>
      );
  }
  
  export default DragDrop;