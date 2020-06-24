import React from 'react'
import ViewServiceGallery from './ViewServiceGallery'
import BookNow from './BookNow'

class ViewServiceContent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            service : props.servObj || JSON.parse(sessionStorage.getItem('viewService')),
            loading : true
        }
        this.openService = this.openService.bind(this)
        console.log(this.state.service)
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            loading : false
        })
        
    }

    openService = (evt)=> {
        evt.preventDefault()
        console.log('clicked')
        let serviceName = evt.target.value
        console.log(serviceName)
        let i, x, tablinks;
        x = document.querySelectorAll(".service");
        console.log(x[0])
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }
        document.getElementById(serviceName).style.display = "block";
        evt.currentTarget.className += " w3-red";
    }

    render(){
        return(
            <div>
                <div className="w3-bar w3-black">
                    <button className="w3-bar-item w3-button tablink w3-red" value="Gallery" onClick={this.openService}>Gallery</button>
                    <button className="w3-bar-item w3-button tablink" value="Book-Now" onClick={this.openService}>Book Now</button>
                </div>

                {!this.state.loading ? <div>
                    <div id="Gallery" className="w3-container w3-border service">
                        <h2>Testimonials</h2>
                        <ViewServiceGallery images={this.state.service.gallery} />
                    </div>

                    <div id="Book-Now" className="w3-container w3-border service" style={{display:'none'}}>
                        <h2>Book Your Event</h2>
                        <BookNow service={this.state.service}/>
                    </div>
                </div> : <h3>Loading....</h3>}

            </div>
        )
    }
}

export default ViewServiceContent;