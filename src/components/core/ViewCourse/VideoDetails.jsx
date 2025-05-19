import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { BigPlayButton, Player } from 'video-react';
import IconBtnComm from '../../common/IconBtnComm';
import "./VideoDetails.css";


const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([]);
    const [previewSource, setPreviewSource] = useState("");
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        ;(async()=>{
            if (!courseSectionData.length) return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            } else {
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                );

                if (filteredData.length > 0 && filteredData[0].subSection?.length > 0) {
                    const filteredVideoData = filteredData[0].subSection.filter(
                      (data) => data._id === subSectionId
                    );
                  
                    if (filteredVideoData.length > 0) {
                      setVideoData(filteredVideoData[0]);
                      setPreviewSource(courseEntireData.thumbnail);
                      setVideoEnded(false);
                    } else {
                      console.warn("Sub-section not found.");
                    }
                } else {
                    console.warn("Section or sub-section data not available.");
                }
            }

        })();

    },[courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);
      
        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true;
        } else {
            return false;
        }

    }

    const goToNextVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
              courseSectionData[currentSectionIndx].subSection[
                currentSubSectionIndx + 1
              ]._id;

            navigate(
              `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
            const nextSubSectionId =
              courseSectionData[currentSectionIndx + 1].subSection[0]._id;
            navigate(
              `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }

    }

    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true;
        } else {
            return false;
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[
                currentSubSectionIndx - 1
            ]._id;

            navigate(
              `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length;
            const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[
                prevSubSectionLength - 1
            ]._id;

            navigate(
              `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }

    }

    const handleLectureCompletion = async () => {
        setLoading(true);
        console.log("Before fetching....");
        const res = await markLectureAsComplete(
            {courseId: courseId, subsectionId: subSectionId},
            token
        );
        console.log("Res: ",res);

        if(res){
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    }

  return (
    <div className="VideoDetails-wrapper"> 
        {
            !videoData ? (
                <img src={previewSource} alt="Preview" className="VideoDetails-thumbnail"/>
            ) : (
                <Player ref={playerRef} 
                   aspectRatio='16:7'
                   playsInline  onEnded={() => setVideoEnded(true)}
                   src={videoData?.videoUrl}
                >
                    <BigPlayButton position="center" />
                    {
                        videoEnded && (
                            <div className="VideoDetails-overlay">
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtnComm disabled={loading}
                                           onclick={() => handleLectureCompletion()}
                                           text={!loading ? "Mark As Completed" : "Loading..."}
                                        />
                                    )
                                }
                                <IconBtnComm disabled={loading}
                                   onclick={()=>{
                                    if(playerRef?.current){
                                        playerRef?.current?.seek(0);
                                        setVideoEnded(false);
                                    }
                                   }}
                                   text="Rewatch"
                                />

                                <div className="VideoDetails-navButtons">
                                    {
                                        !isFirstVideo() && (
                                            <button disabled={loading} onClick={goToPrevVideo}  className="blackButton">Prev</button>
                                        )
                                    }

                                    {
                                        !isLastVideo() && (
                                            <button disabled={loading} onClick={goToNextVideo}  className="blackButton">Next</button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </Player>
            )
        }  

        <h1 className="VideoDetails-title">{videoData?.title}</h1> 
        <p  className="VideoDetails-description">{videoData?.description}</p>          
    </div>
  )
}

export default VideoDetails
