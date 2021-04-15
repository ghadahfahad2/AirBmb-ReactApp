import React, { Component } from 'react'
import NewReviews from './NewReviews';
export default class AboutMe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Reviews: []
            , reviewInput: '',
            newComment: ''


        }
        this.save = this.save.bind()
    }
    //add new Reviews
    addReviews = (newReviews) => {
        const copyReviews = this.state.Reviews;
        copyReviews.push(newReviews);
        this.setState({ Reviews: copyReviews });
        console.log(this.state.Reviews)
    };
    //add new user review
    addNew = (e) => {
        e.preventDefault();
        this.addReviews(this.state.reviewInput);

    };

    save = (inputValue, newValue, e) => {
        e.preventDefault()
        //Index Of the pre innput --update that index into new text
        //Index
        console.log('new Value', newValue)
        let Index = this.state.Reviews.indexOf(inputValue)
        console.log("Index Of prev comment", Index)
        let copy = [...this.state.Reviews]
        console.log("copy array", copy)
        //comment update it
        copy[Index] = newValue
        this.setState({ Reviews: copy })
        console.log(copy)
        console.log('revi state', this.state.Reviews)
    }
   

    render() {

        return (

            <div>
                <img className='hotelImage' src={require('./Img/home.jpg')} />
                <div className="centered">
                    <div className="welcome">
                        <h1 >Get to know Airbmb</h1>
                        <h3> Welcome to the Airbmb travel community. Wherever you go, we have a place for you!</h3>
                    </div>
                </div>



                <div className="hotel_logos">
                    <img src={require('./Img/AirBmb2.jpg')} />
                    <h1>One-of-a-kind experiences</h1>
                    <p>Airbnb Experiences are not your typical tour. Whether you’re on a trip, exploring your own city, or staying at home, learn something new from an expert host. Choose from dance lessons, pasta making – even yoga with goats.</p>
                </div>
                <div className="hotel_logos">
                    <img src={require('./Img/airBmb.jpg')} />
                    <h1>A place to stay for every trip</h1>
                    <p>Whether you’re looking for a treehouse for the weekend or an entire home for the whole family, a warm welcome awaits. Behind every stay is a real person who can give you the details you need to check in and feel at home</p>
                </div>


                <table className="hotel_logos">
                    <h1>Simple steps to get started</h1>

                    <tr>
                        <td> <img src={require('./Img/air1.jpg')} /></td>
                        <td><img src={require('./Img/air2.jpg')} /></td>
                        <td><img src={require('./Img/air3.jpg')} /> </td>
                        <td><img src={require('./Img/air4.jpg')} /></td>
                    </tr>
                    <tr>
                        <td><h5>Dig into the details</h5></td>
                        <td><h5>Dig into the details</h5></td>
                        <td><h5>Book with peace of mind</h5></td>
                        <td><h5>Arrive and enjoy!</h5></td>

                    </tr>

                    <tr><td> <p>Personalise your search with filters – like price range or a pool – to get exactly what you want.</p></td>


                        <td> <p>Check out the photos. Then, read guest reviews from past reservations to learn what it’s like in person.</p></td>


                        <td> <p>We keep your info safe and follow global security standards to process your payments.</p></td>


                        <td><p>Your host is only a message away if you have any questions. They can also offer local tips and advice..</p></td>
                    </tr>


                </table>



                <div className="comment">
                    <h3>Got a question?</h3>

                    <form  >
                        <input
                            type="text"
                            placeholder="What is your question"
                            onChange={(e) => {
                                this.setState({ reviewInput: e.target.value });
                            }}
                        />

                        <button onClick={this.addNew}>Submit</button>

                        <NewReviews newReview={this.state.Reviews} updit={this.save} inputValue={this.state.reviewInput} />

                    </form>

                </div>

            </div>





        )
    }
}
