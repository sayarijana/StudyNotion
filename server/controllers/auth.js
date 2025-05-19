const User = require("../models/user");
const Otp=require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require('bcryptjs');
const Profile = require("../models/profile");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const mailSender=require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdate");


//sign up

exports.signUp = async(req,res) => {
    try{
        //data fetch
        const {
            firstName,
            lastName,
            accountType,
            email,
            password,
            confirmPassword,
            contactNumber,
            otp
        } = req.body;
        // console.log(req.body);

        // Check if All Details are there or not
        if(!password ||
             !email ||
             !confirmPassword|| 
             !firstName || 
             !lastName ||
             !otp ){
            return res.status(403).json(
                {
                    success:false,
                    message:"All Fields are required"
                }
            )

        }


        // Check if password and confirm password match
        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Password and Confirm Password do not match. Please try again.",
                }
            )
        }

        //check user exist or not
        const existUser = await User.findOne({email});
        // console.log("User exist or not");        
        //if exist return else send otp
        if(existUser){
            return res.status(400).json(
                {
                    success:false,
                    message:"User already exist"
                }
            )
        }
        // console.log("New user");
        
        //fetch most recent otp by sorting
        const recentOtp = await Otp.find({email}).sort({createAt:-1}).limit(1);
        // console.log(recentOtp);
        if(recentOtp.length === 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"OTP not found"
                }
            )
        }else if (otp !== recentOtp[0].otp){
            return res.status(400).json(
                {
                    success:false,
                    message:"Invalid OTP"
                }
            )
        }

        //hash password
        const hashedPassword= await bcrypt.hash(password,10);

        // Create the user
		// let approved = "";
		// approved === "Instructor" ? (approved = false) : (approved = true);

        // Set approval based on account type
        let approved = accountType === "Instructor" ? false : true;


        // Create the Additional Profile For User
        const profileDetail=await Profile.create(
            {
                gender:null,
                dob:null,
                about:null,
                contactNumber:null
            }
        )

        //db entry
        //api :`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
          

        const newUser = await User.create(
            {
                firstName,
                lastName,
                email,
                password:hashedPassword,
                accountType:accountType,
                approved,
                additionalDetails:profileDetail._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
            }
        )

        //return response

        return res.status(200).json(
            {
                success:true,
                newUser,
                message:"User is registered successfully",
               
            }
        )


    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:"User cannot be registered. Please try again"
            }
        )

    }
}


//login
exports.login = async(req,res) => {
    try{
        //fetch data
        const {email,password}=req.body;

        //validation
        if(!email || !password){
            return res.status(403).json(
                {
                    success:false,
                    message:"All Fields are required"
                }
            )
        }

        //check user exist or not
        const existUser = await User.findOne({email}).populate("additionalDetails");
        if(!existUser){
            return res.status(401).json(
                {
                    success:false,
                    message:"User is not Registered with Us Please SignUp to Continue"
                }
            )
        }

        //password matching
        if(await bcrypt.compare(password,existUser.password)){
            const payload={
                email:existUser.email,
                id:existUser._id,
                accountType:existUser.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"36h"
            });
            existUser.token=token;
            existUser.password=undefined;

            //cookie
            const options={
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token",token,options).json(
                {
                    success:true,
                    token,
                    existUser,
                    message:"Logged in successfully"
                }
            )
        }
        else{
            return res.status(401).json(
                {
                    success:false,
                    message:"Password is incorrect"
                }
            )
        }


        //generate jwt after password matching


    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:"Login failure, please try again"
            }
        );
    }
}


//otp

exports.sendOtp = async(req,res) => {
    try{

        //fetch email
        const {email}=req.body;
        //check user exist or not
        const checkUser = await User.findOne({email});

        //if exist return else send otp
        if(checkUser){
            return res.status(401).json(
                {
                    success:false,
                    message:"User already exist"
                }
            )
        }

        //generate otp
        var otp=otpGenerator.generate(6,
            {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            }
        )

        //check unique otp or not
        const result = await Otp.findOne({otp:otp});
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);

        while(result){
            otp=otpGenerator.generate(6,
                {
                    upperCaseAlphabets:false
                }
            )            
        }

        //create otp object to add entry
        const otpPayload={email,otp};

        const otpBody=await Otp.create(otpPayload);
        console.log("OTP Body", otpBody);
        //return response
        res.status(200).json(
            {
                success:true,
                message:"Otp send successfully",
                otp
            }
        )


    }catch(err){
        console.log(err);
        res.status(500).json(
            {
                success:false,
                message:"Something went wrong while sending otp"
            }
        )

    }
}


//changepassword

exports.changedPassword = async(req,res) => {
    try{
        //fetch data --old,new,confirm
        const userDetails = await User.findById(req.existUser.id);
        const {oldPassword,newPassword}=req.body;
        console.log("data in change password",req.body);


        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);
        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}


        // Match password and confirm new password
        // if(password !== confirmPassword){
            // If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
        // }


       // Update password 
        const hashedPassword= await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findOneAndUpdate(
            // req.existUser.id,
            {_id:req.existUser.id},
            {password:hashedPassword},
            {new:true}
        );


       // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


        // Return success response
        return res.status(200).json(
            {
                success:true,
                message:"Password updated successfully"
            }
        )
    

    }catch(err){
        console.log(err);
        res.status(500).json(
            {
                success:false,
                message:"Error occurred while updating password"
            }
        )

    }
}

