import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourse from './PublishCourse/PublishCourse';
import "./RenderSteps.css";


const RenderSteps = () => {
    const {step}= useSelector((state)=>state.course);
    console.log("Step...",step);

    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]
  return (
    <div className="steps-container">
        <div className="steps-indicators">
            {
                steps.map((item)=>(
                    <div key={item.id} className="step-item">
                        <div className="step-circle">
                            <button className={`step-button ${step === item.id ? 'active' : ''} ${step > item.id ? 'completed' : ''}`}>
                                {
                                    step > item.id ? (
                                        <FaCheck className="check-icon" />
                                    ) : (
                                        item.id
                                    )
                                }
                            </button>
                        </div>

                        {
                            item.id !==steps.length && (
                                <div className={`step-connector ${step > item.id ? 'completed' : ''}`}></div>
                            )
                        }                        

                    </div>

                ))
            }
        </div>

        <div className="steps-labels">
            {
                steps.map((item)=>(
                    <div key={item.id} className="step-label">
                        <div>
                            <p className={`step-title ${step >= item.id ? 'active-label' : ''}`}>{item.title}</p>
                        </div>
                    </div>
                ))
            }
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}

      
    </div>
  )
}

export default RenderSteps
