import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import "./EditCourse.css";

const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading]= useState(false);

    useEffect(()=>{
        const populateCourseDetails = async() =>{
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId,token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])

    if(loading){
        return (
            <div className="editcourse-loading-container">
                <div className="editcourse-spinner"></div>
            </div>
        )
    }

  return (
    <div className="editcourse-container">
        <h1 className="editcourse-title">Edit Course</h1>
        <div className="editcourse-content">
            {
                course ? (<RenderSteps />) 
                :(<p className="editcourse-notfound">Course Not Found</p>)
            }
        </div>
      
    </div>
  )
}

export default EditCourse
