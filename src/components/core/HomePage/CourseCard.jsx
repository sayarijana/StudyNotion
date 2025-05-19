import React from 'react';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import "./CourseCard.css";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`HomeCourseCard-container ${currentCard === cardData?.heading ? 'active' : ''}`}
        onClick={() => setCurrentCard(cardData?.heading)}
    >
        <div className="HomeCourseCard-content">
            <div className="HomeCourseCard-heading">{cardData?.heading}</div> 
            <div className="HomeCourseCard-description">{cardData?.description}</div>           
        </div>

        <div className={`HomeCourseCard-footer ${currentCard === cardData?.heading ? 'active' : ''}`}>
            <div className="HomeCourseCard-icon-text">
                <HiUsers />
                <p>{cardData?.level}</p>
            </div>

            <div className="HomeCourseCard-icon-text">
                <ImTree />
                <p>{cardData?.lessionNumber} Lession</p>
            </div>
        </div>
      
    </div>
  )
}

export default CourseCard
