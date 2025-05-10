import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import "./ForgotPassword.css"


const ForgotPassword = () => {

    const {loading} = useSelector((state)=>state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail]=useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }


  return (
    <div className='forgot-password-container'>

        {
            loading ? (
                <div className='loading-spinner'>loading...</div>
            ) :(
                <div className='forgot-password-box'>
                    <h1 className='forgot-password-title'>
                        {
                            !emailSent ? "Reset Your Password" : "Check Email"
                        }
                    </h1>
                    <p className='forgot-password-text'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery."
                            :`We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label className='forgot-password-label'>
                                    <p>Email Address <sup className='star-pink'>*</sup></p>
                                    <input type="email" required placeholder='myemailaddress@gmail.com' 
                                       name='email' value={email} onChange={(e)=> setEmail(e.target.value)}
                                       className='forgot-password-input'
                                    />
                                </label>
                            )
                        }

                        <button type='submit' className='forgot-password-button'>
                            {
                                !emailSent ? "Reset Password" : "Rsend Email"
                            }
                        </button>
                    </form>

                    <div className='back-to-login'>
                        <Link to="/login">
                           <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
        
      
    </div>
  )
}

export default ForgotPassword
