import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {currentmodel} from '../redux/actions/models';
import {selectedModels, unselectModel} from '../redux/actions/models';
const Model = (props) => {
  const {
    train_model,
    currentmodel,
    models,
    selectedModels,
    listSelected,
    sessionId,
  } = props;

  console.log(sessionId);
  let [select, setSelect] = useState(false);
  let storage = [];
  storage = JSON.parse(localStorage.getItem('selectedmodels')) || [];
  console.log(storage);

  function textStyles(n) {
    if (n >= 0.9) {
      return 'green-font';
    } else if (n >= 0.8 && n < 0.9) {
      return 'yellow-font';
    } else {
      return 'red-font';
    }
  }

  const saveToLocalStore = (id) => {
    storage.push(id);
    localStorage.setItem('selectedmodels', JSON.stringify(storage));
  };

  const deleteItemFromStore = (id) => {
    localStorage.setItem(
      'selectedmodels',
      JSON.stringify(storage.filter((el) => el != id))
    );
  };

  const handleChecked = (id) => {
    if (storage.find((el) => el === id)) {
      select = true;
    }
    return select;
  };
  return (
    <>
      <div className="card text-left m-3">
        <div className="card-body m-3">
          <div className="model-index"> Model {train_model.id} </div>
          <div className={textStyles(train_model.mean_val_metric)}>
            {(train_model.mean_val_metric * 100).toFixed(2)}%
          </div>

          <div className="model-attr">
            <Link
              to={`/evaluate/${sessionId}/${train_model.id}`}
              currentmodel={currentmodel}>
              <button type="button" className=" btn btn-detail">
                Evaluate
              </button>
            </Link>

            <span>
              <input
                className="form-check-input ml-3 blue"
                type="checkbox"
                id="selectedModel"
                value={train_model.id}
                checked={handleChecked(train_model.id)}
                onChange={(e) => {
                  let checked = e.target.checked;
                  console.log(listSelected);
                  setSelect(checked);
                  if (checked) {
                    props.selectedModels(train_model.id);
                    saveToLocalStore(train_model.id);
                  } else {
                    props.unselectModel(train_model.id);
                    console.log('deleting', train_model.id);
                    deleteItemFromStore(train_model.id);
                  }

                  console.log(select);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentmodel: (id) => dispatch(currentmodel(id)),
    selectedModels: (id) => dispatch(selectedModels(id)),
    unselectModel: (id) => dispatch(unselectModel(id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const models = state.models;
  return {
    currentmodel: state.currentmodel,
    train_model: ownProps.train_model,
    models: models,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Model);
