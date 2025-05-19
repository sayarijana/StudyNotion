const mongoose=require("mongoose");


const catgorrySchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            trim:true
        },
        course:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ]
        
    }
)

module.exports=mongoose.model("Category",catgorrySchema);