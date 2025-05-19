const Section=require("../models/section");
const Course=require("../models/course");
const SubSection = require("../models/subSection");

exports.createSection = async(req,res) => {
    try{
        //data fetch
        const {secName,courseId}=req.body;
        console.log(req.body);

        //validation
        if(!secName || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:"All fields are required"
                }
            )
        }

        //create section
        console.log("before creating")
        const newSec = await Section.create({secName});
        console.log("new section",newSec);

        //insert section in course
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    courseContent: newSec._id
                }
            },
            {
                new:true
            }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        return res.status(200).json(
            {
                success:true,
                updatedCourse,
                message:"Section created successfully"
            }
        );       


    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:"Something went wrong to create section"
            }
        )

    }
}



exports.updateSection = async(req,res) => {
    try{
        const {secName, secId,courseId } = req.body;
        console.log("section edit...",req.body);
        const section = await Section.findByIdAndUpdate(
            secId,
            {secName},
            {new:true}
        );
        
        const course = await Course.findById(courseId)
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ).exec();

        return res.status(200).json(
            {
                success:true,
                data:course,
                message:section
            }
        )



    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update section"
            }
        )

    }
}


exports.deleteSection = async(req,res) => {
    try{
        //req.params  && course update
        const {secId, courseId}=req.body;
        await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent:secId,
                }
            }
        )

        const section = await Section.findById(secId);
        if(!section){
            return res.status(404).json(
                {
                    success:false,
                    message:"Section not Found"
                }
            )
        }
        //delete sub section
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        await Section.findByIdAndDelete(secId);

        const course = await Course.findById(courseId).populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ).exec();

        return res.status(200).json(
            {
                success:true,
                message:"Section deleted successfully",
                data:course
            }
        )

    }catch(err){
        console.error("Error deleting section:", err);
        return res.status(500).json(
            {
                success:false,
                message:"Unable to delete section"
            }
        )
    }
}