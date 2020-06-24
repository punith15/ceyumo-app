import React, {useEffect} from 'react'
import Carousel from './home/Carousel'
import HomeContent from './home/HomeContent'
import $ from 'jquery';
import slick from 'slick-carousel'; 


const Home = ()=>{
    useEffect(()=>{
        ImagesCarousel.start();
    })

    return(
        <div>
        <Carousel/>
        <HomeContent/>
        </div>
    )
}

const ImagesCarousel= {
    start() {
        $('.our-services').slick({
            dots: true,
            speed: 500,
            // normal options...
            infinite: false,
          
            // the magic
            responsive: [{
          
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  infinite: true
                }
          
              }, {
          
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  dots: true
                }
          
              }, {
          
                breakpoint: 300,
                settings: "unslick" // destroys slick
              }]
            });
    }
  };

export default Home;