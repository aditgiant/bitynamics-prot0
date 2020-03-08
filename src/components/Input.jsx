import React from 'react';


const Input = (props) => {
	//console.log(props.value);
	return (  
  <div className="form-group row">
    <label for={props.name} className="form-label col-sm-6">{props.title}</label>
    <div className="col-sm-6">
    <input
      className="form-control"
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
      {...props} />
  </div>
  </div>
)
}

export default Input;