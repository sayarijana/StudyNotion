import Footer from "../components/common/Footer";
import "./ContactUs.css";
import React from 'react';
import ReviewSlider from "../components/common/ReviewSlider";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";


const ContactUs = () => {
  return (
    <div className="contactUsCont">

        <div className="ContactUs-top-section">
            <div className="ContactUs-details">
                <ContactDetails />
            </div>
            <div className="ContactUs-form">
                <ContactForm />
            </div>
        </div>
        
   
        <div className="ContactUs-review-section">
            <h1 className="ContactUs-review-heading">Reviews from other learners</h1>
            <ReviewSlider />
        </div>


        <Footer />
    
    </div>
  )
}

export default ContactUs
