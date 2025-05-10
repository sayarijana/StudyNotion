// Import the required modules
const express = require("express")
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {getCourseDetails,getAllCourses,createCourse,editCourse, deleteCourse,
    getInstructorCourses, getFullCourseDetails} = require("../controllers/Course");


// Categories Controllers Import
const {createCategory,showAllCategories,categoryPageDetails} = require("../controllers/Category");


// Sections Controllers Import
const {deleteSection ,updateSection ,createSection } = require("../controllers/Section");

// Sub-Sections Controllers Import
const {updateSubSection,deleteSubSection, createSubSection} = require("../controllers/SubSection");

// Rating Controllers Import
const {createRatingAndReview,getAvgRatingsAndReview,getAllRatingsAndReview } = require("../controllers/RatingAndReview");

// Importing Middlewares
const {auth,isStudent,isInstructor,isAdmin } = require("../middlewares/Auth");

const {updateCourseProgress}=require("../controllers/courseProgress");



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse",auth,isInstructor,createCourse);
//Add a Section to a Course
router.post("/addSection",auth,isInstructor,createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
//add Sub Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Edit Course routes
router.post("/editCourse",auth, isInstructor, editCourse);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor,getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAvgRatingsAndReview);
router.get("/getReviews", getAllRatingsAndReview);

module.exports = router