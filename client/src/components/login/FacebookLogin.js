import React, { Component } from 'react';
import Facebook from 'react-facebook-login'

class FacebookLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn : false
        }
        this.responseFacebook = this.responseFacebook.bind(this)
        this.compoundClicked = this.compoundClicked.bind(this)
    }


    responseFacebook = (response) => {
        console.log(response);
    }

    compoundClicked = (e)=>{
        e.preventDefault()
    }

    render() {
        let fbContent;

        if(this.state.isLoggedIn){
            fbContent = null
        }else{
            fbContent = (
                <Facebook
                appId="271641557495833"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            )
        }
        return (
            <div className="facebook-login">
                {fbContent}
            </div>
        );
    }
}

export default FacebookLogin;