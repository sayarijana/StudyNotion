import React, { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, FreeMode, Pagination}  from 'swiper/modules';
import ReactStars from 'react-stars';
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/api';
import { FaStar } from "react-icons/fa";
import "./ReviewSlider.css";

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(()=>{
        ;(async()=>{
            const {data} = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            );
            if(data?.success){
                setReviews(data?.data);
                console.log("reviews",data.data);
            }
        })()
    },[]);

  return (
    <div className="ReviewSlider-container">
      <div className="ReviewSlider-wrapper">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          loop={reviews.length >1}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
            {
                reviews.map((review,i)=>(
                    <SwiperSlide key={i}>
                        <div className="ReviewSlider-slide">
                            <div className="ReviewSlider-header">
                                <img src={review?.user?.image ? review?.user?.image : 
                                   ` https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}%20s${review?.user?.lastName}`
                                  } alt="user" 
                                  className="ReviewSlider-avatar"
                                />

                                <div className="ReviewSlider-userInfo">
                                    <h1 className="ReviewSlider-userName">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                    <h2 className="ReviewSlider-courseTitle">{review?.course?.title}</h2>
                                </div>
                            </div>
                            <p className="ReviewSlider-reviewText">
                                {
                                    review?.review.split(" ").length > truncateWords ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...` :`${review?.review}`
                                }
                            </p>

                            <div className="ReviewSlider-ratingWrapper">
                                <h3 className="ReviewSlider-ratingValue">{review.rating.toFixed(1)}</h3>
                                <ReactStars count={5} value={review.rating} size={20} edit={false}
                                   activeColor="#ffd700" emptyIcon={<FaStar />}  fullIcon={<FaStar />}
                                />
                            </div>
                        </div>

                    </SwiperSlide>
                ))
            }
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
