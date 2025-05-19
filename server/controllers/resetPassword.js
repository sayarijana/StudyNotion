const User=require("../models/user");
const mailSender=require("../utils/mailSender");
const bcrypt=require('bcryptjs');
const crypto=require("crypto");

//reset password token(send link in mail)

exports.resetPasswordToken = async(req,res) => {
    try{
        const {email}= req.body;
        //validation
        const existUser=await User.findOne({email});

        if(!existUser){
            return res.status(400).json(
                {
                    success:false,
                    message:"Mail id not registered"
                }
            )
        }
        //generate token(by cryptoUUID),update db + expire time
        const token=crypto.randomBytes(20).toString("hex");
        const updatedDetail= await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 10*60*1000
            },
            {
                new:true
            }
        )
        console.log("DETAILS", updatedDetail);
        //create url
        const url=`http://localhost:3000/#/update-password/${token}`

        await mailSender(email, "Password Reset Link",
            `Password reset link : ${url}`
        )

        return res.status(200).json(
            {
                success:true,
                message:"Email sent successfully, check mail & change password"
            }
        )

    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:"Something went wrong while sending reset psw mail"
            }
        )
        
    }
}


//reset password

exports.resetPassword = async(req,res) => {
    try{
        const {password,confirmPassword,token}= req.body;

        console.log("pass",password);
        console.log("confirmP",confirmPassword);

        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success:false,
                    message:"Password not matched"
                }
            )
        }

        const userDetail= await User.findOne({token:token});
        console.log("user details",userDetail);

        if(!userDetail){
            return res.status(400).json(
                {
                    success:false,
                    message:"Token invalid"
                }
            )
        }

        if(!(userDetail.resetPasswordExpires > Date.now())){
            return res.status(400).json(
                {
                    success:false,
                    message:"Token expired, regenarate token"
                }
            )
        }

        //password hash
        const hashedPassword= await bcrypt.hash(password,10);

        console.log("hash pass",hashedPassword);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        return res.status(200).json(
            {
                success:true,
                message:"Password reset successfully"
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:"something wrong in password reset"
            }
        )

    }
}