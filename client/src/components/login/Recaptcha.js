import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

class Recaptcha extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <form>
                <ReCAPTCHA
                    sitekey= {process.env.SITE_KEY}
                    onChange={this.props.onCaptchaChange}
                />
                </form>
            </div>
        );
    }
}

export default Recaptcha;