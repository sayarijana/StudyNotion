const RatingAndReview = require("../models/ratingAndReview");
const Course = require("../models/course");
const { default: mongoose } = require("mongoose");


exports.createRatingAndReview = async(req,res) => {
    try{
        //get user id
        const userId = req.existUser.id;
        //fetch data 
        const {rating,review, courseId} = req.body;
        //check user enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id:courseId,
                studentEnrolled:{$elemMatch : {$eq: userId}}
            }
        )

        if(!courseDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:"Student is not enrolled in this course"
                }
            )
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId
            }
        )

        if(alreadyReviewed){
            return res.status(403).json(
                {
                    success:false,
                    message:"Course in already reviewed by the user"
                }
            )
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create(
            {
                rating,
                review,
                course:courseId,
                user:userId
            }
        )

        //add into the course

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingAndReview : ratingReview._id
                }
            },
            {new:true}
        )
        console.log(updatedCourseDetails);


        return res.status(200).json(
            {
                success:true,
                message:"Rating and review created successfully"
            }
        )


    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }
}



exports.getAvgRatingsAndReview = async(req,res) =>{
    try{
        //get course id
        const courseId = req.body.courseId;
        //calculate avg rating
        const result = await RatingAndReview.aggregate(
            [
                {
                    $match :{
                        course: mongoose.Types.ObjectId(courseId)
                    }

                },
                {
                    $group:{
                        _id:null,
                        averageRating : { $avg : "$rating"}
                    }
                }
            ]
        )


        //return rating
        if(result.length > 0){
            return res.status(200).json(
                {
                    success:true,
                    averageRating : result[0].averageRating,
                }
            )

        }

        //if review and rating not exist
        return res.status(200).json(
            {
                success:true,
                message:"No ratings given till now",
                averageRating:0
            }
        )
        

    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }

}

exports.getAllRatingsAndReview = async(req,res) =>{
    try{
        const allrr = await RatingAndReview.find({}).sort({rating:"desc"}).populate(
            {
                path:"user",
                select:"firstName lastName email image"
            }
        ).populate(
            {
                path:"course",
                select:"title"
            }
        ).exec();

        console.log("backend",allrr);

        return res.status(200).json(
            {
                success:true,
                message:"All reviews fetched successfully",
                data:allrr
            }
        )




    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:err.message
            }
        )
    }

}