const mongoose = require("mongoose");
const Course = require("../models/course");
const User = require("../models/user");
const mailSender =  require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const CourseProgress = require("../models/courseProgress");

exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.existUser.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }
            totalAmount += course.price;
        }catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

    return res.json(
        {
            success: true,
            message: "Payment gateway integration is not available yet. This is a mock response.",
            totalAmount,
            currency: "INR"
        }
    )
}

exports.verifyPayment = async (req, res) => {
    const courses = req.body?.courses;
    const userId = req.existUser.id;

    if (!courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    try {
        await enrollStudents(courses, userId, res);

        return res.status(200).json({
            success: true,
            message: "Mock Payment Verified. Students enrolled successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during mock payment verification."
        });
    }
};

const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses){
        try{
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true},
            )

            if(!enrolledCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideo: [],
            })


            //find the student and add the course to their list of enrolledCOurses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{
                    courses: courseId,
                    courseProgess:courseProgress._id,
                }},{new:true}
            )

            const emailResponse = await mailSender(
                enrollStudents.email,
                `Successfully Enrolled into ${enrolledCourse.title}`,
                courseEnrollmentEmail(enrolledCourse.title, `${enrolledStudent.firstName}`)
            )

        }catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { amount } = req.body;
    const userId = req.existUser.id;

    if (!amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try{
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Successful`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount / 100)
        );

        
        return res.status(200).json({ success: true, message: "Payment success email sent!" });
    }catch (error) {
        console.log("Error in sending mail:", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
}