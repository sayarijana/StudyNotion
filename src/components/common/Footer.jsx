import "./Footer.css";
import React from 'react';
import { Link } from "react-router-dom";
import {FooterLink2} from "../../data/footer-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];



const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-content">
            <div className="footer-section">
                {/* sec-1 */}
                <div className="footer-left-half">
                <div  className="footer-column">
                    <div className="footer-logo">
                        <img src={Logo} alt="Company Logo"/>                            
                    </div>

                    <h1>Company</h1>

                    <div>
                        {
                            ["About", "Careers", "Affiliates"].map( (ele,i)=>(
                                <Link key={i} to={ele.toLowerCase()} className="footer-link">
                                    {ele}
                                </Link>
                            ))
                        }
                    </div>

                    <div className="social-icons">
                        <FaFacebook className="social-icon"/>
                        <FaGoogle className="social-icon"/>
                        <FaTwitter className="social-icon"/>
                        <FaYoutube className="social-icon"/>
                    </div>
                </div>

                <div className="footer-column">
                    <h1>Resources</h1>
                    {
                        Resources.map((ele,index)=>(
                            <Link key={index}
                            to={ele.split(" ").join("-").toLowerCase()}
                            className="footer-link"
                            >{ele}</Link>
                        ))
                    }

                    <h1>Support</h1>
                    <Link to="/help-center" className="footer-link">
                        Help Center
                    </Link>

                </div>

                <div className="footer-column">
                    <h1>Plans</h1>

                    {
                        Plans.map((ele, index) => (
                            <Link
                              key={index}
                              to={ele.split(" ").join("-").toLowerCase()}
                              className="footer-link"
                            >
                              {ele}
                            </Link>
                        ))
                    }

                    <h1>Community</h1>
                    {
                        Community.map((ele, index) => (
                            <Link
                              key={index}
                              to={ele.split(" ").join("-").toLowerCase()}
                              className="footer-link"
                            >
                              {ele}
                            </Link>
                        ))
                    }

                </div>
                </div>



                <div className="footer-right-half">
                    {
                        FooterLink2.map((ele,i)=>(
                            <div key={i} className="footer-column">
                                <h1>{ele.title}</h1>
                                {
                                    ele.links.map((link,index)=>(
                                        <Link key={index}
                                        to={link.link}
                                        className="footer-link"
                                        >
                                            {link.title}
                                        </Link>
                                    ))
                                }
                            </div>
                        ))
                    }

                </div>

            </div>
        </div> 


        <div className="footer-bottom">
            <div className="footer-bottom-left">
                {
                    BottomFooter.map((ele,i)=>(
                        <div key={i} className="footer-bottom-link">
                            <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                            {i < BottomFooter.length -1 && <span>|</span>}
                        </div>
                    ))
                }
            </div>
            <div>Made with ❤️ © StudyNotion</div>

        </div> 




    </div>
  )
}

export default Footer
