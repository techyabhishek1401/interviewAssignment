import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";
import Landing from './Components/layout/Landing'
import Login from './Components/auth/Login'

import "./App.css";

// Check for token to keep user logged in
if (localStorage.user) {
  // Set auth token header auth
  const user = localStorage.user;

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(JSON.parse(user)));
  // Check for expired token

}
class App extends Component {
  render() {
    return (
      //
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* Login Screen (Public url) */}
            <Route exact path="/" component={Login} />
            <Switch>
              {/* secure route for authenticated user only */}
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
