
import "./Button.css"
import { Link } from "react-router-dom"

import React from 'react'

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto} className="link">
        <div className={`btn ${active ? "active":""}`}>
            {children}
        </div>
    </Link>
  )
}

export default Button
