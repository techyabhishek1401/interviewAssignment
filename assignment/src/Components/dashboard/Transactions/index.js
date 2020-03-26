import React, { Component } from 'react'
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Axios from 'axios';
import DateTimePicker from 'react-datetime-picker';

export default class Transactions extends Component {
    state = {
        // default transaction array for rendering
        transactions: [{
            transaction_id: "",
            transaction_date_time: "",
            transaction_type: "",
            airport_id: "airport_1",
            aircraft_id: "aircraft_1",
            quantity: 0,
            transaction_id_parent: ""
        }],
        //for handling load/refresh button
        showLoadBtn: true,
        // state for handling selected transaction on clicking reverse
        selectedTransaction: {
            transaction_id: "",
            transaction_date_time: new Date(),
            transaction_type: "IN",
            airport_id: "airport_1",
            aircraft_id: "aircraft_1",
            quantity: 0,
            transaction_id_parent: ""
        },
        //array to store distinct airport id from database
        airport_ids: [],
        //array to store distinct aircraft id from database
        aircraft_ids: [],

        //headerkey for rendering table rows
        headerKey: ["transaction_id",
            "transaction_date_time",
            "transaction_type",
            "airport_id",
            "aircraft_id",
            "quantity",
            "transaction_id_parent"],
        modal: false,

    }

    // function load load data on click load button
    loadData = () => {
        Axios.get('/api/transaction/load').then((result) => {
            console.log("transaction:", result.data)
            if (result.data && result.data.transactions) {
                this.setState({ transactions: result.data.transactions })
            }

        }).catch(err => { throw err });


    }

    // getting distinct airport ids and aircraft id
    componentDidMount() {
        Axios.get('/api/airport/airportId').then((result => {
            console.log("result:", result)
            this.setState({ airport_ids: result.data.airportIds })
        }))

        Axios.get('/api/aircraft/aircraftId').then((result => {
            console.log("result:", result)
            this.setState({ aircraft_ids: result.data.aircraftIds })
        }))
    }

    // handle modal togal
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // handling date change
    handleDateChange = (dateTime) => {
        this.setState({ selectedTransaction: { ...this.state.selectedTransaction, transaction_date_time: dateTime } })
    }

    //handling input change
    handleChange = (e) => {
        this.setState({ selectedTransaction: { ...this.state.selectedTransaction, [e.target.name]: e.target.value } })
    }

    // function  to add transaction
    addTransaction = (e) => {
        e.preventDefault();

        const { transaction_id, transaction_date_time, quantity } = this.state.selectedTransaction;
        //    validation for empty and zero values
        if (transaction_id !== "" && transaction_date_time !== "" && quantity !== 0) {
            Axios.post('/api/transaction/add', this.state.selectedTransaction).then(result => {
                this.loadData();
                this.toggleModal();
                console.log("add Transaction result:", result.data);
            }).catch(err => {
                throw err
            })
        }
        else {
            alert("fields cannot be empty or zero")
        }

    }

    // function to handling transaction revere
    reverseTransaction = (transaction) => {
        this.toggleModal();
        // setting input modal value for selected transaction
        this.setState({
            selectedTransaction: {
                ...transaction,
                transaction_id_parent: transaction.transaction_id,
                quantity: transaction.quantity * -1,
                transaction_type: transaction.transaction_type === "IN" ? "OUT" : "IN"
            }
        });
        console.log("transactions:", transaction)
    }
    render() {
        const { transactions, showLoadBtn, headerKey, airport_ids, aircraft_ids } = this.state;
        const { transaction_id,
            transaction_date_time,
            transaction_type,
            airport_id,
            aircraft_id,
            quantity,
            transaction_id_parent } = this.state.selectedTransaction;
        return (
            <div className="text-center">
                <h4 className="title">Transactions  </h4>
                <button onClick={this.loadData} className="btn btn-primary">{showLoadBtn ? <span>Load Transactions</span> : <span>Refresh Data</span>} </button> <br />
                {/* {transactions.length > 0 && <button onClick={this.toggleModal} className="btn btn-danger" style={{ float: 'right' }}>Add</button>} */}
                <button onClick={this.toggleModal} className="btn btn-success" style={{ float: 'right' }}>Add</button>
                {transactions.length > 1 && <table className="table">
                    <thead>
                        <tr className="head-row">
                            <th>Transaction_ID </th>
                            <th>Date Time </th>
                            <th>Transaction Type  </th>
                            <th>Airport_Id </th>
                            <th>Aircraft_Id  </th>
                            <th>Quantity </th>
                            <th>Transaction_Id_Parent  </th>
                            <th>Reverse  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => {
                            return <tr>
                                {headerKey.map((key) => {
                                    return <td>{transaction[key]}</td>
                                })}
                                <td onClick={this.reverseTransaction.bind(this, transaction)} className="btn btn-info p-1">Reverse</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                }


                {/* add airport modal */}


                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Add Airport</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={this.addTransaction}>
                            <input type="text" placeholder="Transaction_Id " className="form-control" name="transaction_id" value={transaction_id} onChange={this.handleChange} />
                            <DateTimePicker
                                onChange={this.handleDateChange}
                                value={transaction_date_time}
                                className="form-control"
                            />
                            <select name="transaction_type" value={transaction_type} onChange={this.handleChange} className="form-control mt-1">
                                <option value="IN">IN</option>
                                <option value="OUT">OUT</option>
                            </select>
                            <select className="form-control mt-1" name="airport_id" value={airport_id} onChange={this.handleChange}>
                                {airport_ids.map(airportID => {
                                    return <option value={airportID}>{airportID}</option>
                                })}
                            </select>

                            <select className="form-control mt-1" name="aircraft_id" value={aircraft_id} onChange={this.handleChange} >
                                {aircraft_ids.map(aircraftID => {
                                    return <option value={aircraftID}>{aircraftID}</option>
                                })}
                            </select>


                            <input type="number" max="600000" placeholder="Quantity" className="form-control mt-1" name="quantity" value={quantity} onChange={this.handleChange} />
                            <input type="text" placeholder="Transaction Id Parent" className="form-control mt-1" name="transaction_id_parent" value={transaction_id_parent} onChange={this.handleChange} />
                            <input type="submit" className="btn btn-block btn-success mt-1 btn-small" name="Submit" />
                        </form>
                    </MDBModalBody>
                </MDBModal>


            </div>
        )
    }
}
