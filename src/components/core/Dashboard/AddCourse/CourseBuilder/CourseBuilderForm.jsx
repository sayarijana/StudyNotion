import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtnComm from '../../../../common/IconBtnComm';
import {MdAddCircleOutline} from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import "./CourseBuilderForm.css";

const CourseBuilderForm = () => {
    const {
            register,
            handleSubmit,
            setValue,
            formState: { errors }
    } = useForm();

    const dispatch=useDispatch();
    const {course} = useSelector((state)=>state.course);
    const [editSectionName,setEditSectionName]=useState(null);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    const cancelEdit = () =>{
        setEditSectionName(null);
        setValue("secName","");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
        
    }
    const goToNext= () => {
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section");
            return;
        }

        if(course.courseContent.some((section)=>section.subSection.length === 0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        //if everything okay to go next

        dispatch(setStep(3));
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if(editSectionName){
            result = await updateSection(
                {
                    secName:data.secName,
                    secId: editSectionName,
                    courseId:course._id,
                }, token
            )
        }
        else{
            result = await createSection(
                {
                    secName:data.secName,
                    courseId:course._id,
                }, token
            )

        }

        //update value
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("secName","");
        }

        setLoading(false);

    }

    const handleChangeEditSectionName = (secId, secName) => {
        if(editSectionName === secId){
            cancelEdit();
            return;
        }

        setEditSectionName(secId);
        setValue("secName",secName);
    }



  return (
    <div className="coursebuilderform-container">
        <h2 className="coursebuilderform-heading">Course Builder</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="coursebuilderform-form">
            <div className="coursebuilderform-inputgroup">
                <label htmlFor="secName">Section name <sup className="coursebuilderform-required">*</sup></label>
                <input type="text" id='secName' placeholder='Add section name'
                  {...register("secName",{required:true})}
                />
                {
                    errors.sectionName && (
                        <span className="coursebuilderform-error">Section name is required</span>
                    )
                }
            </div>
            <div className="coursebuilderform-actions">
                <IconBtnComm type="submit" text={editSectionName ? "Edit Section Name" : "Create Section"}
                   outline={true}
                >
                    <MdAddCircleOutline size={20}/>
                </IconBtnComm>
                {
                    editSectionName && (
                        <button type='button' onClick={cancelEdit} className="coursebuilderform-cancelbtn">Cancel Edit</button>
                    )
                }
            </div>
        </form>

        {
            course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>

            )
        }

        <div className="coursebuilderform-navigation">
            <button className="coursebuilderform-backbtn" onClick={goBack}>Back</button>
            <IconBtnComm text="Next" onclick={goToNext}/>
        </div>
      
    </div>
  )
}

export default CourseBuilderForm
