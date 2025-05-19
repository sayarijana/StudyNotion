import { useDispatch, useSelector} from "react-redux";
import "./ChangeProfilePicture.css";
import React, { useEffect, useRef } from 'react'
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtnComm from "../../../common/IconBtnComm";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";
const ChangeProfilePicture = () => {
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = () => {
      fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
          setImageFile(file)
          previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
          console.log("uploading...")
          setLoading(true)
          const formData = new FormData()
          formData.append("displayPicture", imageFile)
          // console.log("formdata", formData)
          dispatch(updateDisplayPicture(token, formData)).then(() => {
            setLoading(false)
          })
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(()=>{
        if(imageFile){
            previewFile(imageFile);
        }
    },[imageFile]);




  return (
    <div className="changeprofile-container">
        <div className="changeprofile-content">
            <img src={previewSource || user?.image} alt={`changeProfile-${user?.firstName}`} 
              className="changeprofile-image"
            />

            <div className="changeprofile-info">
                <p className="changeprofile-title">Change Profile Picture</p>
                <div className="changeprofile-actions">
                    <input type="file" ref={fileInputRef}  
                       onChange={handleFileChange} 
                       accept="image/png, image/gif, image/jpeg, image/jpg"
                       className="changeprofile-hidden-input"
                    />

                    <button onClick={handleClick}
                       disabled={loading} className="changeprofile-select-btn"
                    >
                        Select
                    </button>

                    <IconBtnComm text={loading ? "Uploading..." :"Upload"}
                      onclick={handleFileUpload}
                    >
                        {
                        !loading && (
                            <FiUpload className="changeprofile-upload-icon"/>
                        )
                    }
                    </IconBtnComm>

                    
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ChangeProfilePicture
