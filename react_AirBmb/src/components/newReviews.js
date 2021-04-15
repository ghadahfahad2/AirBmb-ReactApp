import React, { Component } from 'react'

export default class NewReviews extends Component {
    //rconst
    constructor(props) {
        super(props)
        this.state = {
            edit: true,
            newComment: ''

        }
    }

    Edit = (e) => {
        e.preventDefault()
        console.log('Edit function')
        // User input 
        let previusInput = this.props.inputValue
        //previus comment 
        this.props.updit(previusInput, this.state.newComment)
        this.setState({ edit: !this.state.edit })
        console.log(this.props.inputValue)
        console.log('newwwwww', this.state.newComment)


    };
    render() {
        let allReviews = this.props.newReview.map((value) => {
            let test = { show: true }
            return <div className="elem">
                <div className="dialogbox">
                    <div className="body">
                        {(test.show) ?
                            <div><span>{value}
                                <button onClick=
                                    {(eve) => {
                                        eve.preventDefault()
                                        {test.show = !test.show}
                                        console.log(test.show)
                                    }}>Edit</button>
                            </span>
                            </div>
                            :
                            <form  >
                                <input
                                    type="text"
                                    placeholder="What is your question"
                                    onChange={(e) => {
                                        this.setState({ newComment: e.target.value })
                                    }}
                                />
                            </form>}
                        <button onClick={(e) => {
                            this.props.updit(this.props.inputValue, this.state.newComment)
                        }}>Save</button>


                    </div>


                </div></div>
        })
        return (

            <div id="scroller-wrapper">
                <div id="scroller">


                    {allReviews}

                </div>
            </div>
        )
    }
}
