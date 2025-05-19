import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures
} from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import "./ViewCourse.css"

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    }

    setCourseSpecificDetails();
  }, []);

  return (
    <div className="ViewCourse-container">
      <div className="ViewCourse-toggle-bar">
        <BsThreeDotsVertical size={24} onClick={() => setSidebarVisible(!sidebarVisible)} />
      </div>

      <div className="ViewCourse-wrapper">
        <div className={`ViewCourse-sidebar ${sidebarVisible ? "show" : ""}`}>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className="ViewCourse-content" onClick={() => setSidebarVisible(false)}>
          <div className='ViewCourse-marginX'>
            <Outlet />
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}

export default ViewCourse;
