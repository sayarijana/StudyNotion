const Course=require("../models/course");
const Category = require("../models/category");
const User=require("../models/user");
const {uploadImgToCloudinary}=require("../utils/imageUploder");
require("dotenv").config();
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Section = require("../models/section");
const SubSection =require("../models/subSection");
const CourseProgress = require("../models/courseProgress");

exports.createCourse = async(req,res) =>{
    try{
        //fetch data(body) & file(req.file)
        const {
            title,
            desc,
            whatWillLearn,
            price,
            tags,
            category,        
			status = "Draft",
			instructions
        }=req.body;

        console.log("req in create course", req.body)
        console.log(req.files.thumbnailImage);


        const thumbnail =req.files.thumbnailImage;

        //validation
        if(!title || !desc ||!whatWillLearn || !price || !category || !instructions
             || !thumbnail ||!tags
         ){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required"
                }
            )
        }

        if (!status || status === undefined) {
			status = "Draft";
		}


        const userId = req.existUser.id;
        // console.log("userid",userId)
        
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId,{
			accountType: "Instructor",
		});

        // console.log("instructor details : ",instructorDetails);
        //if no data found
        if(!instructorDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"Instructor details not found"
                }
            )
        }

        //check given tag valid or not
        const catDetails = await Category.findById(category);
        // console.log("catDetails",catDetails);
        if(!catDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"Category Details Not Found"
                }
            )
        }
        //upload to cloudinary

        const thumbnailImage=await uploadImgToCloudinary(thumbnail,process.env.FOLDER_NAME);

        
        //create entry in db(course,user(instructor),tag)
        const newCourse = await Course.create(
            {
                title,
                desc,
                instructor:instructorDetails._id,
                whatWillLearn :whatWillLearn,
                price,
                tags:tags,
                category:catDetails._id,
                thumbnail:thumbnailImage.secure_url,
                status: status,
			    instructions: instructions,                
            }
        )

        // console.log("newCourse",newCourse)

        //update user
        await User.findByIdAndUpdate(
            {
                _id:instructorDetails._id
            },
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        ) 

        //update category
        await Category.findByIdAndUpdate(
            {
                _id:catDetails._id
            },
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true}
        )

        //return response
        return res.status(200).json(
            {
                success:true,
                data:newCourse,
                message:"Course created successfully"
            }
        )

    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:"Failed to create course"
            }
        )
    }
}

exports.editCourse = async (req, res) =>{
    try{
        const {courseId} =req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({ error: "Course not found" });
        }

        if(req.files){
            console.log("thumbnail update");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update only the fields that are present in the request body
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key]);
                }else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne(
            {
                _id:courseId
            }
        ).populate("category")
        .populate("ratingAndReview")
        .populate({
            path: "courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        
        return res.json(
            {
                success:true,
                message: "Course updated successfully",
                data:updatedCourse
            }

        )


    }catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message: "Internal server error",
                error: error.message,
            }
        )
    }
}


exports.getAllCourses = async(req,res)=> {
    try{
        const allCourses = await Course.find(
            {status: "Published"},
            {
                title:true,
                thumbnail:true,
                price:true,
                instructor:true,
                ratingAndReview:true,
                studentEnrolled:true
            }).populate("Instructor").exec();

            console.log(allCourses);

            return res.status(200).json(
                {
                    success:true,
                    message:"Data for all courses fetched successfully",
                    data:allCourses
                }
            )

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }
}



exports.getCourseDetails = async(req,res) =>{
    try{
        //get id
        const {courseId}=req.body;
        console.log("in course controller.. course id", courseId);
        
        const courseDetails = await Course.findOne(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    },
                }
            ).populate("category")
            .populate("ratingAndReview")
            .populate(
                {
                    path:"courseContent",
                    populate:{
                        path:"subSection",
                        select: "-videoUrl",
                    },
                }
            )
            .exec();

        
        if(!courseDetails){
            return res.status(400).json(
                {
                    success:false,
                    message:`Could not find the course with ${courseId}`
                }
            )
        } 

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content)=>{
            content.subSection.forEach((subSection)=>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        



        console.log("Course Details with Populated Data:", courseDetails);
        return res.status(200).json(
            {
                success:true,
                message:"Course details fetched successfully",
                data:{
                    courseDetails,
                    totalDuration
                }
            }
        )
    

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }

}

exports.getFullCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;
        const userId = req.existUser.id;
        const courseDetails = await Course.findOne(
            {_id: courseId}
        ).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            }
        ).populate("category")
        .populate("ratingAndReview")
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ).exec();

        let courseProgressCount =await CourseProgress.findOne(
            {
                courseId:courseId,
                userId:userId
            }
        )

        console.log("courseProgressCount : ", courseProgressCount);

        if(!courseDetails){
            return res.status(400).json(
                {
                    success:false,
                    message: `Could not find course with id: ${courseId}`,
                }
            )
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
              const timeDurationInSeconds = parseInt(subSection.timeDuration);
              totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json(
            {
                success:true,
                data:{
                    courseDetails,
                    totalDuration,
                    completedVideos: courseProgressCount?.completedVideo ? courseProgressCount?.completedVideo : [],

                }
            }
        )


    }catch(error){
        return res.status(500).json(
            {
                success:false,
                message:error.message,
            }
        )
    }
}

exports.getInstructorCourses = async(req,res) => {
    try{
        const instructorId = req.existUser.id;

        const instructorCourses = await Course.find(
            {instructor:instructorId}
        ).sort({createdAt : -1})
        console.log("instructorCourses...",instructorCourses);

        // Return the instructor's courses
        return res.status(200).json(
            {
                success:true,
                data:instructorCourses,
            }
        )

    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async(req,res) => {
    try{
        const { courseId } = req.body;

        // Find the course
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json(
                {
                    success:false,
                    message:"Course not found" 
                }
            )
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentEnrolled;
        for(const studentId of studentsEnrolled ){
            await User.findByIdAndUpdate(studentId,
                {
                    $pull:{courses:courseId}
                }
            )
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for(const sectionId of courseSections ){
            const section = await Section.findById(sectionId);
            if(section){
                const subSections= section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            await Section.findByIdAndDelete(sectionId);
        }


        // Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })

    }catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Server error",
                error: error.message,
            }
        )
    }
}