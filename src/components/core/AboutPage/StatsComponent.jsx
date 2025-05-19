import "./StatsComponent.css";
import React from 'react'


const Stats = [
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    }
]

const StatsComponent = () => {
  return (
    <div className="stats-bg">
        <div className="stats-wrapper">
            <div className="stats-grid">
                {
                    Stats.map((data,index)=>(
                        <div key={index} className="stats-item">
                            <h2 className="stats-count">{data.count}</h2>
                            <p className="stats-label">{data.label}</p>
                        </div>
                    ))
                }

            </div>

        </div>

    </div>
  )
}

export default StatsComponent
