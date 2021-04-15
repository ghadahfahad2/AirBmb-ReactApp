import React, { Component } from 'react'
import HotelRow from './HotelRow'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'

const API_KEY = '8d2a65a05ab825689a4a1ff59b7ffefa'

export default class HotelListing extends Component {
  constructor(props) { // props is { body: "This is my first blog post" }
    super();
    this.state = {
      filter: 'ALL',// This will set up the initial state of the component.
      isFave: false,
      hotels: [],
      cityName: '',
      des: [],
      weather: [],
      review: [],


    }
  }
  handleFilterClick = (fave) => {
    console.log(" filter to", fave)
    this.setState({
      filter: fave,
      isFave: !this.state.isFave

    })
  };




  //step1 We must to git  hotel location then pass into Hotel Listing 
  HotelCity = () => {
    let city = this.props.location.search;
    let city_target = city.split('=')[1]
    console.log(city_target)
    this.setState({ cityName: city_target })
    this.CityWeather(city_target)// weather for that city

    axios.get(`https://hotels4.p.rapidapi.com/locations/search`, {
      params: {
        locale: 'en_US',
        query: city_target
      }
      ,
      headers: {
        "x-rapidapi-key": '99de6329f5msh494edcf76ce0368p1b91bfjsne8eb2ecc7101',
        "x-rapidapi-host": 'hotels4.p.rapidapi.com',
      }
    })//git hotel depened on city
      .then((response) => {
        //console.log('RESPONSE: ', response);
        //console.log('DATA: ', response.data);
        const hotilObject = response.data.suggestions[1].entities
        console.log(hotilObject)
        console.log("-----------CityInfo----------")
        //create a new array
        //itrative hotelGroubs to take title and caption of hotel
        //obj
        let Hotel = hotilObject.map((elemnt) => {
          let hotelName = elemnt.name
          let caption = elemnt.caption
          let hoteDestinationId = elemnt.destinationId
          let tagIndex = caption.indexOf('</span>') + 7; // Find where the end span tag starts
          let CpationEnd = caption.substring(tagIndex) // Find where the caption ends
          console.log("Name", hotelName)
          console.log("Caption", CpationEnd)
          console.log("hoteDestinationId", hoteDestinationId)
          console.log("--------------------------")
          return { hotelname: hotelName, hotelcaption: CpationEnd, destinationId: hoteDestinationId }//to return array of objects (objects for each hotel , then return Hotel name and Hotel caption )
        })
        this.setState({ hotels: Hotel })
        console.log(this.state.hotels)

        console.log(this.state.hotels.length)
        this.img()
      })//than end
      .catch(function (error) {
        console.log(error);
      })
  }
  img = () => {

    //copy of array
    axios
      .get(`https://pixabay.com/api/?key=19861152-6a9ff67c914dab74f7324120a&q=hotel&image_type=photo`)

      .then((response) => {
        console.log(response.data.hits)//arrayOfHotel
        let length = response.data.hits.length//to cheak with hotel length
        //that Url return  form url we will create a new array and assign the to it 
        let newImageArray = response.data.hits.map((value) => {
          return value.previewURL
        })
        console.log(newImageArray)
        //splice the elemnt in image array depond in hotel length
        //create copy of hotel state to pass each img into each hotel 
        //setState the hotel state into the new one
        console.log(this.state.hotels)
        const hotelImage = [...this.state.hotels]
        console.log(hotelImage)
        console.log('-------2-----')
        console.log(newImageArray.length)
        console.log(this.state.hotels.length)
        if (newImageArray.length >= this.state.hotels.length) {
          newImageArray.splice(this.state.hotels.length, newImageArray.length - this.state.hotels.length)
          for (let index = 0; index < hotelImage.length; index++) {
            hotelImage[index].UrlImage = newImageArray[index]
          }

        }
        console.log('--------------------------')
        this.setState({ hotels: hotelImage })
        console.log(this.state.hotels)
        this.HotelDes()


      })
      .catch(function (error) {
        console.log(error);
      })
  }//End HotelImage function

  //Hotel Details
  HotelDes = () => {
    console.log(this.state.hotels)
    let copy = [...this.state.hotels]
    let HotelDescription = copy.map((value, i) => {
      let desId = value.destinationId
      this.testFunc(desId, i)
    })
  }
  testFunc = (desId, i) => {
    console.log("THIS GOT CALLED ", desId, i);
    axios.get(`https://hotels4.p.rapidapi.com/properties/get-details`, {
      params: {
        "id": desId,
        "locale": "en_US",
      }
      ,
      headers: {
        "x-rapidapi-key": '99de6329f5msh494edcf76ce0368p1b91bfjsne8eb2ecc7101',
        "x-rapidapi-host": 'hotels4.p.rapidapi.com',
      }
    })//git hotel depened on city
      .then((response) => {
        console.log('res:', response.data)
        //create a new key and contain all hotel description for each hotel 
        //to Join into string 
        let newHotel = this.state.hotels
        newHotel[i].desc = response.data.data.body.overview.overviewSections[0].content.join(' , ')
        console.log('Hotel Info', this.state.hotels)
        this.setState({ hotels: newHotel })
      })//than end
      .catch(function (error) {
        console.log(error);
      })
  }



  CityWeather = (cityName) => {
    let weatherObject = [...this.state.weather]
    console.log('city Name', cityName)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`, {
    }).then((response) => {
      console.log('Weather is', response.data.main.temp)
      weatherObject.cityTemp = response.data.main.temp
      console.log("description is", response.data.weather[0].description)
      weatherObject.tempDecription = response.data.weather[0].description

      console.log("icon", response.data.weather[0].icon)
      weatherObject.tempIcon = response.data.weather[0].icon

      this.setState({ weather: weatherObject })
      console.log('weather State', this.state.weather)
    })//than end
      .catch(function (error) {
        console.log(error);
      })
  }


  componentDidMount() {
    this.HotelCity()
  }


  render() {
    let AllHotels = this.state.hotels.map((value) => {
      return <HotelRow HotelRow={value} isfave={this.state.isFave} onFaveToggle={() => this.props.onFaveToggle(value)}
      />
    });

    let FaveHotels = this.props.fav.map((value) => {
      return <HotelRow HotelRow={value} isfave={this.state.isFave} onFaveToggle={() => this.props.onFaveToggle(value)}
      />
    });


    {

      return (
        <Router>
          <div className="">
            <div className="container">
              <img className="weather" src={require('./Img/weather.jpg')} />

              <div className="centered">
                <h1>{this.state.cityName}</h1>
                <h2>{this.state.weather.cityTemp + ' C'} </h2>
                <img className="TempIcon" src={`http://openweathermap.org/img/wn/${this.state.weather.tempIcon}@2x.png`} style={{ width: 30, height: 30 }} />
                <h4>{this.state.weather.tempDecription + ' '}</h4>
              </div>

            </div>
            <div className="Count">
              <div className="favHotel">
                <div onClick={(e) => { this.handleFilterClick('faves') }}>
                  <h3 >
                    <span className="">{this.props.fav.length + ' '}</span>
                      Favorite
                                        <button onClick={(e) => { this.props.DeletFave(e) }}>Delet All Favorites</button>

                  </h3>
                </div>

              </div>



              <div onClick={(e) => { this.handleFilterClick('all') }}>
                <h3>
                  <span className="section-count">{this.state.hotels.length + '  '}</span>

            Stays in{' ' + this.state.cityName}</h3> </div>

            </div>


          </div>
          {(this.state.filter === 'faves') ? FaveHotels : AllHotels}
        </Router >

      )
    }
  }
}

