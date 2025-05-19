const Course = require("../models/course");
const CourseProgress = require("../models/courseProgress");
const Profile = require("../models/profile");
const User=require("../models/user");
const {uploadImgToCloudinary} = require("../utils/imageUploder");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async(req,res) => {
    try{
        const {gender,dob="",contactNumber,about="",profession=""} = req.body; 
        const id=req.existUser.id;
        console.log("id",id);

        if(!id || !gender || !contactNumber){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required"
                }
            )    
        }

        const userData = await User.findById(id);
        const profileId = userData.additionalDetails;

        const profileDetails=await Profile.findById(profileId);

        //updation in profile
        profileDetails.dob = dob;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        profileDetails.profession = profession;
        profileDetails.about = about;

        await profileDetails.save();

        return res.status(200).json(
            {
                success:true,
                message:"Profile updated successfully",
                profileDetails
            }
        )


    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update profile"
            }
        )

    }
}

//delete account

exports.deleteAccount = async(req,res) => {
    try{
        //fetch id
        console.log(req.existUser)
        const id=req.existUser.id;
        console.log("id : ",id);
        const userDetail = await User.findById({ _id: id });
        console.log(userDetail);

        if(!userDetail){
            return res.status(404).json(
                {
                    success:false,
                    message:"User not found"
                }
            )
        }
        
        //homework uneroll from course
        //how can we schedule operation

        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json(
            {
                success:true,
                message:"User deleted successfully"
            }
        )

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"Unable to delete account"
            }
        )

    }
}



exports.getAllUsers = async(req,res) => {
    try{

        const id=req.existUser.id;

        const userDetail=await User.findById(id).populate("additionalDetails").exec();


        return res.status(200).json(
            {
                success:true,
                message:"User's data fetched successfully",
                data:userDetail
            }
        )

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"Unable to get all users"
            }
        )
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try{
        const displayPicture = req.files.displayPicture;
        console.log(displayPicture);
        const userId = req.existUser.id;

        console.log("Cloudinary Function:", uploadImgToCloudinary);
        console.log(displayPicture.tempFilePath);
        
        const image = await uploadImgToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })

    }catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.getEnrolledCourses = async (req, res) =>{
    try{
        const userId = req.existUser.id;
        let userDetails = await User.findOne({
            _id: userId,
        }).populate(
            {
                path:"courses",
                populate:{
                    path:"courseContent",
                    populate:{
                        path: "subSection",
                    },
                },
            }
        ).exec();

        userDetails = userDetails.toObject();
        var SubsectionLength = 0;
        for (var i = 0; i < userDetails.courses.length; i++){
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].
                subSection.reduce((acc,curr)=>acc+parseInt(curr.timeDuration),0);

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }
            let courseProgressCount = await CourseProgress.findOne(
                {
                    courseId : userDetails.courses[i]._id,
                    userId : userId,
                }
            )

            courseProgressCount = courseProgressCount?.completedVideo.length;
            if(SubsectionLength === 0){
                userDetails.courses[i].progressPercentage = 100;
            }else{
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = Math.round(
                    (courseProgressCount/SubsectionLength) * 100 * multiplier
                )/multiplier;
            }
        }

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }


        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })

    }catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.instructorDashboard = async (req, res) => {
    try{
        const courseDetails = await Course.find({instructor : req.existUser.id});

        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id:course._id,
                courseName:course.title,
                courseDescription:course.desc,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats;
        })

        res.status(200).json({ courses: courseData });
    }catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

