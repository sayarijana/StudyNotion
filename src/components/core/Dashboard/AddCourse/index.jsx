import React from 'react';
import RenderSteps from './RenderSteps';
import "./IndexAddCourse.css";

const index = () => {
  return (
    <div className="add-course-container">
      <div className="add-course-content">
        <div className="add-course-header">
            <h1 className="add-course-title">Add Course</h1>
            <div className="render-steps-container">
                <RenderSteps />
            </div>
        </div>

        <div className="course-upload-tips">
            <p className="course-upload-tips-title">⚡ Course Upload Tips</p>
            <ul className="course-upload-tips-list">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default index
