import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (<div>

            <div className="header mt-5 text-right" >

                <ul >
                    <li onClick={this.onLogoutClick}>Logout</li>
                    <li><NavLink to="/dashboard/reports" activeClassName="active-nav" >Reports</NavLink></li>
                    <li><NavLink to="/dashboard/transactions" activeClassName="active-nav">Transaction</NavLink></li>
                    <li><NavLink to="/dashboard/aircrafts" activeClassName="active-nav" >Aircraft</NavLink></li>
                    <li><NavLink to="/dashboard/airports" activeClassName="active-nav" >Airport</NavLink></li>
                    <li><NavLink to="/dashboard" activeClassName="active" >Home</NavLink></li>

                </ul>
            </div>
        </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
