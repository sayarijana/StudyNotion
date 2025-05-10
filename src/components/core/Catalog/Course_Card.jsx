import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import "./Course_Card.css";

const Course_Card = ({course}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReview);
        setAvgReviewCount(count);
    },[course]);

  return (
    <div className="course-card-container">
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img src={course?.thumbnail} alt="course  thumbnail" className="course-card-image"/>
                </div>
                <div className="course-card-details">
                    <p className="course-card-title">{course?.title}</p>
                    <p className="course-card-instructor">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className="course-card-rating">
                        <span className="course-card-rating-count">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="course-card-rating-text">{course?.ratingAndReview?.length} Ratings</span>
                    </div>
                    <p className="course-card-price">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
      
    </div>
  )
}

export default Course_Card
