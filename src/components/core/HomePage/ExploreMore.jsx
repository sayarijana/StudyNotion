import "./ExploreMore.css";
import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        //finding new course
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }



  return (
    <div className="exploreDiv">
        <div className="Exheading">
            Unlock the 
            <HighlightText text={" Power of Code"}/>
        </div>

        <div className="exsubheading">
            Learn to Build Anything You Can Imagine
        </div>

        <div className="tabscont">
            {
                tabName.map( (element,index)=>{
                    return(
                        <div key={index} className={`tabs ${currentTab === element ? "back": ""}`}
                        onClick={()=>setMyCard(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className="precard"></div>

        {/* course card  */}
        <div className="cards">
            {
                courses.map( (element,index)=>{
                    return(
                        <CourseCard
                            key={index}
                            cardData = {element}
                            currentCard= {currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>

      
    </div>
  )
}

export default ExploreMore
