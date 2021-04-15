import React, { Component } from 'react';
import './App.css';
import HotelListing from './components/HotelListing'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import Reviews from './components/Reviews';
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faves: [],
     


    }
    this.handleFaveToggle = this.handleFaveToggle.bind(this)
    this.deleteAllFav = this.deleteAllFav.bind(this)
  }


  //to know a five and how many it 
  handleFaveToggle = (Hotel) => {
    const faves = this.state.faves.slice(0)//copy of faves array
    const HotelIndex = this.state.faves.indexOf(Hotel)//to splice that from faves array 
    faves.includes(Hotel) ? faves.splice(HotelIndex, 1) : faves.push(Hotel)//to check if it in faves array or not
    this.setState({ faves })// The above is exactly the same as this.setState({faves: faves})
    console.log(faves)



  }//end of handleFaveToggle

  deleteAllFav = () => {
    console.log('Delet');
    // we need CDN ???
    this.setState({ faves: [] })

  };

  render() {
    return (
      <Router>
        
        <nav className="nav " >
          <div className="navtitle">
            <h2>AirBmb</h2>

            <Link to='/' >Home </Link>
            <Link to='/AboutMe'>About  </Link>
            <Link to='/Contact'>Contact </Link>




          </div>
        </nav>

        <div>
          <Route exact path='/' render={(props) => <Home {...props} />}
          />
          <Route
            path="/HotelListing"
            render={(props) => <HotelListing {...props} onFaveToggle={this.handleFaveToggle} fav={this.state.faves} DeletFave={this.deleteAllFav} />}
          />
          <Route path='/AboutMe' component={AboutMe}></Route>
          <Route exact path='/Contact' component={Contact}></Route>
        





        </div>

      </Router>

    );
  }



}  //Class end






