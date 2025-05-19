import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtnComm from '../../../../common/IconBtnComm';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import Upload from '../Upload';
import ChipInput from './ChipInput';
import { MdNavigateNext } from "react-icons/md";
import "./CourseInformationForm.css";

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const [isCoursePriceEmpty, setIsCoursePriceEmpty] = useState(true);

    const handleCoursePriceChange = (e) => {
        setIsCoursePriceEmpty(e.target.value === "");
    };


    useEffect(()=>{
        const getCategories = async() =>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories?.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        };

        if(editCourse && course){
            setValue("courseTitle", course.title);
            setValue("courseShortDesc", course.desc);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tags);
            setValue("courseBenefits", course.whatWillLearn);
            setValue("courseCategory", course.category?._id);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[editCourse, course, setValue]);



    const isFormUpdated = () => {
        const currentValues = getValues();

        if(currentValues.courseTitle !== course.title || 
            currentValues.courseShortDesc !== course.desc ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseBenefits !== course.whatWillLearn ||
            currentValues.courseCategory !== course.category._id || 
            JSON.stringify(currentValues.courseRequirements) !== JSON.stringify(course.instructions)||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseTags.toString() !== course.tags.toString() ||
            currentValues.courseImage !== course.thumbnail
        ){
            return true;
        }
        else
            return false;
        
    }

    

    const onSubmit = async(data)=>{
        console.log("data in courseInformation.......:",data);
        console.log("editCourse",editCourse);
        if(editCourse){

            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
    
                formData.append("courseId", course._id);

                if(currentValues.courseTitle !== course.title) {
                    formData.append("title", data.courseTitle);
                }
    
                if(currentValues.courseShortDesc !== course.desc) {
                    formData.append("desc", data.courseShortDesc);
                }
    
                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
    
                if(currentValues.courseBenefits !== course.whatWillLearn) {
                    formData.append("whatWillLearn", data.courseBenefits);
                }
    
                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                if (currentValues.courseTags.toString() !== course.tags.toString()) {
                    formData.append("tags", JSON.stringify(data.courseTags))
                }
    
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }
    
                setLoading(true);
                try{
                    const result = await editCourseDetails(formData, token);
                    if(result){
                        setStep(2);
                        dispatch(setCourse(result));
                    }
                }catch(error){
                    console.error("Error updating course:", error);
                }
                setLoading(false);    
            }
            else{
                toast.error("NO Changes made so far");
            }
            return;
        }
        //create a new course
        console.log("title: ",data.courseTitle)
        // const FormData = require('form-data');
        const formData = new FormData();
        formData.append("title", data.courseTitle);
        formData.append("tags", JSON.stringify(data.courseTags));
        formData.append("desc", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage", data.courseImage);



        setLoading(true);
        console.log("BEFORE add course API call");
        formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
        });

        try{
            const result = await addCourseDetails(formData, token);
            console.log("result........",result);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
        }catch(error){
            console.error("Error adding course:", error);
        }

        setLoading(false);

        return;

    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="courseInfoform">
        <div className="courseInfoform__form-group">
            <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
            <input type="text" id='courseTitle'
               className="courseInfoform__input-field"
               placeholder='Enter Course Title'
               {...register("courseTitle",{required:true})}               
            />
            {
                errors.courseTitle && (
                    <span className="courseInfoform__error-text">Course Title is Required</span>
                )
            }
        </div>

        <div className="courseInfoform__form-group">
            <label htmlFor='courseShortDesc'>Course Short Description <sup>*</sup></label>
            <textarea id="courseShortDesc" className="courseInfoform__textarea"
             placeholder='Enter Description'
             {...register("courseShortDesc",{required:true})}
             
            ></textarea>
            {
                errors.courseShortDesc && (
                    <span className="courseInfoform__error-text">Course Description is required</span>
                )
            }
        </div>

        <div className="courseInfoform__form-group">
            <label htmlFor='coursePrice'>Course Price <sup>*</sup></label>
            <div className="courseInfoform__input-container">
                <input id="coursePrice"
                 className="courseInfoform__input-field courseInfoform__input-field_p"
                 placeholder='Enter Course Price'
                 type='number'
                 {...register("coursePrice",{required:true, valueAsNumber:true})}
                 onChange={handleCoursePriceChange}             
                />
                {
                    isCoursePriceEmpty && (
                        <HiOutlineCurrencyRupee size={22} className="courseInfoform__icon"/>
                    )
                }
            </div>
            {
                errors.coursePrice && (
                    <span className="courseInfoform__error-text">Course Price is required</span>
                )
            }
        </div>

        <div className="courseInfoform__form-group">
            <label htmlFor='courseCategory'>Course Category <sup>*</sup></label>
            <select id="courseCategory"
               className="courseInfoform__select"
               defaultValue="" 
               {...register("courseCategory",{required:true})}
            >
                <option value="" disabled>Choose a Category</option>
                {
                    !loading && courseCategories.map((category,index)=>(
                        <option key={index} value={category?._id}>{category?.name}</option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span className="courseInfoform__error-text">Course Category is required</span>
                )
            }
        </div>


         {/* Course Tags */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        
        {/* create a component for uploading and showing preview of media */}
        <Upload name="courseImage" label="Course Thumbnail" 
            register={register} setValue={setValue} errors={errors}
            editData={editCourse ? course?.thumbnail : null}
        />

        <div className="courseInfoform__form-group">
            <label>Benefits of the course<sup>*</sup></label>
            <textarea id='coursebenefits' className="courseInfoform__textarea"
              placeholder='Enter Benefits of the course'
              {...register("courseBenefits", {required:true})}
            />
            {
                errors.courseBenefits && (
                    <span className="courseInfoform__error-text">Benefits of the course are required</span>
                )
            }
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValue={getValues}
        />

        <div className='courseInfoform_newButton__container'>
            {
                editCourse && (
                    <button disabled={loading} onClick={()=>(dispatch(setStep(2)))}
                       className='courseInfoform_newButton__continue-btn'
                    >
                        Continue without Saving
                    </button>
                )
            }
            <IconBtnComm  disabled={loading} text={!editCourse ? "Next" : "Save Changes"} >
                <MdNavigateNext size={20}/>
            </IconBtnComm>            
        </div>

    </form>
  )
}

export default CourseInformationForm
