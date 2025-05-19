import { useForm } from "react-hook-form";
import "./ContactUsForm.css";
import React, { useEffect, useState } from 'react';
import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/api";


const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();


    const submitContactForm = async(data)=>{
        console.log("Logging data ",data);
        try{
            setLoading(true);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            console.log("Email Res - ", res);
            setLoading(false);

        }catch(error){
            console.log("Error : ",error);
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    },[isSubmitSuccessful, reset]);


  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="sec-6FormC">
        <div className="sec-6NameCont">
            <div className="sec-6Formele">
                <label htmlFor="firstname">First Name</label>
                <input type="text" name="firstname"
                id="firstname" placeholder="Enter first name"
                {...register("firstname", {required:true})}

                />
                {
                    errors.firstname && (
                        <span>
                            Please enter your name
                        </span>
                    )
                }
            </div>

            <div className="sec-6Formele">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" name="lastname"
                id="lastname" placeholder="Enter last name"
                {...register("lastname")}

                />
               
            </div>
        </div>

        <div className="sec-6Formele">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email"
            placeholder="Enter email address" 
            {...register("email",{required:true})}
            />
            {
                errors.email && (
                    <span>Please enter your email address</span>
                )
            }
        </div>

        <div className="sec-6Formele">
            <label htmlFor="phoneNo">Phone Number</label>
            <div className="sec-6NameCont phsec">
            <select name="dropdown" id="dropdown"
                className="sec-6dropdown"
                {...register("countrycode",{required:true})}
            >
                {
                    CountryCode.map((element,index)=>(
                        <option value={element.code} key={index} >    
                            {element.code}  -  {element.country}
                        </option>
                    ))

                }
            </select>


            <input type="ph" name="phoneNo" id="phoneNo"
                className="sec-6ph"
                placeholder="12345 67890" 
                {...register("phoneNo",
                    {
                        required:{value:true, message:"Please enter phone number"}, 
                        maxLength:{value:10, message:"Invalid Phone Number"} 
                    })}
            />

                
            </div>

            {
                errors.phoneNo && (
                    <span>{errors.phoneNo.message}</span>
                )
            }

        </div>

        <div className="sec-6Formele">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message"
            cols={30} rows={7}
            placeholder="Enter your message here"
            {...register("message",{required:true})}
            ></textarea>
            {
                errors.message && (
                    <span>Please enter your message.</span>
                )
            }
        </div>

        <button type='submit' className="contactBtnSec-6">Send Message</button>


    </form>
  )
}

export default ContactUsForm
