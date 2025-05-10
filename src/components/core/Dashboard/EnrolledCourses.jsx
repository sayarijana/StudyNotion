import { useSelector } from "react-redux";
import "./EnrolledCourses.css";
import React, { useEffect, useState } from 'react'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {

    const {token} = useSelector((state)=>state.auth);
    const [enrolledCourses , setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses = async() =>{
        try{
            const response = await getUserEnrolledCourses(token);
            console.log("response : ", response);
            setEnrolledCourses(response);

        }catch(error){
            console.log("Unable to fetch")
        }

    }

    useEffect(()=>{
        getEnrolledCourses();
    },[]);



  return (
    <div className="EnrolledCourses">
      <div className="EnrolledCourses-container">Enrolled Courses</div>

      {
        !enrolledCourses ? (
            <div className="EnrolledCourses-loading">Loading...</div>
        ) : (
            !enrolledCourses.length ? (
                <p className="EnrolledCourses-empty">You have not enrolled in any course yet </p>
            ) : (
                <div  className="EnrolledCourses-table">
                    <div className="EnrolledCourses-header">
                        <p className="w-[45%]">Course Name</p>
                        <p className="w-1/4">Durations</p>
                        <p className="flex-1">Progress</p>
                    </div>

                    {/* card */}
                    {
                        enrolledCourses.map((course, index, arr)=>(
                            <div key={index} className={`EnrolledCourses-courseItem ${
                                index === arr.length - 1 ? "rounded-b-lg" : ""}`}
                            >
                                <div className="EnrolledCourses-courseInfo"
                                     onClick={() => {
                                        navigate(
                                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                        );
                                    }}
                                >
                                    <img src={course.thumbnail} alt="thumbnail" className="EnrolledCourses-thumbnail"/>
                                    <div className="EnrolledCourses-courseDetails">
                                        <p className="EnrolledCourses-courseTitle">{course.title}</p>
                                        <p className="EnrolledCourses-courseDesc">
                                            {
                                                course.desc.length > 50 ?
                                                `${course.desc.slice(0,50)}...` :
                                                course.desc                                                
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="EnrolledCourses-duration">
                                    {course?.courseContent?.[0]?.subSection?.[0]?.timeDuration || "N/A"}
                                </div>

                                <div className="EnrolledCourses-progress">
                                    <p>Progress : {course.progressPercentage || 0} %</p>
                                    <ProgressBar completed={course.progressPercentage || 0}
                                        height="8px" isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        )
      }
    </div>
  )
}

export default EnrolledCourses
