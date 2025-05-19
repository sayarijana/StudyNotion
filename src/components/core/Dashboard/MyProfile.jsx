import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtnComm from '../../common/IconBtnComm';
import { FaRegEdit } from "react-icons/fa";
import "./MyProfile.css";

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();

  return (
    <div className="profile-container">
        <h1>My Profile</h1>


        {/* sec-1 */}
        <div className='my-profile-s-1'>
            <div>
                <img src={user?.image} alt={`myprofile-${user?.firstName}`} className='my-profile-s-1Img' />

                <div>
                    <p className='firstChildProfile'>{user?.firstName +" "+ user?.lastName}</p>
                    <p className='lastChildProfile'>{user?.email}</p>
                </div>
            </div>

            <IconBtnComm 
                text="Edit" onclick={()=> {navigate("/dashboard/settings")}}
            >
                <FaRegEdit />
            </IconBtnComm>
        </div>

        {/* sec-2 */}
        <div className='my-profile-s-2'>
            <div className='myprofile-left-right'>
                <p  className='firstChildProfile'>About</p>
                <IconBtnComm 
                    text="Edit" onclick={()=> {navigate("/dashboard/settings")}}
                >
                    <FaRegEdit />
                </IconBtnComm>
                
            </div>

            <p className='lastChildProfile'>
                {
                    user?.additionalDetails?.about ? `${user?.additionalDetails?.about}` : "Write Something About Yourself"
                }
            </p>
        </div>

        {/* sec-3 */}
        <div className='my-profile-s-3'>
            <div class="profile-header">
                <p>Personal Details</p>
                <IconBtnComm 
                    text="Edit" onclick={()=> {navigate("/dashboard/settings")}}
                >
                    <FaRegEdit />
                </IconBtnComm>
            </div>

            <div class="profile-details-container">
                <div class="profile-details-column">
                    <div>
                        <p  className='firstChildProfile'>First Name</p>
                        <p className='lastChildProfile'>{user?.firstName}</p>
                    </div>
                    <div>
                        <p  className='firstChildProfile'>Email</p>
                        <p className='lastChildProfile'>{user?.email}</p>
                    </div>
                    <div>
                        <p  className='firstChildProfile'>Gender</p>
                        <p className='lastChildProfile'>{user?.additionalDetails?.gender ? `${user?.additionalDetails?.gender}` : "Add Your Gender"}</p>
                    </div>
                    
                </div>

                <div class="profile-details-column">
                    <div>
                        <p  className='firstChildProfile'>Last Name</p>
                        <p className='lastChildProfile'>{user?.lastName}</p>
                    </div>
                    <div>
                        <p  className='firstChildProfile'>Phone Number</p>
                        <p className='lastChildProfile'>{user?.additionalDetails?.contactNumber ? `${user?.additionalDetails?.contactNumber}` : "Add Contact Number"}</p>
                    </div>
                    <div>
                        <p  className='firstChildProfile'>Date of Birth</p>
                        <p className='lastChildProfile'>{user?.additionalDetails?.dob ? `${user?.additionalDetails?.dob}` : "Add Your DOB"}</p>
                    </div>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default MyProfile
