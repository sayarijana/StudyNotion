const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema(
    {
        title:{
            type:String,

        },
        desc:{
            type:String,
            trim:true
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        whatWillLearn:{
            type:String
        },
        courseContent:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],
        ratingAndReview:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"RatingAndReview"
            }
        ],
        price:{
            type:Number,
        },
        thumbnail:{
            type:String
        },
        tags:{
            type:String
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        studentEnrolled:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        ],
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
        createdAt: { type: Date, default: Date.now },
    }
)

module.exports = mongoose.model("Course",courseSchema);