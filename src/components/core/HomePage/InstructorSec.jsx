import "./InstructorSec.css";
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import Instructor from "../../../assets/Images/Instructor.png"

const InstructorSec = () => {
  return (
    <div className='sec-31'>
        <div className='sec-3left'>
            <img src={Instructor} alt="instructor" className="imgins" />

        </div>

        <div className='sec-3right'>
            <div className='sec-3heading'>
                Become an
                <HighlightText text={" instructor"}/>
            </div>
            <div className='sec-3desc'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>

            <div className='sec-3btn'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='btnText'>
                        start teaching today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default InstructorSec
