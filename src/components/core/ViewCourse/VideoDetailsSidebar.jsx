import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import IconBtnComm from '../../common/IconBtnComm';
import "./VideoDetailsSidebar.css";

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate=useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return;
            }
            const currentSectionIndx = courseSectionData.findIndex(
                (data) => data._id === sectionId
            );

            const currentSubSectionIndx = courseSectionData?.[
                currentSectionIndx
            ]?.subSection.findIndex((data) => data._id === subSectionId);
            
            const activeSubSectionId =
                courseSectionData[currentSectionIndx]?.subSection?.[
                  currentSubSectionIndx
            ]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    },[courseSectionData,courseEntireData,location.pathname]);

  return (
    <div>
        <div className="video-details-sidebar">
            <div className="video-details-sidebar-header">
                <div className="video-details-sidebar-back-btn-container">
                    <div onClick={() => {
                           navigate(`/dashboard/enrolled-courses`)
                        }}
                        className="video-details-sidebar-back-btn"
                        title="back"
                    >
                        <IoIosArrowBack size={30} /> 
                    </div>

                    <IconBtnComm text="Add Review"
                      onclick={()=>setReviewModal(true)}
                    />
                </div>

                <div className="video-details-sidebar-course-info">
                    <p>{courseEntireData?.title}</p>
                    <p className="video-details-sidebar-course-progress">{completedLectures?.length}/{totalNoOfLectures}</p>
                </div>

            </div>

            <div className="video-details-sidebar-sections">
                {
                    courseSectionData.map((course,index)=>(
                        <div onClick={()=>setActiveStatus(course?._id)} key={index}
                            className="video-details-sidebar-section"
                        >
                            <div className="video-details-sidebar-section-header">
                                <div  className="video-details-sidebar-section-section-name">{course?.secName}</div>
                                <div className="video-details-sidebar-section-chevron-container">
                                    <span className={`video-details-sidebar-section-chevron-icon ${
                                        activeStatus === course?._id ? 'rotate-180' : 'rotate-0'
                                         }`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>

                            {
                                activeStatus === course?._id && (
                                    <div  className="video-details-sidebar-subsections">
                                        {
                                            course.subSection.map((topic,i)=>(
                                                <div  key={i}
                                                   className={`video-details-sidebar-subsection ${
                                                    videoBarActive === topic._id
                                                      ? 'active'
                                                      : ''
                                                    }`}
                                                  onClick={() => {
                                                    navigate(
                                                      `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )
                                                    setVideoBarActive(topic._id)
                                                  }}
                                                >
                                                    <input type="checkbox" onChange={() => {}}
                                                       checked={completedLectures.includes(topic?._id)}
                                                    />
                                                    {topic.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
      
    </div>
  )
}

export default VideoDetailsSidebar
