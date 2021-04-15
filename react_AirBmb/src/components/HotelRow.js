import React, { Component } from 'react'
import Fave from './Fave';
import HotelDetails from './HotelDetails';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class HotelRow extends Component {
    handleDetailsClick = (Hotel) => {
        console.log(' details for', Hotel)

    }

    render() {


        return (
            <Router>
                <div class="property-card">
                    <div class="property-image">
                        <img src={this.props.HotelRow.UrlImage} />

                        <div >
                            <Link to='/HotelDetails'> <h4 > {this.props.HotelRow.hotelname} </h4></Link>
                            <Route path='/HotelDetails' component={HotelDetails}></Route>
                            <p className="summery">{this.props.HotelRow.hotelcaption}</p>
                            <p>{this.props.HotelRow.desc}</p>
                            <Fave fav={this.props.isfave} onFaveToggle={(e) => {
                                this.props.onFaveToggle()
                            }} />
                        </div></div></div>
            </Router>
        )
    }
}
