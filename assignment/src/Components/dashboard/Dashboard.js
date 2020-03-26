import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import Aircrafts from './Aircrafts';
import Airports from './Airports';
import Reports from './Reports';
import Transactions from './Transactions';
import Navbar from './Navbar';
import { airports, aircrafts } from '../../utils/data'
import Axios from "axios";

class Dashboard extends Component {
  state = {
    dis: false
  }

  loadData = () => {
    this.setState({ dis: true })
    Axios.post('/api/airport/addStaticData', airports).then(result => {

      console.log("result:", result)
    }).catch(err => {
      alert("Record Not Fetched");
      console.log("err:", err)
    })
    Axios.post('/api/aircraft/addStaticData', aircrafts).then(result => {
      console.log("result:", result)

    }).catch(err => {
      alert("Record Not Fetched");
      console.log("err:", err)
    })
  }
  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container">
        <Navbar />
        <div className="row">
          <div className="landing-copy col  center-align">
            <h4 className="text-center">
              {/* displaying loggedin user email */}
              <b>Hey there,</b> {user.email}
            </h4>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-success btn-small mx-auto" disabled={this.state.dis} onClick={this.loadData}>Load Records To DB</button>
        </div>

        <Switch>
          <Route path="/dashboard" exact component={Airports} />
          <Route path="/dashboard/airports" component={Airports} />
          <Route path="/dashboard/aircrafts" component={Aircrafts} />
          <Route path="/dashboard/reports" component={Reports} />
          <Route path="/dashboard/transactions" component={Transactions} />
        </Switch>
      </div>
    );
  }
}

Dashboard.propTypes = {

  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
