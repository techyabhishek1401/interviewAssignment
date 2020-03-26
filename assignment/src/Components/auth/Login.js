import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  //redirecting to dashboard if already loggedin
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  // method to set state on input change
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  //submiiting login details
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">


            <form noValidate onSubmit={this.onSubmit}>
              <div className="container form">
                <div className="row">
                  <div className="col-md-4 mx-auto">

                    <h4 className="h4 text-center mb-4">Sign in</h4>
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                      Your email
                            </label>
                    <input type="email" value={email} onChange={this.handleChange} name="email" className="form-control" />
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                      Your password
                           </label>
                    <input type="password" value={password} name="password" onChange={this.handleChange} className="form-control" />
                    <div className="text-center mt-4">
                      <button className="btn btn-danger" type="submit">Login</button>

                    </div>

                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


//mapping state to props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


//exporting ussing connect to use redux action and payload
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);         
