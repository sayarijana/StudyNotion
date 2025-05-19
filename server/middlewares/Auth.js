const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/user");

//authentication -- jwt token verification
//token extract from -- body,cookie,header

exports.auth = async(req, res, next)=> {
    try{
        console.log("BEFORE ToKEN EXTRACTION");
        // console.log("Received Headers:", req.headers);
        // console.log("Authorization Header:", req.headers.authorization);


        //extract token
        const token = req.cookies.token 
                      || req.body.token
                      ||req.header("authorization").replace("Bearer ","");

        console.log("AFTER ToKEN EXTRACTION");   

        //if token missing, then return response
        if(!token){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token is missing"
                }
            )
        } 
        
        //verify token
        try{
            const decode= jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token verified:", decode);
            req.existUser=decode;
        }catch(err){
            //verification - issue
            return res.status(401).json(
                {
                    success:false,
                    message:"token is invalid"
                }
            )
        }

        next();
        

    }catch(err){
        console.log("token not extract");
        return res.status(401).json(
            {
                success:false,
                message:"Something went wrong while validating"
            }
        )

    }

}



//isStudent

exports.isStudent = async(req,res,next) => {
    try{

        if(req.existUser.accountType !== "Student"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is protected route for Student only"
                }
            )
        }        


        next();


    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"User  role cannot be verified"
            }
        )

    }
}


//isInstructor

exports.isInstructor = async(req,res,next) => {
    try{

        if(req.existUser.accountType !== "Instructor"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is protected route for Instructor only"
                }
            )
        }        


        next();


    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"User  role cannot be verified"
            }
        )

    }
}



//isAdmin
exports.isAdmin = async(req,res,next) => {
    try{

        if(req.existUser.accountType !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is protected route for Admin only"
                }
            )
        }        


        next();


    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:"User  role cannot be verified"
            }
        )

    }
}



