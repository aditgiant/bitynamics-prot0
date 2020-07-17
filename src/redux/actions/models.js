import axios from 'axios';
export const FETCH_MODEL_START = 'FETCH_MODEL_START';
export const FETCH_MODEL_SUCCESS = 'FETCH_MODEL_SUCCESS';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_MODEL_ERROR = 'FETCH_MODEL_ERROR';
export const CURRENT_MODEL = 'CURRENT_MODEL';
export const SELECTED_MODEL = 'SELECTED_MODEL';
export const UNSELECT_MODEL = 'UNSELECT_MODEL';
export const CURRENT_PAGE = 'CURRENT_PAGE';

const fetchModelRequest = () => {
  return {
    type: FETCH_MODEL_START,
  };
};

const fetchModelSuccess = (models) => {
  return {
    type: FETCH_MODEL_SUCCESS,
    models,
  };
};

const fetchTestSuccess = (testmodels) => {
  return {
    type: FETCH_TEST_SUCCESS,
    testmodels,
  };
};

const fetchModelError = (errorfetchmodel) => {
  return {
    type: FETCH_MODEL_ERROR,
    errorfetchmodel,
  };
};

//  DONT DELETE THIS CODE

// export const fetchModel = () => (dispatch) => {
//   dispatch(fetchModelRequest());
//   axios
//     .get('http://localhost:2000/analytics')
//     .then((response) => {
//       dispatch(fetchModelSuccess(response.data[0].training_stats));
//       dispatch(
//         fetchTestSuccess(response.data[0].final_model_stats.test_scores)
//       );
//     })
//     .catch((err) => {
//       dispatch(fetchModelError(err));
//     });
// };

//temporary statics data
var analytics = [
  {
    id: 1,
    problem_type: 'clf',
    network_type: 'mlp',
    training_stats: [
      {
        id: 1,
        training: {
          loss: [
            0.7586624002456666,
            0.310028805616498,
            0.19759396076202393,
            0.1567151809453964,
          ],
          val_loss: [
            0.43266513934135437,
            0.3313079996705055,
            0.3346164469957352,
            0.3158192831635475,
          ],
          metric: [0.7684, 0.9016, 0.9396, 0.9548],
          val_metric: [0.8772, 0.9124, 0.9, 0.912],
          epochs: [1, 2, 3, 4],
        },
        mean_val_metric: 0.9056,
        param: {
          batch_size: 64,
          dense_layer_size: [32],
          dropout: 0.0,
          epochs: 4,
          lr: 0.01,
          optimizer: 'Adam',
        },
      },
      {
        id: 2,
        training: {
          loss: [
            0.908630029964447,
            0.33681868953704835,
            0.24297457103729247,
            0.1761658539019525,
            0.1420642805814743,
            0.08685613509453834,
            0.13545341263487934,
          ],
          val_loss: [
            0.4467066997051239,
            0.4137555491447449,
            0.40479482816457746,
            0.4705820859909058,
            0.31568504613637927,
            0.5951048266649246,
            0.32581401319503783,
          ],
          metric: [0.7108, 0.898, 0.9232, 0.9444, 0.9528, 0.9728, 0.9572],
          val_metric: [0.856, 0.8788, 0.8852, 0.876, 0.9108, 0.8396, 0.9144],
          epochs: [1, 2, 3, 4, 5, 6, 7],
        },
        mean_val_metric: 0.9038,
        param: {
          batch_size: 64,
          dense_layer_size: [64, 32, 64],
          dropout: 0.0,
          epochs: 7,
          lr: 0.01,
          optimizer: 'Adam',
        },
      },
      {
        id: 3,
        training: {
          loss: [
            0.897944869852066,
            0.3427505557537079,
            0.24292189953327178,
            0.1778512557502836,
          ],
          val_loss: [
            0.5416226383686066,
            0.4216865836858749,
            0.3951982403755188,
            0.3927836843490601,
          ],
          metric: [0.7036, 0.896, 0.928, 0.9468],
          val_metric: [0.8268, 0.8732, 0.8796, 0.8992],
          epochs: [1, 2, 3, 4],
        },
        mean_val_metric: 0.8952,
        param: {
          batch_size: 64,
          dense_layer_size: [64, 32, 32],
          dropout: 0.0,
          epochs: 4,
          lr: 0.01,
          optimizer: 'Adam',
        },
      },
      {
        id: 4,
        training: {
          loss: [0.8958081630706787],
          val_loss: [0.4267076043128967],
          metric: [0.7016],
          val_metric: [0.8724],
          epochs: [1],
        },
        mean_val_metric: 0.8542,
        param: {
          batch_size: 64,
          dense_layer_size: [32, 32],
          dropout: 0.0,
          epochs: 1,
          lr: 0.01,
          optimizer: 'Adam',
        },
      },
      {
        id: 5,
        training: {
          loss: [
            1.6533251403212548,
            0.7995665402173996,
            0.6801390284061432,
            0.643379089307785,
          ],
          val_loss: [
            1.0795313751220703,
            0.831397485613823,
            0.8020717547416687,
            0.7748424188368023,
          ],
          metric: [0.5596, 0.7512, 0.792, 0.8048],
          val_metric: [0.6072, 0.7544, 0.7616, 0.7732],
          epochs: [1, 2, 3, 4],
        },
        mean_val_metric: 0.752,
        param: {
          batch_size: 64,
          dense_layer_size: [32],
          dropout: 0.0,
          epochs: 4,
          lr: 0.1,
          optimizer: 'Adam',
        },
      },
    ],
    final_model_stats: {
      training: {
        loss: [
          0.562493628025055,
          0.2694247923374176,
          0.18702692240774632,
          0.13357354593276977,
        ],
        metric: [0.8246, 0.9208, 0.943, 0.9618],
        epochs: [1, 2, 3, 4],
      },
      test_scores: {loss: 0.27912824033722283, metric: 0.9194},
      param: {
        batch_size: 64,
        dense_layer_size: [32],
        dropout: 0.0,
        epochs: 4,
        lr: 0.01,
        optimizer: 'Adam',
      },
    },
    all_tested_params: [
      {
        batch_size: 64,
        dense_layer_size: [32],
        dropout: 0.0,
        epochs: 4,
        lr: 0.1,
        optimizer: 'Adam',
      },
      {
        batch_size: 64,
        dense_layer_size: [64, 32, 64],
        dropout: 0.0,
        epochs: 7,
        lr: 0.01,
        optimizer: 'Adam',
      },
      {
        batch_size: 64,
        dense_layer_size: [32, 32, 32],
        dropout: 0.0,
        epochs: 1,
        lr: 0.1,
        optimizer: 'Adam',
      },
      {
        batch_size: 64,
        dense_layer_size: [64, 32, 32],
        dropout: 0.0,
        epochs: 4,
        lr: 0.01,
        optimizer: 'Adam',
      },
      {
        batch_size: 64,
        dense_layer_size: [32],
        dropout: 0.0,
        epochs: 4,
        lr: 0.01,
        optimizer: 'Adam',
      },
      {
        batch_size: 64,
        dense_layer_size: [32, 32],
        dropout: 0.0,
        epochs: 1,
        lr: 0.01,
        optimizer: 'Adam',
      },
    ],
  },
];

export const fetchModel = () => (dispatch) => {
  dispatch(fetchModelRequest());
  dispatch(fetchModelSuccess(analytics[0].training_stats));
  dispatch(fetchTestSuccess(analytics[0].final_model_stats.test_scores));
};

export const currentmodel = (id) => (dispatch) => {
  dispatch({
    type: CURRENT_MODEL,
    id,
  });
};

export const selectedModels = (selected) => (dispatch) => {
  dispatch({
    type: SELECTED_MODEL,
    selected,
  });
};

export const unselectModel = (unselect) => (dispatch) => {
  dispatch({
    type: UNSELECT_MODEL,
    unselect,
  });
};

export const currentPage = (page) => (dispatch) => {
  dispatch({
    type: CURRENT_PAGE,
    page,
  });
};
