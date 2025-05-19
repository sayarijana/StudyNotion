import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { FaStar } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import "./RenderCartCourses.css";


const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch=useDispatch();


  return (
    <div className="RenderCartCourses-container">
        {
            cart.map((course, index) => (
                <div className="RenderCartCourses-item">
                    <div className="RenderCartCourses-info">
                        <img src={course?.thumbnail} alt="thumbnail" className="RenderCartCourses-thumbnail"/>
                        <div className="RenderCartCourses-textblock">
                            <p className="RenderCartCourses-title">{course?.title}</p>
                            <p className="RenderCartCourses-category">{course?.category?.name}</p>

                            <div className="RenderCartCourses-rating">
                                <span className="RenderCartCourses-rating-value">4</span>
                                <ReactStars 
                                    count={5}
                                    value={course?.ratingAndReview?.length}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />

                                <span className="RenderCartCourses-rating-count">{course?.ratingAndReview?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div  className="RenderCartCourses-actions">
                        <button onClick={()=> dispatch(removeFromCart(course._id))}
                            className="RenderCartCourses-remove-btn"
                        >
                            <RiDeleteBinLine />
                            <span>Remove</span>
                        </button>

                        <p className="RenderCartCourses-price">Rs {course?.price}</p>

                    </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default RenderCartCourses
