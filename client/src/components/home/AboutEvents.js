import React from 'react'

const AboutEvents = ()=>{
    return(
        <>
        <div className="about-events">
            <h2>Enjoy every moment of your memorable events</h2>
            <p>Yes dont worry about making your events special, we take care of it !!!</p>
            <p>Yes you heard it right....</p>
            <p>Choose from the best service providers for your events and you can enjoy each and every
                moment to cherish in your life without any management tensions.
            </p>
        </div>
        <div className="why-us container home-view">
            <h1 className="welcome"><span>Why Us</span></h1>
            <div className="whyus-block">
                <div className="row">
                    <div className="col-md-6 whyus-item">
                        <span><i className="fa fa-handshake-o"></i></span>
                        <div>
                        <h4>Best Service</h4>
                        <p>We provide the best and world className services and give the best satisfaction
                            towards our customers.
                        </p>
                        </div>
                    </div>
                    <div className="col-md-6 whyus-item">
                        <span><i className="fa fa-phone"></i></span>
                        <div>
                        <h4>24/7 On Call Support</h4>
                        <p>We provide 24/7 on call support to all our customers once they book any service 
                            from our portal.
                        </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-6 whyus-item">
                        <span><i className="fa fa-users"></i></span>
                        <div>
                        <h4>1000+ Service providers</h4>
                        <p>With 1000+ service providers our customers get opportunity to choose from the
                            best and with different style of providers.
                        </p>
                        </div>
                    </div>
                    <div className="col-md-6 whyus-item">
                        <span><i className="fa fa-thumbs-up"></i></span>
                        <div>
                        <h4>100% Customer satisfication</h4>
                        <p>All our customers who choose services from us get 100% satisfication and support
                            till the even gets completed.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutEvents;