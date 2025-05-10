import React, { useEffect, useRef, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi";
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import "./Upload.css";


const Upload = ({name, label, register, setValue, errors, video=false, viewData = null, editData = null}) => {
    // const {course} = useSelector((state)=>state.course);
    const [selectedFile, setSelectedFile]=useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    );
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) =>{
        const file = acceptedFiles[0];
        if(file){
            previewFile(file);
            setSelectedFile(file);
        }
    }
    // isDragActive
    const {getRootProps, getInputProps,isDragActive } = useDropzone({
        accept: video ? "video/mp4" : "image/jpeg, image/png, image/jpg",
        onDrop,
    })

    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        } 
    }

    useEffect(()=>{
        register(name,{required: true})
    },[register,name])

    useEffect(()=>{
        setValue(name,selectedFile);
    },[selectedFile, setValue,name]);

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
    };


  return (
    <div className="upload-container">
        <label htmlFor={name} className="upload-label">{label}{!viewData && <sup>*</sup>}</label>
        <div className={`upload-box ${isDragActive ? "drag-active" : ""}${previewSource ? "uploaded" : ""}`}>
            {
                previewSource ? (
                    <div className="upload-preview">
                        {
                            !video ? (
                                <img src={previewSource} alt="Preview" />
                            ) : (
                                <Player src={previewSource} playsInline aspectRatio="16:9" className="upload-player-vdo"/>
                            )
                        }
                        {
                            !viewData && (
                                <button type='button' 
                                  className="upload-cancel-btn"
                                  onClick={() => { 
                                    setPreviewSource("")
                                    setSelectedFile(null)
                                    setValue(name, null)
                                  }}
                                >
                                    Cancel
                                </button>
                            )
                        }
                    </div>
                ) : (
                    <div className="upload-drop-area"  {...getRootProps()} onClick={handleClick} >
                        <input {...getInputProps()} ref={inputRef} />
                        <div className="upload-icon-container">
                            <FiUploadCloud className="upload-icon" size={50} onClick={handleClick} />
                        </div>
                        <p className="upload-instructions">
                            Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                            <span>Browse</span> a file      
                        </p>
                        <ul className="upload-guidelines">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>

                    </div>
                )
            }
        </div>
        {
            errors[name] && (
                <span className="upload-error">{label} is required</span>
            )
        }
      
    </div>
  )
}

export default Upload
