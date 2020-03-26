import React, { Component } from 'react';
import axios from 'axios';

export default class FuelConsumption extends Component {
    state = {
        fuelSummary: [{
            airport_id: "airport_3",
            airport_name: "Chhatrapati Shivaji International Airport, Mumbai ",
            fuel_capacity: 600000,
            fuel_available: 500010,
            transactions: [{
                transaction_id: "transaction_47",
                transaction_date_time: "2020-03-25T14:07:50.474Z",
                transaction_type: "IN",
                airport_id: "airport_3",
                aircraft_id: "aircraft_5",
                quantity: "99990",
                transaction_id_parent: ""
            }]
        }]
    }
    componentDidMount() {
        axios.get('/api/reports/fuelSummary').then(result => {
            console.log("Fuel Summary:", result.data)
            this.setState({ fuelSummary: result.data.airports })
        }).catch(err => {
            throw err
        })
    }
    render() {
        const { fuelSummary } = this.state;
        return (
            <div className="text-left border p-3">
                <h4 className="text-center title">Fuel Consumption Summary</h4>

                {fuelSummary.map(record => {
                    return <>
                        {record.transactions && <>
                            <div className="report-section">
                                <h4>Airport: {record.airport_name}</h4>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Date Time</th>
                                            <th>Type</th>
                                            <th>Fuel</th>
                                            <th>Aircraft</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.transactions && record.transactions.map((transaction, index) => {
                                            return <tr key={`fuel-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{transaction.transaction_date_time}</td>
                                                <td>{transaction.transaction_type}</td>
                                                <td>{transaction.quantity}</td>
                                                <td>{transaction.aircraft_id}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                <h6>Fuel Available: {record.fuel_available} </h6>
                            </div>
                        </>}
                    </>
                })}
            </div>
        )
    }
}
