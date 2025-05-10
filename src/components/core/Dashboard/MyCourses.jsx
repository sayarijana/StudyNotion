import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtnComm from '../../common/IconBtnComm';
import CoursesTable from './InstructorCourses/CoursesTable';
import { VscAdd } from "react-icons/vsc";
import "./MyCourses.css";


const MyCourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[]);

  return (
    <div>
        <div className="MyCourses-container">
            <h1 className="MyCourses-title">My Courses</h1>
            <IconBtnComm text="Add Course" onclick={()=>navigate("/dashboard/add-course")}>
                <VscAdd/>
            </IconBtnComm>
        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
      
    </div>
  )
}

export default MyCourses
