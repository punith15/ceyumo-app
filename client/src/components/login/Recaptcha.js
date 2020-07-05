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
                    sitekey="6LdLuK0ZAAAAAGX3ckKW3XcDXYoXbOpoCe5BNTVF"
                    onChange={this.props.onCaptchaChange}
                />
                </form>
            </div>
        );
    }
}

export default Recaptcha;