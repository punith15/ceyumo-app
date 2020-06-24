import React from 'react'
import './ViewServiceGallery.css'

class ViewServiceGallery extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            images : []
        }
        this.displayModel = this.displayModel.bind(this)
    }

    componentDidMount(){
        this.setState({
            images : this.props.images
        })
    }

    displayModel = function(e){
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");

        console.log(e.target)
        modal.style.display = "block";
        modalImg.src = e.target.src;

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
        modal.style.display = "none";
        }
    }

    render(){
        return(
            <div>
                <div className="row view-image-gallery">
                    {this.props.images.map((image,i)=>{
                        return <div className="col-md-4" key={i}>
                            <img id={i} onClick={this.displayModel} src={image} alt="Snow" 
                            style={{height:'170px',width:'100%',cursor:'pointer'}} />
                        </div>
                     })
                    } 
                </div>
                    
                <div id="myModal" className="modal-img">
                    <span className="close">&times;</span>
                    <img className="modal-content-img" id="img01"/>
                </div>
            </div>
        )
    }

}

export default ViewServiceGallery;