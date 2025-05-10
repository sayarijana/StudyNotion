
import React from 'react'
import './Home.css'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimelineSec from '../components/core/HomePage/TimelineSec';
import LearningLanguageSec from '../components/core/HomePage/LearningLanguageSec';
import InstructorSec from '../components/core/HomePage/InstructorSec';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';


const Home = () => {
  return (
    <div>
        {/* section -1 */}
        <div className='sec-1'>
            <Link to={"/signup"} className='link'>
                <div className='outerb'>
                    <div className='innerb'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='bheading'>
                empower your future with 
                <HighlightText text={" coding skills"} />
            </div>

            <div className='bdesc'>
                With our online coding courses, you can learn at your own pace, from anywhere in the  
                world, and get access to a wealth of resources,  including hands-on projects, quizzes,
                and personalized feedback from instructors.
            </div>

            <div className='buttondiv'>
                <CTAButton active={true} linkto={"/signup"}>
                    learn more
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    book demo
                </CTAButton>

            </div>

            <div className='vdodiv'>
                <video muted loop autoPlay className='vdo'>
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* code-sec-1 */}
            <div className='code-sec-1'>
                <CodeBlocks 
                    heading={
                        <div className='codeheading'>
                            Unlock your 
                            <HighlightText text={" coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."                       
                    }
                    ctabutton1={
                        {
                            btnText:"try it yourself",
                            linkto:"/signup",
                            active: true
                        }
                    }

                    ctabutton2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active: false
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><ahref="two/">Two</\na><a href="three/">Three</a>\n/nav>`
                    }
                    position={true}
                />
            </div>

             {/* code-sec-2 */}
            <div className='code-sec-2'>
                <CodeBlocks 
                    heading={
                        <div className='codeheading'>
                            Start 
                            <HighlightText text={
                                " coding in"
                            }/><br/>
                            <HighlightText text={
                                " secondes"
                            }/>
                        </div>
                    }
                    subheading={
                      "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."                       
                    }
                    ctabutton1={
                        {
                            btnText:"continue lesson",
                            linkto:"/signup",
                            active: true
                        }
                    }

                    ctabutton2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active: false
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><ahref="two/">Two</\na><a href="three/">Three</a>\n/nav>`
                    }
                    position={false}

                />
            </div>

            <ExploreMore />

        </div>


        {/* section -2 */}
        <div className='sec-2'>
            <div className='homepage-bg'>
                <div className='hmcont'>
                    <div className='hmcont-pre-sec-21btn'></div>
                    <div className='sec-21btn'>
                        <CTAButton active={true} linkto={"/signup"} >
                            <div className='exbtn'>
                                explore full catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                           learn more
                        </CTAButton>
                    </div>
                </div>

            </div>

            <div className='hmcont'>
                <div className='sec-22tb'>
                    <div className='sec-221h'>
                        Get the skills you need for a 
                        <HighlightText text={" job that is in demand."}/>
                    </div>

                    <div className='sec-222t'>
                        <div className='textcnt'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>learn more</div>
                        </CTAButton>
                    </div>
   
                </div>
            </div>

            <TimelineSec />

            <LearningLanguageSec />

        </div>
            

    
    

        {/* section -3 */}
        <div className='sec-3'>

            <InstructorSec />           

           <div className='sec-32'>
                <div className='sec-32heading'>
                    Reviews from other learners
                </div>

                {/* review slider */}
                <ReviewSlider />

            </div>
        </div>

        {/* Footer */}
        <Footer/>
      
    </div>
  );
}

export default Home

