import React, { Component } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';
import Axios from 'axios';

export default class Aircrafts extends Component {

    // setting default state
    state = {
        aircrafts: [{ aircraft_id: "", aircraft_no: "", airline: "", source: "", destination: "f" }],
        modal: false,  //state for handling modal toggle
        aircraft_id: "",  //default aircraft id  for input
        aircraft_no: "", //default aircraft no for input
        airline: "IndiGo", //default airline for input
        source: "",  //default source for input
        destination: "", //default destination for input
        showLoadBtn: true  //state to toggle between load/refresh data
    }


    // loads data on clicking Load/refrsh Button
    loadData = () => {
        Axios.get('/api/aircraft/load').then(result => {
            console.log("aircfats:", result.data)
            if (result.data.status === "success") {
                this.setState({ aircrafts: result.data.aircrafts, showLoadBtn: false })
            }
            else alert("Error Occured In Fetching Aircrafts data")
        })
            .catch(err => console.log("error:", err));
    }

    // toggles the modal
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    // handle input change based on input field name
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // function to handle add Aircraft event
    addaircraft = (e) => {
        e.preventDefault();  //preventing for page reloading on form submitting
        const { aircraft_id, aircraft_no, airline, source, destination } = this.state;
        //checking for validation
        if (aircraft_id !== "" && aircraft_no !== "" && source !== "" && destination !== "") {
            //if data is not empty then hitting the api to add aircraft
            const newAircraft = { aircraft_id, aircraft_no, airline, source, destination };
            Axios.post('/api/aircraft/add', { ...newAircraft })
                .then(result => {
                    if (result.data.status === "success") {
                        this.loadData();
                        this.toggleModal();
                        console.log("add result:", result)
                    }
                    else alert("Error Occured In Adding Data")

                }).catch(err => {
                    this.toggleModal()
                    alert("Error Occured In Adding Data");

                    throw err
                })

        }
        else {
            alert("Fields Cannot Be Empty")
        }

    }
    render() {
        const { aircrafts, aircraft_id, aircraft_no, airline, source, destination, showLoadBtn } = this.state;
        return (
            <div className="text-center">
                <h4 className="title">Aircrafts  </h4>
                <button onClick={this.loadData} className="btn btn-primary">{showLoadBtn ? <span>Load Data</span> : <span>Refresh Data</span>} </button> <br />
                {aircrafts.length > 1 && <button onClick={this.toggleModal} className="btn btn-danger" style={{ float: 'right' }}>Add</button>}
                {aircrafts.length > 1 && <table className="table">
                    <thead>
                        <tr className="head-row">
                            <th>#</th>
                            <th>Aircraft_ID</th>
                            <th>Aircraft_No</th>
                            <th>Airline </th>
                            <th>Source</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircrafts.map((aircraft, index) => {
                            return <tr className="data-row" key={`aircraft-${index}`}>
                                <td>{index + 1}</td>
                                <td>{aircraft.aircraft_id}</td>
                                <td>{aircraft.aircraft_no}</td>
                                <td>{aircraft.airline}</td>
                                <td>{aircraft.source}</td>
                                <td>{aircraft.destination}</td>
                            </tr>

                        })}
                    </tbody>
                </table>
                }


                {/* add aircraft modal */}


                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Add aircraft</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={this.addaircraft}>
                            <input type="text" placeholder="Aircraft_Id" className="form-control" name="aircraft_id" value={aircraft_id} onChange={this.handleChange} />
                            <input type="text" placeholder="Aircraft_No" className="form-control mt-1" name="aircraft_no" value={aircraft_no} onChange={this.handleChange} />
                            <select name="airline" value={airline} onChange={this.handleChange} className="form-control">
                                <option value="IndiGo">IndiGo</option>
                                <option value="Go Air">Go Air</option>
                                <option value="Spice Jet">Spice Jet</option>
                                <option value="Air India">Air India</option>
                                <option value="AirCosta">AirCosta</option>
                            </select>
                            <input type="text" placeholder="Source" className="form-control mt-1" name="source" value={source} onChange={this.handleChange} />
                            <input type="text" placeholder="Destination" className="form-control mt-1" name="destination" value={destination} onChange={this.handleChange} />
                            <input type="submit" className="btn btn-block btn-success mt-1 btn-small" name="Submit" />
                        </form>
                    </MDBModalBody>
                </MDBModal>


            </div>
        )
    }
}
