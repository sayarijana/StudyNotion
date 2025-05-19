import { useSelector } from "react-redux";
import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Template.css"


function Template ({title, description1, description2, image, formType}) {
    const {loading} =useSelector((state)=>state.auth);

    return (
        <div className="tempdiv">
            {
                loading ? (
                    <div className="spinner"></div>
                
                ) : (
                    <div className="content">
                        <div className="leftcont">
                            <h1>{title}</h1>
                            <p>
                                <span className="desc1">{description1}</span>{" "}
                                <span className="desc2">{description2}</span>
                            </p>
                            {formType === "signup" ? <SignupForm /> : <LoginForm />}
                        </div>

                        <div className="imgdivTemp">
                            <img src={frameImg} alt="pattern" loading="lazy" />
                            <img src={image} alt="Students" loading="lazy" 
                            className={`img2s ${formType === "signup" ? "signup-style" : ""}`}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default Template