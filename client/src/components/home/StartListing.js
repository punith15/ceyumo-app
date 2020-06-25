import React from 'react'
import {Link} from 'react-router-dom'

const StartListing = props=>{

    return(
        <div className="listing">
            <div className="start-listing">
                <div className="listing-content">
                    <h1>Start Listing Your Business</h1>
                    <Link to="/loginform/vendor">
                        <button className="listing-btn">START</button>
                    </Link>
                </div>
                <div className="listing-content start-listing-price">
                    <h4>Just @</h4>
                    <h1>499/-</h1>
                    <h4>Per Month</h4>
                </div>
            </div>
        </div>
    )
}

export default StartListing;