
import React from 'react'
import "./CodeBlocks.css"
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position , heading, subheading, ctabutton1, ctabutton2, codeblock, bgGradient}) => {
  return (
    <div className={`fullSec ${position?"row":"row-reverse"}`}>
        {/* sec-1 */}
        <div className='codeSec'>
            {heading}
            <div className='subh' >
                {subheading}
            </div>

            <div className='codebtn'>
                <CTAButton active={ctabutton1.active} linkto={ctabutton1.linkto}>
                    <div className='trybtn'>
                        {ctabutton1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabutton2.active} linkto={ctabutton2.linkto}>
                    {ctabutton2.btnText}
                </CTAButton>

            </div>


        </div>

        {/* sec-2 */}

        <div className='sec2'>
            {/* hw:bg gradient */}
            
            <div className='codeline'>
                {Array.from({ length: 11 }, (_, i) => <p key={i}>{i + 1}</p>)}
            </div>

            <div className='codetext'>
                
                <TypeAnimation 
                    sequence={[codeblock, 1000 , ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                />
            </div>

        </div>
    
    </div>
  )
}

export default CodeBlocks
