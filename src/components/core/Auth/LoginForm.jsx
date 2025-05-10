import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../../../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./LoginForm.css"


function LoginForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(
        {
            email:"",
            password:""
        }
    )

    const [showPassword, setShowPassword] = useState(false);
    const {email, password} = formData;

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(email,password,navigate))
    }

    const handleOnChange = (e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    return (
        <form className="formdata" onSubmit={handleOnSubmit}>
            <label className="labelcont" >
                <p className="labeltext">Email Address <sup  className="required">*</sup></p>
                <input type="text" name="email" value={email}
                    required  placeholder="Enter email address"
                    onChange={handleOnChange} className="inputfield"
                />
            </label>
            <label className="labelcont relative" >
                <p>Password <sup>*</sup></p>
                <input type={showPassword ? "text" : "password"}
                   name="password" value={password} onChange={handleOnChange}
                   required placeholder="Enter Password"
                />
                <span onClick={()=> setShowPassword((prev)=>!prev)} className="icondiv">
                    {
                        showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                        )
                    }
                </span>

                <Link to="/forgot-password">
                    <p className="forgetpassword">Forgot Password</p>
                </Link>

            </label>

            <button type="submit" className="loginBtn">Log In</button>
        </form>
    )
}

export default LoginForm