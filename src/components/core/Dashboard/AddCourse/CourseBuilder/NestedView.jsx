import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import {RxDropdownMenu} from "react-icons/rx";
import {MdEdit} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import {BiDownArrow} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import "./NestedView.css";



const NestedView = ({handleChangeEditSectionName}) => {
  const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    console.log("course..",course);

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] =useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async(sectionId) =>{
      const result = await deleteSection(
        {
          secId:sectionId,
          courseId: course._id
        },token
      )

      if(result){
        dispatch(setCourse(result));
      }
      setConfirmationModal(null);

    }

    const handleDeleteSubSection = async(subSectionId,sectionId) => {
      const result = await deleteSubSection(
        {
          subSecId:subSectionId,
          secId:sectionId,
        },token
      )

      if(result){
        const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);

        const updatedCourse = {...course, courseContent:updatedCourseContent}
        dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null)

    }
  


  return (
    <div className="nestedview-container">
      <div className="nestedview-content">
        {
          course?.courseContent?.map((section)=>(
            <details key={section._id} open className="nestedview-section">
              <summary className="nestedview-section-header">
                <div className="nestedview-section-title">
                  <RxDropdownMenu className="nestedview-icon"  />
                  <p>{section.secName}</p>
                </div>

                <div className="nestedview-section-actions">
                  <button onClick={()=>handleChangeEditSectionName(section._id, section.secName)}>
                    <MdEdit className="nestedview-icon" />
                  </button>

                  <button onClick={()=>{
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }}>
                    <RiDeleteBin6Line className="nestedview-icon" />
                  </button>
                  <span className="nestedview-divider">|</span>
                  <BiDownArrow className="nestedview-icon"/>
                </div>
              </summary>

              <div className="nestedview-subsections">
                {
                  section?.subSection?.map((data)=>(
                    <div key={data?._id}
                      onClick={()=>setViewSubSection(data)}
                      className="nestedview-subsection"
                    >
                      <div className="nestedview-subsection-title">
                        <RxDropdownMenu className="nestedview-icon" />
                        <p>{data.title}</p>
                      </div>

                      <div className="nestedview-subsection-actions" onClick={(e)=>e.stopPropagation()}>
                        <button onClick={()=> setEditSubSection({...data, sectionId:section?._id})}>
                          <MdEdit className="nestedview-icon"/>
                        </button>

                        <button onClick={()=>{
                          setConfirmationModal({
                            text1: "Delete this Sub-section",
                            text2: "This lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }}>
                          <RiDeleteBin6Line className="nestedview-icon"/>
                        </button>
                      </div>

                    </div>
                  ))
                }

                <button onClick={() => setAddSubSection(section._id)} className="nestedview-addlecture">
                  <AiOutlinePlus  className="nestedview-icon" />
                  <p>Add Lecture</p>
                </button>
              </div>

            </details>
          ))
        }
      </div>

      {
        addSubSection ? (
          <SubSectionModal 
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />
        ) : viewSubSection ? (
          <SubSectionModal 
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        ) : editSubSection ? (
          <SubSectionModal 
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        ) :(<div></div>)
      }

      {
        confirmationModal ? (
          <ConfirmationModal modalData={confirmationModal}/>
        ):(<div></div>)
      }
            
    </div>
  )
}

export default NestedView
