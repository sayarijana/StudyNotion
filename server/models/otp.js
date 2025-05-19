const mongoose=require("mongoose");
const emailTemplate = require("../mail/emailVerificationTemplate");
const mailSender = require("../utils/mailSender");

const otpSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        createAt:{
            type:Date,
            default:Date.now(),
            expires:5*60,// The document will be automatically deleted after 5 minutes of its creation time
        },
        otp:{
            type:String,
            required:true
        }
    }
)


//function-->to send email

async function sendVerificationEmail(email,otp) {
    try{
        
        const mailResponse= await mailSender(
            email,
            "Verification mail from StudyNotion",
            emailTemplate(otp)
        );
        console.log("Email sent successfully: ", mailResponse.response);

    }catch(err){
        console.log("Error occure while sending verification mail : ",err);
        throw err;
    }    
}
// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})



module.exports = mongoose.model("Otp",otpSchema);