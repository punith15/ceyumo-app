import React from 'react'

const Carousel = ()=>{
    return(
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="image-overlay">
                    <img src="https://www.unitec.ac.nz/sites/default/files/public/Unitec_Website_1594x675_Photography.jpg?timestamp=1497842425" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-caption d-none d-md-block">
                    <h1 className="carousel-header">OUTDOOR PHOTOGRAPHY</h1>
                        <p>Outdoor Photography makes you more close to nature, wildlife, travel and adventure sports photography</p>
                        <button className="get-started">GET STARTED</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-overlay">
                    <img src="https://tridentcommunications.org/wp-content/uploads/2019/05/wedoweddings.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-caption d-none d-md-block"> 
                    <h1 className="carousel-header">EVENT MANAGEMENT</h1>
                        <p>Find the best Event Management companies which suits you the best in organising company,marriage,birthday, events etc.,</p>
                        <button className="get-started">GET STARTED</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="image-overlay">
                    <img src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/02/Indian-Wedding-Photographer-New-Zealand_0107.jpg" className="d-block w-100" alt="..."/>
                   </div>
                    <div className="carousel-caption d-none d-md-block">
                    <h1 className="carousel-header">WEDDING PLANNER</h1>
                        <p>Choose the best from over 1000+ Wedding planners to make your wedding a memorable and grand event</p>
                        <button className="get-started">GET STARTED</button>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel;