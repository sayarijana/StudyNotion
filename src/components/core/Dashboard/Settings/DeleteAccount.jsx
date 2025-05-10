import { useDispatch, useSelector } from "react-redux";
import "./DeleteAccount.css";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import { FiTrash2 } from "react-icons/fi";

const DeleteAccount = () => {
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate =useNavigate();

    async function handleDeleteAccount() {
        try{
            dispatch(deleteProfile(token, navigate))
        }catch(error){
            console.log("ERROR MESSAGE - ", error.message);
        }
        
    }



  return (
    <>
        <div className="deleteaccount-container">
            <div className="deleteaccount-icon">
                <FiTrash2 />
            </div>

            <div className="deleteaccount-details">
                <h2>Delete Account</h2>
                <div className="deleteaccount-description">
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                </div>

                <button className="deleteaccount-button" type="button" onClick={handleDeleteAccount}>
                    I want to delete my account.
                </button>
            </div>
        </div>
    </>
  )
}

export default DeleteAccount
