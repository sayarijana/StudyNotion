const SubSection=require("../models/subSection");
const Section=require("../models/section");
const { uploadImgToCloudinary } = require("../utils/imageUploder");
require("dotenv").config();

exports.createSubSection = async(req,res) => {
    try{
        const {title,description,secId} = req.body;
        const video = req.files.videoFile;
        console.log("subsection.....",req.body);

        // !timeDuration ||
        if( !title || !description || !video || !secId){
            return res.status(404).json(
                !timeDuration ||    {
                    success:false,
                    message:"All field are required"
                }
            )
        }
        console.log("data fetched from req body");

        //upload to cloudinary
        const uploadDetails = await uploadImgToCloudinary(video,process.env.FOLDER_NAME);
        console.log("details: ",uploadDetails);


        // Create a new sub-section with the necessary information
		const newSubSec = await SubSection.create(
            {
                title:title,
                description:description,
                timeDuration:`${uploadDetails.duration}`,
                videoUrl:uploadDetails.secure_url
            }
        )

        // Update the corresponding section with the newly created sub-section
		const updateSec= await Section.findByIdAndUpdate(
            {_id:secId},
            {
                $push:{
                    subSection:newSubSec._id
                }
            },
            {new:true}
        ).populate("subSection").exec();
        //log updated sec here after adding populate query

        return res.status(200).json(
            {
                success:true,
                message:"SubSection created successfully",
                data:updateSec
            }
        )
        

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"Unable to create SubSection"
            }
        )

    }
}

//hw: 
//update & delete
exports.updateSubSection = async(req,res) => {
    try{
        const {title,description,subSecId,secId}=req.body;
        const subSection = await SubSection.findById(subSecId);

        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
        }

        if(title !== undefined){
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video;
            const uploadDetails = await uploadImgToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();
        const updatedSection = await Section.findById(secId).populate("subSection");

        return res.json(
            {
                success:true,
                data:updatedSection,
                message:"Section updated successfull"
            }
        )


    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:"Unable to update sub-section"
            }
        )

    }
}
      


exports.deleteSubSection = async(req,res) => {
    try{
        const {subSecId, secId}=req.body;
        await Section.findByIdAndUpdate(
            {_id:secId},
            {
                $pull:{
                    subSection:subSecId,
                }
            }
        )

        const subSection = await SubSection.findByIdAndDelete({_id:subSecId});

        if(!subSection){
            return res.status(404).json(
                {
                    success:false,
                    message:"SubSection not found"
                }
            )
        }

        const updatedSection = await Section.findById(secId).populate("subSection");

       
        return res.status(200).json(
            {
                success:true,
                data:updatedSection,
                message:"Section deleted successfully"
            }
        )

    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:"Unable to delete section"
            }
        )
    }
}