import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from './CourseSubSectionAccordion';
import "./CourseAccordionBar.css";


const CourseAccordionBar = ({ course, isActive, handleActive }) => {
    const contentEl = useRef(null);

    const [active, setActive] = useState(false);
    useEffect(()=>{
        setActive(isActive?.includes(course._id))
    },[isActive,course._id]);


  return (
    <div className="CourseAccordionBar-container">
        <div>
            <div className="CourseAccordionBar-header" onClick={()=>{handleActive(course._id)}}>
                <div className="CourseAccordionBar-title">
                    <i className={active ? "rotate-180" : "rotate-0"}>
                        <AiOutlineDown />
                    </i>
                    <p>{course?.secName}</p>
                </div>

                <div className="CourseAccordionBar-lectureCount">
                    <span>{`${course.subSection.length || 0} lecture(s)`}</span>
                </div>
            </div>
        </div>


        <div ref={contentEl}
            className={`CourseAccordionBar-content ${active ? "CourseAccordionBar-active" : ""}`}
        >
            <div className="CourseAccordionBar-subsections">
                {
                    course?.subSection?.map((subSec,i)=>(
                        <CourseSubSectionAccordion subSec={subSec} key={i} />
                    ))
                }
            </div>
        </div>
      
    </div>
  )
}

export default CourseAccordionBar
