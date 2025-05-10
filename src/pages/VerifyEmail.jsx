import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import "./VerifyEmail.css";
import { RxCountdownTimer } from 'react-icons/rx';

const VerifyEmail = () => {
    const {signupData, loading} = useSelector((state)=>state.auth);
    const [otp,setOtp]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[signupData, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {accountType, firstName, lastName, email, password, confirmPassword} = signupData
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp, navigate));
    }

  return (
    <div className="verify-email-container">
        {
            loading ? (
            <div className="verify-email-loading">
                <div className="spinner">loading...</div>
            </div>)
            : (
                <div className="verify-email-form-container">
                    <h1 className="verify-email-title">Verify Email</h1>
                    <p className="verify-email-subtitle">A verification code has been sent to you. Enter the code below</p>

                    <form className="otp-form" onSubmit={handleOnSubmit}>
                        <OTPInput 
                           value={otp}
                           onChange={setOtp}
                           numInputs={6}
                           renderInput = { (props)=> <input {...props} placeholder="-" className="otp-input"/>}
                           containerStyle={{
                            justifyContent:"center",
                            alignItems:"center",
                            gap: "10px",
                          }}
                        />

                        <button type='submit' className="verify-email-button">Verify Email</button>
                        
                    </form>

                    <div className="back-to-signup">
                        <div>
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>

                        <button className="resend-otp-button" onClick={()=>dispatch(sendOtp(signupData.email, navigate))}>
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>

                </div>

            )
        }
      
    </div>
  )
}

export default VerifyEmail
