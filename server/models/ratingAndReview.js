const mongoose=require("mongoose");

const rrSchema=new mongoose.Schema(
    {
        rating:{
            type:Number,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Course",
            index: true,
        },
        review:{
            type:String,
            required:true,
            trim:true
        }
    }
)

module.exports = mongoose.model("RatingAndReview",rrSchema);