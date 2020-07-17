import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import * as ROUTES from '../ROUTES';
import {connect} from 'react-redux';

const RetrainPopUp = (props) => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const handleRedirect = () => {
    console.log(selectedOption);
    if (selectedOption === 'option1') {
      console.log('go to home');
      //change to parameter settings page
      return props.fireRedirect && <Redirect to={ROUTES.EVALUATE} />;
    } else {
      return props.fireRedirect && <Redirect to={ROUTES.HOME} />;
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <div className="popup">
        <div className="popup_inner">
          <h2>Retrain</h2>
          <form onSubmit={props.handleRetrain}>
            <input
              type="radio"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
              id="tuning"
              name="retrain"
              value="option1"
              className="mr-2"></input>
            <label for="tuning">Modify the current setting</label>
            <br />
            <input
              type="radio"
              id="restart"
              name="retrain"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
              className="mr-2"></input>
            <label for="restart">Build from the start</label>

            <div className="mt-2">
              <button className="btn btn-white" onClick={props.closePopup}>
                Cancel
              </button>
              <button type="submit" className="btn btn-yellow">
                Retrain
              </button>
            </div>
          </form>

          {handleRedirect()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    models: state.models,
  };
};

export default connect(mapStateToProps)(RetrainPopUp);
