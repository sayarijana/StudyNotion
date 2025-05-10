import React, { useState } from 'react';
import "./Sidebar.css";
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLinks from './SidebarLinks';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';



const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state)=>state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
        return(
            <div>
                loading...
            </div>
        )
    }


  return (
    <div className='sidebarCont'>
        <div className='sidebar-links'>
            {
                sidebarLinks.map((link,index)=>{
                    if(link.type && user?.accountType !== link.type) return null;
                    return(
                        <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>

        {/*for  horizontal line */}
        <div className="sidebar-divider"></div>

        <div className="sidebar-bottom">
            <SidebarLinks link={{name:"Settings", path:"dashboard/settings"}}
                iconName="VscSettingsGear"
            />

            <button className="logout-btnSide"
            onClick={()=>setConfirmationModal(
                {
                    text1:"Are You Sure ?",
                    text2:"You will be logged out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                }
            )}
            >
                <div className="logout-btnSideDiv">
                    <VscSignOut size={20}/>
                    <span>Logout</span>
                </div>
            </button>
        </div>

        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
              
    </div>
  )
}

export default Sidebar
