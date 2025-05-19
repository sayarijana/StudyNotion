import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi";
import "./UpdatePassword.css";



const UpdatePassword = () => {
    const [formData,setFormData] = useState(
        {
            password:"",
            confirmPassword:"",
        }
    )
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const {password, confirmPassword}=formData;
    const location=useLocation();
    const navigate = useNavigate();

    const handleOnChange = (e)=>{
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));

    }


  return (
    <div className="update-password-container">
        {
            loading ? (
                <div className="spinner">loading...</div>
            ):(
                <div className="update-password-form">
                    <h1 className="update-password-header">Choose new password</h1>
                    <p className="update-password-description">Almost done. Enter your new password and youre all set.</p>

                    <form onSubmit={handleOnSubmit}>
                        <label className="update-password-label">
                            <p>New password <sup className="text-pink-200s">*</sup></p>
                            <input required type={showPassword ? "text" : "password"} name="password"
                            placeholder="Enter Password"
                            value={password} onChange={handleOnChange}  className="update-password-input" />
                            <span onClick={() => setShowPassword( (prev)=> !prev) } className="update-password-eye-icon">
                                {
                                    showPassword ? <AiOutlineEyeInvisible fontSize={24}/> : <AiOutlineEye fontSize={24}/>
                                }
                            </span>
                        </label>

                        <label className="update-password-label">
                            <p>Confirm new passsword <sup className="text-pink-200s">*</sup></p>
                            <input required type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                            value={confirmPassword} onChange={handleOnChange}  
                            placeholder="Confirm Password" className="update-password-input"/>

                            <span className="update-password-eye-icon2" onClick={()=>setShowConfirmPassword((prev)=>!prev)} >
                                {
                                    showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24}/> : <AiOutlineEye fontSize={24}/>
                                }
                            </span>
                        </label>

                        <button type='submit' className="update-password-submit-btn">Reset Password</button>
                    </form>


                    <div className="update-password-back-link">
                        <Link to="/login">
                            <p>Back to Login</p>
                            <BiArrowBack size={19}/>
                        </Link>
                    </div>
                </div>
            )
        }
      
    </div>
  )
}

export default UpdatePassword
