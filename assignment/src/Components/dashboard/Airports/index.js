import React, { Component } from 'react'
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Axios from 'axios';
export default class Airport extends Component {
    state = {
        airports: [{ airport_id: "", airport_name: "", fuel_capacity: null, fuel_available: null },],
        modal: false,
        airport_id: "",
        airport_name: "",
        fuel_capacity: "",
        fuel_available: "",
        showLoadBtn: true
    }


    //function to load data from DB
    loadData = () => {
        Axios.get('/api/airport/load').then(result => {
            if (result.data.status === "success") {
                this.setState({ airports: result.data.airports, showLoadBtn: false })
            }
            else alert("Error Occured In Fetching Airports data")
        })
            .catch(err => console.log("error:", err));
    }

    //toggles the modal
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    //handle input change
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    //Function to handle addAirport event
    addAirport = (e) => {
        e.preventDefault();
        const { airport_id, airport_name, fuel_capacity, fuel_available } = this.state;
        //checnking for empty/zero fields
        if (airport_id !== "" && airport_name !== "" && fuel_available !== 0 && fuel_available !== "" && fuel_capacity !== "" && fuel_capacity !== 0 && fuel_available <= fuel_capacity) {
            // if valid then making api call to add aircraft
            const newAirport = { airport_id, airport_name, fuel_capacity, fuel_available };
            Axios.post('/api/airport/add', { ...newAirport })
                .then(result => {
                    if (result.data.status === "success") {
                        this.toggleModal();   //closing modal on succesfully adding daata to db
                        this.loadData();  //load the updated data
                        console.log("add result:", result)
                    }
                    else alert("Error Occured In Adding Data")

                }).catch(err => {
                    this.toggleModal()
                    alert("Error Occured In Adding Data");

                    throw err
                })
        }
        else {  //if validation fails
            alert("Fields Cannot Be Empty Or Zero")
        }

    }
    render() {
        const { airports, airport_id, airport_name, fuel_capacity, fuel_available, showLoadBtn } = this.state;
        return (
            <div className="text-center">
                <h4 className="title">Airports  </h4>
                <button onClick={this.loadData} className="btn btn-primary">{showLoadBtn ? <span>Load Data</span> : <span>Refresh Data</span>} </button> <br />
                {airports.length > 1 && <button onClick={this.toggleModal} className="btn btn-success" style={{ float: 'right' }}>Add</button>}
                {airports.length > 1 && <table className="table">
                    <thead>
                        <tr className="head-row">
                            <th>#</th>
                            <th>Airport_ID</th>
                            <th>Airport_Name</th>
                            <th>Fuel Capacity </th>
                            <th>Fuel Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airports.map((airport, index) => {
                            return <tr className="data-row" key={`airports-${index}`}>
                                <td>{index + 1}</td>
                                <td>{airport.airport_id}</td>
                                <td>{airport.airport_name}</td>
                                <td>{airport.fuel_capacity}</td>
                                <td>{airport.fuel_available}</td>
                            </tr>

                        })}
                    </tbody>
                </table>
                }


                {/* add airport modal */}


                <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <MDBModalHeader toggle={this.toggleModal}>Add Airport</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={this.addAirport}>
                            <input type="text" placeholder="Airport_Id" className="form-control" name="airport_id" value={airport_id} onChange={this.handleChange} />
                            <input type="text" placeholder="Airport_Name" className="form-control mt-1" name="airport_name" value={airport_name} onChange={this.handleChange} />
                            <input type="number" placeholder="Fuel Capacity" className="form-control mt-1" name="fuel_capacity" value={fuel_capacity} onChange={this.handleChange} />
                            <input type="number" placeholder="Fuel Left" className="form-control mt-1" name="fuel_available" value={fuel_available} onChange={this.handleChange} />
                            <input type="submit" className="btn btn-block btn-success mt-1 btn-small" name="Submit" />
                        </form>
                    </MDBModalBody>
                </MDBModal>


            </div>
        )
    }
}
