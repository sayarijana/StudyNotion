import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { resetCart } from "../../slices/cartSlice";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response =await apiConnector("POST", SENDOTP_API,{
                email,
                checkUserPresent: true
            })

            console.log("SENDOTP API RESPONSE............", response);

            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
        }catch(error){
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            });
            console.log("SIGNUP API RESPONSE............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate("/login");
        }catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function login(email, password, navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
    
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.existUser?.image
            ? response.data.existUser.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existUser.firstName}%20s${response.data.existUser.lastName}`

            dispatch(setUser({...response.data.existUser, image: userImage}));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.existUser));
            navigate("/dashboard/my-profile");
    
        }catch(error){
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}



export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}


export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const  response = await apiConnector("POST", RESETPASSTOKEN_API , {email});
            console.log("Reset Password", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);

        }catch(error){
            console.log("Reset poassword token error");
            toast.error("Failed to send reset email");
        }

        dispatch(setLoading(false));
    }
}


export function resetPassword(password,confirmPassword, token,navigate){

    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            // console.log("pass: ",password);
            const response = await apiConnector("POST", RESETPASSWORD_API,{password, confirmPassword, token});

            console.log("Reset password response",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
            navigate("/login");

        }catch(error){
            console.log("Resetpoassword error : ",error);
            toast.error("Unable to reset password");           

        }
        dispatch(setLoading(false));
    }
}
