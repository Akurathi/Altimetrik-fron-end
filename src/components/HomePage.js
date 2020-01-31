import React, { Component } from 'react';
import axios from "axios";

class HomePage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            vehicleDetails :[]
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        var url = "http://localhost:8081/getVechicleByName?vehicleName="+this.state.name;
        console.log(url);
        axios
          .get(url)
          .then(res => {
            const details = res.data;
            this.setState({ vehicleDetails: details });
            console.log(res.data);
            console.log(this.state.vehicleDetails);
            // this.setState({})
          });
          
        
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      };
    
    displayOwnerRows() {

        

        if(this.state.vehicleDetails === null)
        {
            return( <div>No items are available</div>);
        }

        return this.state.vehicleDetails.map(d => {
          return (
            <tr key={d.id}>
              <th scope="row">{d.id}</th>
              <td>{d.mfr_ID}</td>
              <td>{d.mfr_Name}</td>
              <td>{d.city==="null" ? <div style={{fontWeight: "bold"}}>not available</div> : d.city}</td>
              <td>{d.state==="null" ? <div style={{fontWeight: "bold"}}>not available</div>  : d.state}</td>
              <td>{d.country==="null" ? <div style={{fontWeight: "bold"}}>not available</div>  : d.country}</td>
            </tr>
          )
        })
      }


    render(){
        return(
            <div >

                <div><h2>Vehicle Manufacture Details</h2></div>

                <form onSubmit={this.submitForm}>
                    Enter a name <input type="text" name="name" onChange={this.handleChange}></input>
                    <button name="submit" style={{ position: "relative", left: "12px"}}>Submit</button>
                </form>

                <div className="container"><br></br>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Mfr_Id</th>
                                <th scope="col">Mfr_Name</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayOwnerRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default HomePage;