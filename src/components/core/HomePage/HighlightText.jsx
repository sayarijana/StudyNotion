import React from 'react'
import "./HighlightText.css"

const HighlightText = ({text}) => {
  return (
    <span className='headcolortext'>
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
