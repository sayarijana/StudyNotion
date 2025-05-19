
const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnect= ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB conneted successfully"))
    .catch((err)=>{
        console.log("DB connection failed");
        console.error(err);
        process.exit(1);
    })
}