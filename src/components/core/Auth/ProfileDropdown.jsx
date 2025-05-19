import { useDispatch, useSelector } from "react-redux";
import "./ProfileDropdown.css";
import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";


const ProfileDropdown = () => {
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open , setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, ()=> setOpen(false));

  if(!user) return null;
  console.log("USER : ",user);

  return (
    <button onClick={() => setOpen((prev) => !prev)} className="dropdownEntireCont">
      <div className="dropdownimgbtn">
        <img src={user?.image} alt={`profile-${user?.firstName}`}  className="dropdownProfile"/>
        <AiOutlineCaretDown size={20} className="dropdownIcon"/>
      </div>

      {
        open && (
          <div onClick={(e) => e.stopPropagation()} ref={ref} className="dropdownMenu">
            <div className="dropdownMenuDiv"
            onClick={()=> {
              navigate("/dashboard/my-profile");
              setOpen(false);
            }}>
              <VscDashboard />
              Dashboard
            </div>

            <div className="dropdownMenuDiv"
             onClick={()=>{
              console.log("logging out");
              dispatch(logout(navigate));
              setOpen(false);
            }}>
              <VscSignOut />
              Log Out
            </div>

          </div>
        )
      }
    </button>
  )
}

export default ProfileDropdown
