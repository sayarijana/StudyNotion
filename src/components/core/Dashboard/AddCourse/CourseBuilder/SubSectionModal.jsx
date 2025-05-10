import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {RxCross1} from "react-icons/rx";
import Upload from "../Upload";
import IconBtnComm from '../../../../common/IconBtnComm';
import "./SubSectionModal.css";



const SubSectionModal = ({modalData, setModalData,add=false,view=false, edit = false}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    }=useForm();
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl 
        )
            return true;
        else
            return false;
    }
    const handleEditSubSection = async() => {
        const currentValues = getValues();
        const formData=new FormData();
        formData.append("subSecId",modalData._id);
        formData.append("secId",modalData.sectionId);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);
        const result  = await updateSubSection(formData,token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async(data) => {
        if(view){
            return;
        }

        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form");
            }else{
                handleEditSubSection();
            }
            return;
        }

        const formData= new FormData();
        formData.append("secId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("videoFile",data.lectureVideo);
        setLoading(true);
        console.log("BEFORE add course API call");
        formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
        });

        const result = await createSubSection(formData,token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
            
            const updatedCourse = {...course, courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);
    }



  return (
    <div className="subSectionModal__backdrop">
        <div className="subSectionModal__container">
            <div className="subSectionModal__header">
                <p className="subSectionModal__title">
                    {view && "Viewing "} {add && "Adding "} {edit && "Editing "}
                    Lecture
                </p>
                <button className="subSectionModal__close-btn"
                   onClick={() => (!loading ? setModalData(null): {})}
                >
                    <RxCross1 />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="subSectionModal__form">
               <Upload 
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl: null}
                    editData={edit ? modalData.videoUrl: null}
                />

                <div className="subSectionModal__title-container">
                    <label htmlFor="lectureTitle" className="subSectionModal__label">Lecture Title</label>
                    <input type="text" id='lectureTitle' placeholder='Enter Lecture Title'
                       {...register("lectureTitle", {required:true})} className="subSectionModal__input"
                    />
                    {
                        errors.lectureTitle && (
                            <span className="subSectionModal__error">Lecture Title is required</span>
                        )
                    }
                </div>

                <div className="subSectionModal__desc-container">
                    <label htmlFor="lectureDesc" className="subSectionModal__label">Lecture Description</label>
                    <textarea id="lectureDesc" placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})} className="subSectionModal__textarea"
                    />
                    {
                        errors.lectureDesc && (
                            <span className="subSectionModal__error">Lecture Description is required</span>
                        )
                    }
                </div>

                {
                    !view && (
                        <div className="subSectionModal__button-container">
                            <IconBtnComm text={loading ? "Loading...": edit ? "Save Changes" : "Save"}/>
                        </div>
                    )
                }


            </form>
        </div>
      
    </div>
  )
}

export default SubSectionModal
