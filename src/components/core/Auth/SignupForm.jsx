import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {sendOtp} from "../../../services/operations/authAPI"
import {setSignupData} from "../../../slices/authSlice"
import {ACCOUNT_TYPE} from "../../../utils/constants"
import Tab from "../../common/Tab";
import "./SignupForm.css"

function SignupForm(){
    const navigate = useNavigate();
    const dispatch=useDispatch();

     // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData,setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {firstName, lastName, email, password, confirmPassword} = formData;

    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData));
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));

        //reset
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    //data to pass to tab component
    const tabData = [
        {
            id:1,
            tabName:"Student",
            type: ACCOUNT_TYPE.STUDENT
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR
        }

    ]


    return (
        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

            <form onSubmit={handleOnSubmit} className="form-container">
                <div className="form-row">
                    <label className="labelcont">
                        <p>First Name <sup>*</sup></p>
                        <input required type="text" name="firstName"
                            value={firstName} onChange={handleOnChange}
                            placeholder="Enter first name"
                        />
                    </label>

                    <label className="labelcont">
                        <p>Last Name <sup>*</sup></p>
                        <input required type="text" name="lastName"
                            value={lastName} onChange={handleOnChange}
                            placeholder="Enter last name"
                        />
                    </label>
                </div>

                <label className="labelcont">
                    <p>Email Address <sup>*</sup></p>
                    <input required type="text" name="email"
                        value={email} onChange={handleOnChange}
                        placeholder="Enter email address"
                    />
                </label>

                <div className="form-row">
                    <label className="labelcont">
                        <p>Create Password <sup>*</sup></p>
                        <input required type={showPassword ? "text" : "password"} 
                            name="password" value={password} onChange={handleOnChange}
                            placeholder="Enter Password"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}
                            className="password-icon1" 
                        >
                            {
                                showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                )
                            }
                        </span>
                    </label>

                    <label className="labelcont">
                        <p>Confirm Password <sup>*</sup></p>
                        <input required type={showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword" value={confirmPassword} onChange={handleOnChange}
                            placeholder="Confirm Password"
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} 
                            className="password-icon2" 
                        >
                            {
                                showConfirmPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                                )
                            }
                        </span>
                    </label>

                </div>

                <button type="submit" className="submit-btn">
                    Create Account
                </button>

            </form>
        </div>
    )

}

export default SignupForm