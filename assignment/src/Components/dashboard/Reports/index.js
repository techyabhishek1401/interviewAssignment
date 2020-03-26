import React, { Component } from 'react';
import AirportSummary from './AirportSummary';
import FuelConsumption from './FuelConsumption';

export default class Reports extends Component {
    state = {
        visible: 1
    }

    // function to switch tabs on clicking tab
    switchTab = (tab, e) => {
        let active = document.querySelector('.actives');  //findind active element

        if (active) {  //if active element found then remove the active class and add it to the triggerd element
            active.classList.remove("actives");
            e.target.classList.add('actives')
        }
        else {
            e.target.classList.add('actives')
        }
        this.setState({ visible: tab })  //showing selected tab
    }
    render() {
        const { visible } = this.state;
        return (
            <div className="text-center">
                <h4 className="title">Reports  </h4>
                <div className="header mt-5 text-center" >
                    <ul style={{ display: "inline-block" }}>
                        <li onClick={this.switchTab.bind(this, 2)} className="" >Fuel Consumption</li>
                        <li onClick={this.switchTab.bind(this, 1)} className="actives">Airport Summary</li>
                    </ul>
                </div>

                {visible === 1 ? <AirportSummary /> : <FuelConsumption />}
            </div>
        )
    }
}
