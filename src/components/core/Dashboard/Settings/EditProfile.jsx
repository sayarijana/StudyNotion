import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import IconBtnComm from "../../../common/IconBtnComm";


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState :{errors, }
    } = useForm();

    const submitProfileForm = async(data) => {
        try{
            dispatch(updateProfile(token, data));
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message);
        }
    }


  return (
    <>
        <form onSubmit={handleSubmit(submitProfileForm)}
          className="editprofile-form"
        >
            <div className="editprofile-section">
                <h2 className="editprofile-section-title">Profile Information</h2>
                <div className="editprofile-input-group-cont" >
                    <div className="editprofile-input-group">
                        <label className="editprofile-label" htmlFor="firstName">First Name</label>
                        <input className="editprofile-input" type="text" name="firstName" id="firstName"
                            placeholder="Enter first name" {...register("firstName",{required:true})}
                            defaultValue={user?.firstName}
                        />

                        {
                            errors.firstName && (
                                <span className="editprofile-error">Please enter your first name.</span>
                            )
                        }
                    </div>

                    <div className="editprofile-input-group">
                        <label className="editprofile-label" htmlFor="lastName">Last Name</label>
                        <input className="editprofile-input" type="text" name="lastName" id="lastName" 
                            placeholder="Enter last name" {...register("lastName",{required:true})}
                            defaultValue={user?.lastName}
                        />

                        {
                            errors.lastName && (
                                <span className="editprofile-error">Please enter your last name.</span>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="editprofile-input-group-cont" >
                <div className="editprofile-input-group">
                    <label className="editprofile-label" htmlFor="dob">Date of Birth</label>
                    <input className="editprofile-input" type="date" name="dob" id="dob"
                       {...register("dob", {
                        required:{
                            value:true,
                            message: "Please enter your Date of Birth."
                        },
                        max:{
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future.",
                        }
                       })}
                       defaultValue={user?.additionalDetails?.dob}
                    />
                    {
                        errors.dob && (
                            <span className="editprofile-error">{errors.dob.message}</span>
                        )
                    }
                </div>

                <div className="editprofile-input-group">
                    <label className="editprofile-label" htmlFor="gender">Gender</label>
                    <select className="editprofile-select" type="text" name="gender" id="gender"
                       {...register("gender", { required: true })}
                       defaultValue={user?.additionalDetails?.gender}
                    >
                    {
                        genders.map((ele,i)=>(
                            <option value={ele} key={i}>{ele}</option>
                        ))
                    }
                    </select>

                    {
                        errors.gender && (
                            <span className="editprofile-error">Please enter your Date of Birth.</span>
                        )
                    }
                </div>
            </div>

            <div className="editprofile-input-group-cont">
                <div className="editprofile-input-group">
                    <label className="editprofile-label" htmlFor="contactNumber">Contact Number</label>
                    <input className="editprofile-input" type="tel" name="contactNumber" id="contactNumber"
                       placeholder="Enter Contact Number"
                       {...register("contactNumber",{
                        required:{
                            value: true,
                            message: "Please enter your Contact Number."
                        },
                        maxLength: {value:12, message: "Invalid Contact Number" },
                        minLength :{value:10,  message: "Invalid Contact Number" }
                       })}
                       defaultValue={user?.additionalDetails?.contactNumber} 
                    />

                    {
                        errors.contactNumber && (
                            <span className="editprofile-error">{errors.contactNumber.message}</span>
                        )
                    }
                </div>
                
                <div className="editprofile-input-group">
                    <label className="editprofile-label" htmlFor="about">About</label>
                    <input className="editprofile-input" type="text" name="about" id="about" 
                       placeholder="Enter Bio Details" 
                       {...register("about", { required: true })}
                       defaultValue={user?.additionalDetails?.about}
                    />

                    {
                        errors.about && (
                            <span className="editprofile-error">Please enter your About.</span>
                        )
                    }
                </div>
            </div>

            <div className="editprofile-buttons">
                <button className="editprofile-cancel-btn"
                onClick={()=>{
                    navigate("/dashboard/my-profile")
                }}>
                    Cancel
                </button>
                <IconBtnComm text="Save" type="submit"/>
            </div>

        </form>
    </>
  )
}

export default EditProfile
