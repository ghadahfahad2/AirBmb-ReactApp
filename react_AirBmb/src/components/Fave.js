import React, { Component } from 'react'
import { useAlert } from 'react-alert'

export default class Fave extends Component {
  // what should happen when the component is first created
  constructor(props) {
    // make call to parent class' (Component) constructor
    super(props)
    this.state = {
      //isFave: false // initialize this.state.isFave to be false
    };
  }
  handleClick(e) {
    console.log(' Fave click')
    // Add this line. You'll call the function passed through props
    this.props.onFaveToggle()
    alert('Saved to: My next trip')
  }

 
  render() {

    let isFve = (this.props.fav) ? 'remove' : 'add'
    return (

      <div>
                 
        <div className="" onClick={(e) => {
          this.handleClick(e)  
        }}>
          <img className="property-social-icons" src="https://img.icons8.com/ios-glyphs/30/000000/like--v1.png" onclick={isFve} />
        </div>
      </div>
    )
  }
}
