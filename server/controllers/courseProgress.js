const mongoose = require("mongoose");
const CourseProgress = require("../models/courseProgress");
const SubSection = require("../models/subSection");



exports.updateCourseProgress = async (req, res) =>{
    const { courseId, subsectionId } = req.body;
    const userId = req.existUser.id;
    console.log("user in updateCourseProgress : ",userId);
    console.log("subsectionId in updateCourseProgress : ",subsectionId);

    try{
        // Check if the subsection is valid
        const subsection = await SubSection.findById(subsectionId);

        if(!subsection){
            return res.status(404).json({ error: "Invalid subsection" });
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        console.log("courseProgress : ",courseProgress);

        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
              success: false,
              message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideo.includes(subsectionId)) {
              return res.status(400).json({ error: "Subsection already completed" })
            }
      
            // Push the subsection into the completedVideos array
            courseProgress.completedVideo.push(subsectionId)
        }
      
        // Save the updated course progress
        await courseProgress.save();
      
        return res.status(200).json({ message: "Course progress updated" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }        
    
}