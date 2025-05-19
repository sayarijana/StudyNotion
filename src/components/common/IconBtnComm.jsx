import React from 'react';
import "./IconBtnComm.css";

const IconBtnComm = (
    {
        text,
        onclick,
        children,
        disabled,
        outline=false,
        customClasses,
        type
    }
) => {
  return (
    <button className={`iconbtnComm ${outline ? "outline" : ""} ${customClasses || ""}`}
    disabled={disabled} onClick={onclick}
    type={type} >
        {
            children ? (
                <>
                   <span>{text}</span>
                   {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtnComm
