import { studentEndpoints } from "../api";
import {toast} from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;


export async function buyCourse(token, courses, navigate, dispatch) {
    const toastId = toast.loading("Processing purchase...");

    try {
        // Call course purchase API (mock implementation)
        const response = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log("MOCK ORDER RESPONSE", response);

        // Send payment success email without Razorpay details
        sendPaymentSuccessEmail(response.data.totalAmount, token);

        // Directly verify the payment without Razorpay-related data
        verifyPayment({ courses }, token, navigate, dispatch);

        toast.success("Mock purchase successful! Course enrolled.");
    } catch (error) {
        console.log("MOCK PAYMENT ERROR", error);
        toast.error("Could not process the mock purchase.");
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{

        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
