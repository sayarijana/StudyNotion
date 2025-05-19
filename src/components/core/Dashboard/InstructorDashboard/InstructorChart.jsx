import React, { useState } from 'react';
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./InstructorChart.css";

Chart.register(...registerables);


const InstructorChart = ({ courses }) => {
    const [currChart, setCurrChart] = useState("students");

    const generateRandomColors = (numColors) =>{
        const colors = [];
        for (let i = 0; i < numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;
            colors.push(color);    
        }
        return colors;
    }

    const chartDataStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets:[
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: generateRandomColors(courses.length),                
            },
        ],
    }


    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: generateRandomColors(courses.length),
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
    }    


  return (
    <div className="InstructorChart-container">
        <p className="InstructorChart-title">Visualize</p>     
        <div className="InstructorChart-tabs">
            <button onClick={() => setCurrChart("students")}
                className={`InstructorChart-button ${
                    currChart === "students" ? "active" : ""
                }`}
            >
                Students
            </button>

            <button onClick={() => setCurrChart("income")}
                className={`InstructorChart-button ${
                    currChart === "income" ? "active" : ""
                }`}
            >
                Income
            </button>
        </div>  

        <div className="InstructorChart-chartWrapper">
            <Pie options={options}
                data={currChart === "students" ? chartDataStudents : chartIncomeData}
            />
        </div>       
    </div>
  )
}

export default InstructorChart
