import "./LearningLanguageSec.css";
import React from 'react';
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button"
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";


const LearningLanguageSec = () => {
  return (
    <div className="llsec">
        <div className="entirediv">
            <div className="llheading">
                Your swiss knife for
                <HighlightText text={" learning any language"} />
            </div>

            <div className="lldesc">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
            
            <div className="imgdiv">
                <img src={know_your_progress} alt="know" className="img1" />
                <img src={compare_with_others} alt="compare"  className="img2"/>
                <img src={plan_your_lesson} alt="plan" className="img3"  />

            </div>
            <div className="llbtn">
                <CTAButton active={true} linkto="/signup">
                    <div>learn more</div>
                </CTAButton>
            </div>
        </div>

      
    </div>
  )
}

export default LearningLanguageSec
