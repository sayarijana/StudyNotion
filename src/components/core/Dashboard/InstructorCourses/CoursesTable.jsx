import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from '../../../../utils/constants';
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { formatDate } from '../../../../services/formatDate';
import "./CoursesTable.css";



const CoursesTable = ({courses, setCourses}) => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 25;

    const handleCourseDelete =async(courseId) => {
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);

    }


  return (
    <div className="courses-container">
        <Table className="courses-table">
            <Thead>
                <Tr>
                    <Th className="courses-table-header">Course</Th>
                    <Th className="courses-table-header">Duration</Th>
                    <Th className="courses-table-header">Price</Th>
                    <Th className="courses-table-header">Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    courses.length === 0 ? (
                        <Tr>
                            <Td className="courses-table-data">No Course Found</Td>
                        </Tr>
                    ) : (
                        courses.map((course)=>(
                            <Tr key={course._id} className="courses-table-row">
                                <Td className="courses-table-data">
                                    <img src={course?.thumbnail} alt={course.title} height={148} width={220} className="courses-thumbnail" />
                                    <div className="courses-info">
                                        <p className="courses-title">{course.title}</p>
                                        <p className="courses-desc">
                                            {
                                                course.desc.split(" ").length > TRUNCATE_LENGTH ?
                                                course.desc.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..." :
                                                course.desc
                                            }
                                        </p>
                                        <p className="courses-created">Created: {formatDate(course.createdAt)}</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="courses-status-draft">
                                                    <HiClock size={14} />
                                                    DRAFT
                                                </p>
                                            ) :(
                                                <p className="courses-status-published">
                                                    <FaCheck size={8} />
                                                    PUBLISHED
                                                </p>
                                            )
                                        }
                                    </div>
                                </Td>
                                <Td className="courses-table-data">2h 30min</Td>
                                <Td className="courses-table-data">₹ {course.price}</Td>
                                <Td className="courses-table-data courses-actions">
                                    <button type='button' disabled={loading} 
                                      className="courses-action-btn"
                                      onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                      }}
                                      title="Edit"
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    <button disabled={loading} title="Delete"
                                       className="courses-action-btn courses-action-delete"
                                       onClick={()=>{
                                        setConfirmationModal(
                                            {
                                                text1: "Do you want to delete this course?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btn2Handler: !loading ? () => setConfirmationModal(null) : ()=>{},
                                            }
                                        )
                                       }}
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>

                            </Tr>
                        ))
                    )
                }
            </Tbody>

        </Table>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
              
    </div>
  )
}

export default CoursesTable
