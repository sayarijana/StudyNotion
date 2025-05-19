import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from '../../../slices/cartSlice';
import "./CourseDetailsCard.css";
import { BsFillCaretRightFill } from "react-icons/bs";

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} =useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
        // _id: courseId,
    } = course;

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor. You can't buy a course.")
            return;
        }
        if (token) {
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }
    const handleShare = ( ) => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

  return (
    <div>

        <div className="CourseDetailsCard-container">
            <img src={ThumbnailImage} alt={course?.title} className="CourseDetailsCard-image"/>

            <div className="CourseDetailsCard-content">
                <div className="CourseDetailsCard-price">Rs. {CurrentPrice}</div>
                <div className="CourseDetailsCard-buttons">
                    <button className="yellowButton"
                       onClick={
                           user && course?.studentEnrolled.includes(user?._id)
                           ? ()=> navigate("/dashboard/enrolled-courses")
                           : handleBuyCourse
                        }
                    >
                        {
                            user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                        }
                    </button>

                    {
                        (!user || !course?.studentEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="BlackButton">Add to Cart</button>
                        )
                    }

                </div>

                <div className="CourseDetailsCard-guarantee">
                    <p>30-Day Money-Back Guarantee</p>
                </div>

                <div className="CourseDetailsCard-includes">
                    <p>This Course Includes :</p>
                    <div className="CourseDetailsCard-instructions">
                        {
                            course?.instructions?.map((item,index)=>(
                            <p key={index}>
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>                    
                </div>

                <div className="CourseDetailsCard-share">
                    <button onClick={handleShare}>
                        <FaShareSquare size={15} />
                        Share
                    </button>
                </div>
            </div>     
        </div>
    </div>

  )
}

export default CourseDetailsCard
