import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay,FreeMode,Pagination}  from 'swiper/modules';
import CourseCard from './Course_Card';
import "./CourseSlider.css";


const CourseSlider = ({Courses}) => {
  console.log("course slider",Courses);
  return (
    <div className="course-slider-container">
        {
            Courses?.length ? (
                <Swiper
                  slidesPerView={1}
                  loop={true}
                  spaceBetween={500}
                  pagination={ true }
                  modules={[Autoplay,Pagination,FreeMode]}
                  className='mySwiper'
                  autoplay={
                    {
                        delay:500,
                        disableOnInteraction:false
                    }
                  }
                  freeMode={true}
                  breakpoints={
                    {
                        1024:{slidesPerView:3}
                    }
                  }
                >
                    {
                        Courses?.map((course, index)=>(
                            <SwiperSlide key={index}>
                                <CourseCard course={course} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            ) 
            :(
                <p className="no-course-message">No Course Found</p>
            )
        }
      
    </div>
  )
}

export default CourseSlider
