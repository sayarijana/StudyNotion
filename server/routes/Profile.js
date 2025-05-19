const express = require("express")
const router = express.Router()

const {updateProfile,deleteAccount,getAllUsers,updateDisplayPicture,getEnrolledCourses,instructorDashboard} = require("../controllers/profile");

const {auth, isInstructor}=require("../middlewares/Auth");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUsers);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard",auth, isInstructor,instructorDashboard);

module.exports = router;