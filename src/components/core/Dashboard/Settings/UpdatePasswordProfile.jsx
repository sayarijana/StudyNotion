import { useSelector } from "react-redux";
import "./UpdatePasswordProfile.css";
import React from 'react'
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../../services/operations/SettingsAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconBtnComm from "../../../common/IconBtnComm";
import { useState } from "react";

const UpdatePasswordProfile = () => {
    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitPasswordForm = async (data) => {
        try{
            await changePassword(token, data);
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message);
        }
    } 


  return (
    <div  className="update-password-formDiv">
        <form onSubmit={handleSubmit(submitPasswordForm)} className="update-password-form" >
            <div>
                <h2 className="update-password-title">Password</h2>
                <div className="update-password-input-group">
                   <div className="update-password-input-container">
                        <label htmlFor="oldPassword" className="update-password-label">Current Password</label>
                        <input type={showOldPassword ? "text" : "password"} 
                            className="update-password-input"
                            name="oldPassword" id="oldPassword"
                            placeholder="Enter Current Password"
                            {...register("oldPassword", { required: true })}
                        />
                        <span className="update-password-toggle" onClick={() => setShowOldPassword((prev) => !prev)}>
                            {
                                showOldPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> 
                                ) :(
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )
                            }
                        </span>

                        {
                            errors.oldPassword && (
                                <span className="update-password-error">Please enter your Current Password.</span>
                            )
                        }
                    </div>

                    <div className="update-password-input-container">
                        <label htmlFor="newPassword" className="update-password-label">New Password</label>
                        <input type={showNewPassword ? "text" : "password"} 
                            name="newPassword"  id="newPassword"
                            className="update-password-input"
                            placeholder="Enter New Password"
                            {...register("newPassword", { required: true })}
                        />
                        <span className="update-password-toggle" onClick={() => setShowNewPassword((prev) => !prev)}>
                            {
                                showNewPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )
                            }
                        </span>

                        {
                            errors.newPassword && (
                                <span className="update-password-error">Please enter your New Password.</span>
                            )
                        }
                    </div>

                </div>
            </div>

            <div className="update-password-action-buttons">
                <button className="update-password-cancel" onClick={()=>{navigate("/dashboard/my-profile")}}>
                    Cancel
                </button>

                <IconBtnComm type= "submit" text="Update" />
            </div>
        </form>
    </div>
  )
}

export default UpdatePasswordProfile
