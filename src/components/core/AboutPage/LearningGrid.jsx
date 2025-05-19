import React from 'react';
import "./LearningGrid.css";
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
    {
        order:-1,
        heading:"World-Class Learning for",
        highlightText:"Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink:"/",
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"The learning process uses the namely online and offline."
    },
    {
        order:3,
        heading:"Certification",
        description:"You will get a certificate that can be used as a certification during job hunting."
    },
    {
        order:4,
        heading:`Rating "Auto-grading"`,
        description:"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
    }
]

const LearningGrid = () => {
  return (
    <div className='sec-5Cont'>
      {
        LearningGridArray.map((card,index)=>(
            <div key={index} 
            className={`sec-5grid-item 
            ${index === 0 ? "lg-span-2" :""}
            ${card.order % 2 === 1 ? "fade-bg" : ""}
            ${card.order%2 === 0 ? "light-bg":""}
            ${card.order === 3 ?"lg-start-2":""} `}
            >

                {
                    card.order < 0 ? (
                        <div className='sec-5div'>
                            <h2>
                                {card.heading}<br/>
                                <HighlightText text={card.highlightText}/>
                            </h2>
                            <p>
                                {card.description}
                            </p>

                            <div className='sec-5btn'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>

                        </div>
                    ) 
                    
                    : (
                        <div className='sec-5div'>
                            <h3>{card.heading}</h3>
                            <p>{card.description}</p>
                        </div>

                    )
                }

            </div>
        ))
      }
    </div>
  )
}

export default LearningGrid
