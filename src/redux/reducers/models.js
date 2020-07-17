const initialState = {
  fetching: false,
  fetched: false,
  models: [],
  errorfetchmodel: null,
  selectedModels: [],
  testmodels: [],
  currentmodel: 1,
  currentPage: 'evaluate',
};

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MODEL_START':
      return {
        ...state,
        fetching: true,
      };

    case 'FETCH_MODEL_SUCCESS':
      return {
        ...state,
        fetching: false,
        fetched: true,
        models: action.models,
      };

    case 'FETCH_MODEL_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: true,
        errorfetchmodel: action.errorfetchmodel,
      };

    case 'FETCH_TEST_SUCCESS':
      return {
        ...state,
        fetching: false,
        fetched: true,
        testmodels: action.testmodels,
      };
    case 'CURRENT_MODEL':
      return {
        ...state,
        currentmodel: action.currentmodel,
      };
    case 'SELECTED_MODEL':
      return {
        ...state,
        selectedModels: [...state.selectedModels, action.selected],
      };
    case 'UNSELECT_MODEL':
      return {
        ...state,
        selectedModels: state.selectedModels.filter(
          (el) => el != action.unselect
        ),
      };
    case 'CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.page,
      };
    }

    default:
      return state;
  }
};
