import React from 'react';
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";
import "./ContactDetails.css";

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
]

const ContactDetails = () => {
  return (
    <div className="ContactDetails-container">
        {
            contactDetails.map((ele,i)=>{
                let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
                return (
                    <div className="ContactDetails-item" key={i}>
                        <div  className="ContactDetails-header">
                            <Icon size={25}/>
                            <h1 className="ContactDetails-heading">{ele?.heading}</h1>
                        </div>
                        <p className="ContactDetails-description">{ele?.description}</p>
                        <p className="ContactDetails-details">{ele.details}</p>
                    </div>
                )
            })
        }
      
    </div>
  )
}

export default ContactDetails
