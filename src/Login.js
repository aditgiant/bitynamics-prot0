import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Bitynamics from './imgsrc/Bitynamics.png';
import fire from './Fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      failedLogin: '',
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      failedLogin: '',
    });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        this.setState({...this.state, failedLogin: error.message});
        // console.log(error);
        // console.log(this.state.failedLogin);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    console.log(this.state.failedLogin);
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        }}>
        <div
          style={{
            width: '50vw',
            color: 'blue',
            height: '100vh',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          }}>
          <img src={Bitynamics} style={{maxWidth: '20vw'}} />
        </div>
        <div style={{width: '50vw'}}>
          <br />
          <div className="col-md-6">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                onClick={this.login}
                class="btn btn-primary">
                Login
              </button>
              <br />
              <br />
              {this.state.failedLogin !== '' && (
                <small id="error-help" class="form-text text-muted">
                  <p>{this.state.failedLogin}</p>
                </small>
              )}
              {/* <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
