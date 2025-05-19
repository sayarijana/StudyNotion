import "./ContactFormSection.css";
import React from 'react';
import ContactUsForm from "../../common/ContactUsForm";


const ContactFormSection = () => {
  return (
    <div className="contactFormSec-6">
      <h1>Get in Touch</h1>
      <p>We’d love to here for you, Please fill out this form.</p>
      <div className="contactFormSec-6form">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
