import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import "./Quote.css";

const Quote = () => {
  return (
    <div className='aboutsec-2'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology"}/>,{" "}
        <span className='aboutsec-2span1'>{" "} expertise</span>
        , and community to create an
        <span className='aboutsec-2span2'>{" "}unparalleled educational experience.</span>      
      
    </div>
  )
}

export default Quote
