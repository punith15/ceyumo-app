import React from 'react'
import Ratings from '../partials/Ratings'

const CustomerSpeak = ()=>{
    return(
        <div className="container home-view">
        <h1 className="welcome"><span>Customer Reviews</span></h1>
        <div className="review">
        <span><i className="fa fa-star"></i></span>
        <span><i className="fa fa-star"></i></span>
        <span><i className="fa fa-star"></i></span>
        <span><i className="fa fa-star"></i></span>
        <span><i className="fa fa-star"></i></span>
        </div>
        <div data-slick='{"slidesToShow": 3, "slidesToScroll": 1}' className="our-services">
            <div className="cust-review-item">
                <p>Super work done by the team ...i love they work and team coordination ....if any Event u can choose the people... Nice work... They have done for my Event </p>
                <div className="review-cust-data">
                    <img src="https://static.billygraham.org/sites/billygraham.org/uploads/pro/2019/10/CollegeStudent_IntEvang-feature.jpg" alt="review"/>
                    <div className="review-cust-main">
                    <p style={{fontWeight:'bold'}}>Priyanka</p>
                    <Ratings/>
                    </div>
                </div>
            </div>
            <div className="cust-review-item">
                <p>Keep up the good work bala and team. The Event Setup was outstanding and our event went very smoothly.</p>
                <div className="review-cust-data">
                    <img src="https://s3-us-west-2.amazonaws.com/asset.plexuss.com/news/images/successful-college-student-lg.png" alt="review"/>
                    <div className="review-cust-main">
                    <p style={{fontWeight:'bold'}}>Johnson</p>
                    <Ratings/>
                    </div>
                </div>
            </div>
            <div className="cust-review-item">
                <p>If you are searching an event company for your special day. You can trust them blindly. They will make your special day memorable. I am highly satisfied with their work.</p>
                <div className="review-cust-data">
                    <img src="https://news.usc.edu/files/2015/09/college-student.jpg" alt="review"/>
                    <div className="review-cust-main">
                    <p style={{fontWeight:'bold'}}>Muhhamad Ali</p>
                    <Ratings/>
                    </div>
                </div>
            </div>
            <div className="cust-review-item">
                <p>Super work done by the team ...i love they work and team coordination ....if any Event u can choose the people... Nice work... They have done for my Event </p>
                <div className="review-cust-data">
                    <img src="https://5160931f8b7ffecd4b66-a9076b1c3525c9c78c3554d903ab3617.ssl.cf5.rackcdn.com/Funding-Your-Education-StudyUSAblog.jpg" alt="review"/>
                    <div className="review-cust-main">
                    <p style={{fontWeight:'bold'}}>Juliana</p>
                    <Ratings/>
                    </div>
                </div>
            </div>
            <div className="cust-review-item">
                <p>Super work done by the team ...i love they work and team coordination ....if any Event u can choose the people... Nice work... They have done for my Event </p>
                <div className="review-cust-data">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2Zff74-JrsMm4gTO34T1IxIKF9rUxCTxA2BpFUiRTThxDJoIX&usqp=CAU" alt="review"/>
                    <div className="review-cust-main">
                    <p style={{fontWeight:'bold'}}>Geetha</p>
                    <Ratings/>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default CustomerSpeak;