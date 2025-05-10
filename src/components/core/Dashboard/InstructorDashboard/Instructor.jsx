import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
import "./Instructor.css";

const Instructor = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        ;(async()=>{
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            console.log(instructorApiData);
            if(instructorApiData.length) setInstructorData(instructorApiData);
            if(result){
                setCourses(result);
            }
            setLoading(false);
        })()
    },[]);

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    );

    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );


  return (
    <div className='InstructorDsh'>
      <div className="Instructor-heading-container">
        <h1 className="Instructor-heading">Hi {user.firstName} 👋</h1>
        <p className="Instructor-subheading">Let's start something new</p>
      </div>
      {
        loading ? (<div className="spinner">loading...</div>) :
        courses.length > 0 ? (
            <div>
                <div className="Instructor-chart-stats-container">
                    {
                        totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorData} />
                        ) : (
                            <div className="Instructor-no-chart">
                                <p>Visualize</p>
                                <p> Not Enough Data To Visualize</p>
                            </div>
                        )
                    }
                    <div className="Instructor-stats">
                        <p>Statistics</p>
                        <div>
                            <div>
                                <p>Total Courses</p>
                                <p>{courses.length}</p>
                            </div>

                            <div>
                                <p>Total Students</p>
                                <p>{totalStudents}</p>
                            </div>
                            <div>
                                <p>Total Income</p>
                                <p>Rs. {totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Instructor-course-section">
                    <div className="Instructor-course-section-header">
                        <p>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p className="Instructor-view-all">View All</p>
                        </Link>
                    </div>
                    <div className="Instructor-courses-container">
                        {
                            courses.slice(0,3).map((course)=>(
                                <div key={course._id} className="Instructor-course-card">
                                    <img src={course.thumbnail} alt={course.title} height={200} 
                                        className="Instructor-course-thumbnail"
                                    />
                                    <div className="Instructor-course-details">
                                        <p className="Instructor-course-title">{course.title}</p>
                                        <div className="Instructor-course-meta">
                                            <p>{course.studentEnrolled.length} students</p>
                                            <p>|</p>
                                            <p>Rs. {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        ) : (
            <div className="Instructor-empty">
                <p>You have not created any courses yet</p>
                <Link to="/dashboard/add-course">
                    <p>Create a course</p>
                </Link>
            </div>
        )
      }
    </div>
  )
}

export default Instructor
