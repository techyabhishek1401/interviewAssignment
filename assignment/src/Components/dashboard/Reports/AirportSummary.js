import React, { Component } from 'react';
import axios from 'axios';

export default class AirportSummary extends Component {
    state = {
        airportSummary: [{ airport_name: "", fuel_capacity: "" }]
    }
    componentDidMount() {
        axios.get('/api/reports/airportSummary').then(result => {
            console.log("Aircraft Summary:", result.data)
            this.setState({ airportSummary: result.data.airports })
        }).catch(err => {
            throw err
        })
    }
    render() {
        const { airportSummary } = this.state;
        return (
            <div>
                <h4 className="title">AirportSummary</h4>

                <table className="table">
                    <thead>
                        <tr className="head-row">
                            <th>#</th>
                            <th>Airport</th>
                            <th>Fuel Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airportSummary.map((airport, index) => {
                            return <tr className="data-row" key={`airport-${index}`}>
                                <td>{index + 1}</td>
                                <td>{airport.airport_name}</td>
                                <td>{airport.fuel_available}</td>
                            </tr>

                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
