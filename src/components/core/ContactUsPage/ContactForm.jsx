import React from 'react'
import ContactUsForm from '../../common/ContactUsForm';
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="ContactForm-container">
        <h1 className="ContactForm-heading">Got a Idea? We&apos;ve got the skills. Let&apos;s team up</h1>
        <p className="ContactForm-paragraph">Tell us more about yourself and what you&apos;re got in mind.</p>
        <div className="ContactForm-form">
            <ContactUsForm />
        </div>
      
    </div>
  )
}

export default ContactForm
