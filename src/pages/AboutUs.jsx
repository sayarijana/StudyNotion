import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import "./AboutUs.css";
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import Footer from '../components/common/Footer';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import ReviewSlider from '../components/common/ReviewSlider';



const AboutUs = () => {
  return (
    <div className='aboutTopCont'>

        <section className='aboutsec-1'>
            <div className='aboutSec-1div'>
                <header className='aboutHeading'>
                    Driving Innovation in Online Education for a
                    <HighlightText text={" Brighter Future"}/>
                    <p className='aboutSec-1Desc'>
                        Studynotion is at the forefront of driving innovation in online education.
                        We're passionate about creating a brighter future by offering cutting-edge courses,
                        leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                
                <div className='aboutImgDiv'>
                    <img src={BannerImage1} alt="banner1" />
                    <img src={BannerImage2} alt="banner2" />
                    <img src={BannerImage3} alt="banner3" />
                </div>
            </div>
        </section>


        <section className="quoteSection">
            <div className="quoteContainer">
                <Quote />
            </div>
        </section>


        <section>
            <div className='aboutSec-3Cont'>
                {/* left-div */}
                <div className='aboutSec-31st'>
                    <div className='aboutSec-31stleft'>
                        <h2>Our Founding Story </h2>
                        <p>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. 
                            It all began with a group of educators, technologists, and lifelong learners who recognized the 
                            need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of 
                            traditional education systems. We believed that education should not be confined to the walls 
                            of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge 
                            these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    <div className='aboutSec-31stright'>
                        <img src={FoundingStory} alt="founding story" />
                    </div>
                </div>


                {/* right-div */}
                <div className='aboutSec-32nd'>
                    <div className='aboutSec-31stleft'>
                        <h2>Our Vision</h2>
                        <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that 
                            would revolutionize the way people learn. Our team of dedicated experts worked tirelessly 
                            to develop a robust and intuitive platform that combines cutting-edge technology with engaging 
                            content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='aboutSec-31stright'>
                        <h2><HighlightText text={"Our Mission"}/></h2>
                        <p>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, 
                            where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in 
                            an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, 
                            and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>


        <StatsComponent />


        <section className="learnSection">
            <LearningGrid />
            <ContactFormSection />
        </section>

        <div className='aboutSec-7cont'>
            <h1>Reviews from other learners</h1>
            <ReviewSlider />
        </div> 


        <Footer />        
      
    </div>
  )
}

export default AboutUs
