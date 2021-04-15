import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            city: ''
        }
    }


    onInputchange(event) {
        this.setState({
            city: event.target.value
        });
        console.log(this.state.city)
    }
    render() {
        return (
            <div>
                <div>
                  
                       

                            <div className="container">
                                <img className='hotelImage' src={require('./Img/home.jpg')} />
                                <div className="centered">
                                    <h1 >Get to know Airbmb</h1>

                                    <div class="wrap">
                                        <div class="search">
                                            <input
                                                type="text"
                                                name="city"
                                                value={this.state.city}
                                                placeholder="Where are you going?"
                                                onChange={(e) => this.onInputchange(e)}
                                            /><Link type="submit" class="searchButton" to={`/HotelListing?CityName=${this.state.city}`}> <i class="fa fa-search"></i></Link>
                                        </div>
                                    </div>
                                </div>

                            </div></div>
                   

                    <div className="welcome">
                        <h3> Welcome to the Airbmb travel community. Wherever you go, we have a place for you!</h3>
                    </div>


                    <table className='cityCountainer'>
                
                        <tr>
                            <td ><Link to="/HotelListing?CityName=Riyadh" ><img src={require('./Img/Riyadh.jpg')} /></Link><h3>Riyadh</h3></td>
                            <td><Link to="/HotelListing?CityName=London" ><img src={require('./Img/London.jpg')} /></Link><h3>London</h3></td>
                            <td><Link to="/HotelListing?CityName=Dubai" ><img src={require('./Img/Dubai.jpg')} /></Link><h3>Dubai</h3></td>

                        </tr>

                        <tr>
                            <td><Link to="/HotelListing?CityName=mecca" ><img src={require('./Img/Makkah.jpg')} /></Link><h3>Makkah</h3></td>
                            <td><Link to="/HotelListing?CityName=Medina" ><img src={require('./Img/madinah.jpg')} /></Link><h3>Madina Munawara</h3></td>
                            <td><Link to="/HotelListing?CityName=newyork" ><img src={require('./Img/newYork.jpg')} /></Link><h3>New York</h3></td>
                        </tr>
                    </table>
                </div>
        )
    }
}
