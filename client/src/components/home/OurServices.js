import React from 'react'
import 'slick-carousel'

const OurServices = ()=>{
    return(
        <div className="container home-view">
        <h1 className="welcome"><span>Services</span></h1>
        <div data-slick='{"slidesToShow": 3, "slidesToScroll": 1}' className="our-services">
            <div className="our-services-item">
                <img src="https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/30958/article_full%401x.jpg" alt="photography"/>
                <p>Photography</p>
            </div>
            <div className="our-services-item">
                <img src="https://1.bp.blogspot.com/-HH8FxwH-ILM/V_SrZBfALsI/AAAAAAAAAFc/nmoVhh5gu9ERvVQvT431-5vJshKyrpksQCLcB/s1600/volvo-bus.jpg" alt="travels"/>
                <p>Travels</p>
            </div>
            <div className="our-services-item">
                <img src="https://www.weddingwishlist.com/wedding-board/wp-content/uploads/2019/01/Wedding-Planners-in-Kolkata-1024x538.jpg" alt="wedding planner"/>
                <p>Wedding Planner</p>
            </div>
            <div className="our-services-item">
                <img src="https://img2.exportersindia.com/product_images/bc-full/dir_112/3337994/corporate-event-management-1481628376-2637076.jpeg" alt="event management"/>
                <p>Event Management</p>
            </div>
            <div className="our-services-item">
                <img src="https://digitalmarketingdeal.com/blog/wp-content/uploads/2018/05/Catering-license-in-Dubai.jpg" alt="catering services"/>
                <p>Catering Services</p>
            </div>
            <div className="our-services-item">
                <img src="https://evibe.in/blog/wp-content/uploads/2017/09/decoration-1.jpg" alt="Stage Decorations"/>
                <p>Stage Decorations</p>
            </div>
            <div className="our-services-item">
                <img src="https://www.southindiafashion.com/wp-content/uploads/2019/08/south-indian-bridal-makeup-artists.jpg" alt="Makeup Artist"/>
                <p>Makeup Artists</p>
            </div>
        </div>
        </div>
    )
}

export default OurServices;