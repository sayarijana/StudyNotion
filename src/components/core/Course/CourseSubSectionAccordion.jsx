import React from 'react';
import { HiOutlineVideoCamera } from "react-icons/hi";
import "./CourseSubSectionAccordion.css";

const CourseSubSectionAccordion = ({ subSec }) => {
  return (
    <div>
        <div className="CourseSubSectionAccordion-container">
            <div className="CourseSubSectionAccordion-content">
                <span><HiOutlineVideoCamera /></span>
                <p>{subSec?.title}</p>
            </div>
        </div>      
    </div>
  )
}

export default CourseSubSectionAccordion
