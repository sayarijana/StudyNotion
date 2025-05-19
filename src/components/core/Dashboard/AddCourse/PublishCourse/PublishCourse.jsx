import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import IconBtnComm from '../../../../common/IconBtnComm';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import "./PublishCourse.css";

const PublishCourse = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    }= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[]);

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async() => {
        // check if form has been updated or not
        if((course?.status === COURSE_STATUS.PUBLISHED
            && getValues("public") === true) || 
            (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)
        ){
            //no updation in form
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        setLoading(true);
        const result = await editCourseDetails(formData,token);
        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = (data) => {
        handleCoursePublish();
    }

  return (
    <div className="publishCourse__container">
        <h2 className="publishCourse__header">Publish Course</h2>  
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="publishCourse__checkbox-group">
                <label htmlFor="public" className="publishCourse__checkbox-label">
                    <input type="checkbox" id='public' 
                      {...register("public")}
                      className="publishCourse__checkbox"
                    />
                    <span className="publishCourse__checkbox-text">
                        Make this Course as Public
                    </span>
                </label>
            </div>

            <div className="publishCourse__button-group">
                <button type='button' disabled={loading} onClick={goBack} className="publishCourse__back-button">
                    Back
                </button>

                <IconBtnComm disabled={loading} text="Save Changes" />
            </div>
        </form>   
    </div>
  )
}

export default PublishCourse
