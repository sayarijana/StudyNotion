import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import ReactStars from 'react-stars';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import IconBtnComm from '../../common/IconBtnComm';
import "./CourseReviewModal.css";

const CourseReviewModal = ({ setReviewModal }) => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm();

    useEffect(()=>{
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[]);

    const ratingChanged = (newRating) =>{
        setValue("courseRating", newRating);
    }

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        )
        setReviewModal(false);
    }


  return (
    <div className="CourseReviewModal__backdrop">
        <div className="CourseReviewModal__container">
            <div className="CourseReviewModal__header">
                <p className="CourseReviewModal__title">Add Review</p>
                <button onClick={() => setReviewModal(false)} className="CourseReviewModal__closeBtn">
                    <RxCross2/>
                </button>
            </div>
            <div className="CourseReviewModal__body">
                <div className="CourseReviewModal__user">
                    <img src={user?.image} alt={user?.firstName + "profile"} 
                        className="CourseReviewModal__avatar"
                    />
                    <div className="CourseReviewModal__userDetails">
                        <p className="CourseReviewModal__userName">{user?.firstName} {user?.lastName}</p>
                        <p className="CourseReviewModal__userTag">Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="CourseReviewModal__form">
                    <ReactStars count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <div className="CourseReviewModal__formGroup">
                        <label htmlFor="courseExperience" className="CourseReviewModal__label">
                            Add Your Experience <sup>*</sup>
                        </label>
                        <textarea className="CourseReviewModal__textarea" id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience", { required: true })}
                        />
                        {
                            errors.courseExperience && (
                                <span className="CourseReviewModal__error">Please Add Your Experience</span>
                            )
                        }
                    </div>

                    <div className="CourseReviewModal__actions">
                        <button onClick={() => setReviewModal(false)} className="CourseReviewModal__cancelBtn">
                            Cancel
                        </button>
                        <IconBtnComm text="Save"/>
                    </div>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default CourseReviewModal
