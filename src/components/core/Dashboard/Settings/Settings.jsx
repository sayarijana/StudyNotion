import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import "./Settings.css";
import React from 'react';
import UpdatePasswordProfile from "./UpdatePasswordProfile";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <div className="settings-container">
        <h1 className="settings-title">Edit Profile</h1>

        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePasswordProfile />
        <DeleteAccount />        
    </div>
  )
}

export default Settings
