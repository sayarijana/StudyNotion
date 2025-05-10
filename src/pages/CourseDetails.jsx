import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/common/Footer';
import RatingStars from '../components/common/RatingStars';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import ReactMarkdown from 'react-markdown';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../services/formatDate';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import "./CourseDetails.css";
import { buyCourse } from '../services/operations/studentFreaturesAPI';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants';
import { addToCart } from '../slices/cartSlice';



const CourseDetails = () => {
    const { token }= useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const {loading} = useSelector((state)=>state.profile);
    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState(Array(0));
    const {user} = useSelector((state)=>state.profile);

    useEffect(()=>{
        const getCourseFullDetils = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                setResponse(result);
            }catch(err){
                console.log("Could not fetch course details");
            }
        }

        getCourseFullDetils();
    },[courseId]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReview);
        setAvgReviewCount(count);
    },[response]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=>{
        let lectures=0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[response]);

    if (loading || !response){
        return(
            <div>
                <div className="CourseDetails-loading">loading.....</div>
            </div>
        )
    }

    if (!response.success) {
        return <Error />
    }

    const {
        _id: course_id,
        title,
        desc,
        thumbnail,
        price,
        whatWillLearn,
        courseContent,
        ratingAndReview,
        instructor,
        studentEnrolled,
        createdAt,
    } = response.data?.courseDetails;

    
    const handleActive = (id) => {
        setIsActive(
          !isActive.includes(id)
            ? isActive.concat([id])
            : isActive.filter((e) => e !== id)
        )
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.");
            return;
        }
    
        if (token) {
            dispatch(addToCart(response?.data?.courseDetails));
            return;
        }
    
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };



    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], navigate, dispatch);
            return;
        }
        setConfirmationModal(
            {
                text1:"You are not logged in!",
                text2:"Please login to Purchase Course.",
                btn1Text: "Login",
                btn2Text:"Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler:() => setConfirmationModal(null),
            }
        )
    }

      
  return (
    <div>
        <div className="CourseDetails-main-container">
            {/* Hero Section */}
            <div className="CourseDetails-hero-section">
                <div lassName="CourseDetails-hero-content">
                    <div className="CourseDetails-thumbnail-mobile">
                        <div className="CourseDetails-thumbnail-shadow"></div>
                        <img src={thumbnail} alt="course thumbnail" className="CourseDetails-thumbnail-image" />
                    </div>

                    <div className="CourseDetails-text-content">
                        <div>
                            <p className="CourseDetails-course-name">{title}</p>
                        </div>
                        <p className="CourseDetails-course-description">{desc}</p>
                        <div className="CourseDetails-review-details">
                            <span className="CourseDetails-review-count">{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                            <span>{`(${ratingAndReview.length} reviews) `}</span>
                            <span>{`(${studentEnrolled.length} students enrolled)`}</span>
                        </div>
                        <div>
                            <p className="CourseDetails-instructor-name">Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <div  className="CourseDetails-course-info">
                            <p className="CourseDetails-created-at">{" "}<BiInfoCircle /> Created At {formatDate(createdAt)}</p>
                            <p className="CourseDetails-language">{" "} <HiOutlineGlobeAlt /> English</p>
                        </div>
                        
                    </div>

                    <div className="CourseDetails-buy-section-mobile">
                        <p className="CourseDetails-price-mobile">Rs. {price}</p>
                        <button className="CourseDetails-buy-button-mobile" onClick={handleBuyCourse}>Buy Now</button>
                        <button className="CourseDetails-cart-button-mobile" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>

                {/* Courses Card */}
                <div className="CourseDetails-card-container">
                    <CourseDetailsCard 
                        course={response?.data?.courseDetails}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>

            </div>
        </div>

        <div className="CourseDetails-details-section">
            <div className="CourseDetails-details-content">
                {/* What will you learn section */}
                <div className="CourseDetails-learn-section">
                    <p className="CourseDetails-learn-title">What you'll learn</p>
                    <div className="CourseDetails-learn-markdown">
                        <ReactMarkdown>{whatWillLearn}</ReactMarkdown>
                    </div>
                </div>

                {/* Course Content Section */}
                <div className="CourseDetails-content-section">
                    <div className="CourseDetails-content-header">
                        <p className="CourseDetails-content-title">Course Content</p>
                        <div className="CourseDetails-content-info">
                            <div className="CourseDetails-content-stats">
                                <span>{courseContent.length} section(s)</span>
                                <span>{totalNoOfLectures} lecture(s)</span>
                                <span>
                                    {response?.data?.totalDuration} total length
                                </span>
                            </div>

                            <div>
                                <button className="CourseDetails-collapse-button" onClick={() => setIsActive([])}>Collapse all sections</button>
                            </div>
                        </div>
                    </div>

                    {/* Course Details Accordion */}
                    <div className="CourseDetails-accordion-section">
                        {
                            courseContent?.map((course,index)=>(
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))
                        }
                    </div>

                    {/* Author Details */}
                    <div className="CourseDetails-author-section">
                        <p className="CourseDetails-author-title">Author</p>
                        <div className="CourseDetails-author-info">
                            <img src={instructor.image ? instructor.image
                                : `https://api.authorizationear.com/5.x/initials/svg?seed=${instructor.firstName}%20s${instructor.lastName}`
                              } 
                              alt="Author"
                              className="CourseDetails-author-image"
                            />
                            <p className="CourseDetails-author-name">{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>
                        <p  className="CourseDetails-author-about">{instructor?.additionalDetails?.about}</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>


  )
}

export default CourseDetails
