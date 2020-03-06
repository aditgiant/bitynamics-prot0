import React, {Component} from 'react'
import { Form, Field } from 'react-final-form'

/* Import Components */ 
import Input from '../components/Input';  
import Select from '../components/Select';
import Button from '../components/Button';
import {Container, Row, Col} from 'react-bootstrap'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  fetch('/addtraining',{
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    }).then(response => {
    response.json().then(data =>{
      console.log("Successful" + data);
    })
    })
  window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span>{error}</span> : null
    }
  </Field>
)

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

class FormContainerDum extends Component {
    render() {
        return (
            <Form
            onSubmit={onSubmit}
            //initialValues={{ employed: true, stooge: 'larry' }}
            validate={values => {
                const errors = {}
                if (!values.output) {
                    errors.output = 'Required'
                    }
                if (!values.network) {
                    errors.network = 'Required'
                    }
                if (!values.epochs) {
                    errors.epochs = 'Required'
                    }
                if (!values.numlayers) {
                    errors.numlayers = 'Required'
                    }
                if (!values.learningrate) {
                    errors.learningrate = 'Required'
                    }
                if (!values.batchsize) {
                    errors.batchsize = 'Required'
                    }
                if (!values.optimizer) {
                    errors.optimizer = 'Required'
                    }
                if (!values.dropout) {
                    errors.dropout = 'Required'
                    }     
                if (values.network === 'mlp') {
                    if (!values.mlpnodes) {
                    errors.mlpnodes = 'Required'
                    }
                } else if (values.network === 'cnn') {
                    if (!values.cnndenselayers) {
                    errors.cnndenselayers = 'Required'
                    }
                    if (!values.cnnsizelayers) {
                    errors.cnnsizelayers = 'Required'
                    }
                }
                return errors
            }}
            >
            {({ handleSubmit, form, submitting, pristine, values }) => (
                <form className="container" onSubmit={handleSubmit}>
                {/* <Container style={{marginTop: '10px'}}> */}
                <div>
                    <label>Output Type</label>
                    <div>
                    <label>
                        <Field
                        name="output"
                        component="input"
                        type="radio"
                        value="classification"
                        />{' '}
                        Classification
                    </label>
                    <label>
                        <Field
                        name="output"
                        component="input"
                        type="radio"
                        value="regression"
                        />{' '}
                        Regression
                    </label>
                    </div>
                    <Error name="output" />
                </div>
                <div>
                    <label>Network Type</label>
                    <div>
                    <label>
                        <Field
                        name="network"
                        component="input"
                        type="radio"
                        value="mlp"
                        />{' '}
                        MLP
                    </label>
                    <label>
                        <Field
                        name="network"
                        component="input"
                        type="radio"
                        value="cnn"
                        />{' '}
                        CNN
                    </label>
                    <label>
                        <Field
                        name="network"
                        component="input"
                        type="radio"
                        value="lstm"
                        />{' '}
                        LSTM
                    </label>
                    <Error name="network" />
                    </div>
                </div>
                <div>
                    <label>Number of Epochs</label>
                    <Field
                        name="epochs"
                        component="input"
                        type="integer"
                        placeholder="Number of Epochs"
                    />
                    <Error name="epochs" />
                </div>
                <div>
                    <label>Number of Layers</label>
                    <Field
                        name="numlayers"
                        component="input"
                        type="integer"
                        placeholder="Number of Layers"
                    />
                    <Error name="numlayers" />
                </div>
                <div>
                    <label>Learning Rate</label>
                    <Field
                        name="learningrate"
                        component="input"
                        type="integer"
                        placeholder="Learning Rate"
                    />
                    <Error name="learningrate" />
                </div>
                <div>
                    <label>Batch Size</label>
                    <Field
                        name="batchsize"
                        component="input"
                        type="integer"
                        placeholder="Batch Size"
                    />
                    <Error name="batchsize" />
                </div>
                <div>
                    <label>Optimizer</label>
                    <div>
                    <label>
                        <Field
                        name="optimizer"
                        component="input"
                        type="radio"
                        value="adam"
                        />{' '}
                        Adam
                    </label>
                    <label>
                        <Field
                        name="optimizer"
                        component="input"
                        type="radio"
                        value="SGD"
                        />{' '}
                        SGD
                    </label>
                    <label>
                        <Field
                        name="optimizer"
                        component="input"
                        type="radio"
                        value="rmsprop"
                        />{' '}
                        RMSPROP
                    </label>
                    <Error name="optimizer" />
                    </div>
                </div>
                <div>
                    <label>Dropout</label>
                    <Field
                        name="dropout"
                        component="input"
                        type="integer"
                        placeholder="Dropout"
                    />
                    <Error name="dropout" />
                </div>
                <Condition when="network" is="mlp">
                    <div>
                    <label>Number of Nodes</label>
                    <Field
                        name="mlpnodes"
                        component="input"
                        type="integer"
                        placeholder="Number of Nodes"
                    />
                    <Error name="mlpnodes" />
                    </div>
                </Condition>
                <Condition when="network" is="cnn">
                    <div>
                    <label>Dense of Layers</label>
                    <Field
                        name="cnndenselayers"
                        component="input"
                        type="integer"
                        placeholder="Dense of Layers"
                    />
                    <Error name="cnndenselayers" />
                    </div>
                    <div>
                    <label>Size of Layers</label>
                    <Field
                        name="cnnsizelayers"
                        component="input"
                        type="integer"
                        placeholder="Size of Layers"
                    />
                    <Error name="cnnsizelayers" />
                    </div>
                </Condition>
                <div className="buttons">
                    <button type="submit" disabled={submitting}>
                    Submit
                    </button>
                    <button type="button" onClick={form.reset} disabled={submitting}>
                    Reset
                    </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                {/* </Container> */}
                </form>
            )}
            </Form>
        )}
}

export default FormContainerDum;