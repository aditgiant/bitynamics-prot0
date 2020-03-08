import React from 'react';


const Select = (props) => {
	return(<div className="form-group row">
			<label for={props.name} className="form-label col-sm-6"> {props.title} </label>
		    <div className="col-sm-6">
			<select
		      id = {props.name}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
		      className="form-control">
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option}
		            value={option}
		            label={option}>{option}</option>
		        );
		      })}
		    </select>
			</div>
  </div>)
}

export default Select;