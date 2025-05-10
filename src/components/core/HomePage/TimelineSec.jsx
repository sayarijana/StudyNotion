import "./TimelineSec.css"
import React from 'react'
import timelineImage from "../../../assets/Images/TimelineImage.png";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeline = [
    {
        Logo:logo1,
        heading:"Leadership",
        Desc:"Fully committed to the success company"
    },
    {
        Logo:logo2,
        heading:"Responsibility",
        Desc:"Students will always be our top priority"
    },
    {
        Logo:logo3,
        heading:"Flexibility",
        Desc:"The ability to switch is an important skills"
    },
    {
        Logo:logo4,
        heading:"Solve the problem",
        Desc:"Code your way to a solution"
    }

]

const TimelineSec = () => {
  return (
    <div className="timeline">

        <div className="divcont">
            <div className="leftcont">
                {
                    timeline.map( (element, index) => {
                        return(
                            <div className="eachEle" key={index}>
                                <div className="logoImg"> 
                                    <img src={element.Logo} alt="" />
                                </div>

                                <div className="logotext">
                                    <h4 className="logoheading">{element.heading}</h4>
                                    <p className="logodesc">{element.Desc}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className="rightcont">
                <img src={timelineImage} alt="" className="image"/>

                <div className="overlap">
                    <div className="gbox1">
                        <h1 className="gboxh">10</h1>
                        <p className="gboxp">years experience</p>
                    </div>
                    <div className="gbox2">
                        <h1 className="gboxh">250</h1>
                        <p className="gboxp">types of courses</p>
                    </div>
                </div>

            </div>
            
        </div>


        <div></div>
      
    </div>
  )
}

export default TimelineSec
