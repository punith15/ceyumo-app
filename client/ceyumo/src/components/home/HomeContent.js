import React from 'react'
import OurServices from './OurServices'
import AboutEvents from './AboutEvents'
import CustomerSpeak from './CustomerSpeak'

const HomeContent = ()=>{
    return(
        <>
        <div className="container home-view">
            <h1 className="welcome"><span>Welcome to CEYUMO</span></h1>
            <div className="row home-content"> 
                <div className="col-md-6 event-image">
                    <img src="https://vantage.ie/uploads/image-1539007957-10997.jpg"/>
                </div>
                <div className="col-md-6 col-sm-1 home-block-1" style={{textAlign:'center'}}>
                    <h2>Choose from the best Event Managers</h2>
                    <p>We take the responsibility of making your dream a reality!. We provide a platform to choose the
                        the best photographers,event managers, wedding planners, travel agencies, catering services and more.
                        Come, Join, Explore....
                    </p>
                </div>
            </div>
        </div>
        <div className="marged">
            <h1>Nerver Miss The Special Moments!</h1>
            <button>BOOK NOW</button>
        </div>

        <OurServices/>
        <AboutEvents/>
        <CustomerSpeak/>
        </>
    )
}

export default HomeContent;