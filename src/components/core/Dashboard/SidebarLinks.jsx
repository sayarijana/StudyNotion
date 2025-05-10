import React from 'react';
import * as Icons from "react-icons/vsc";
// import { useDispatch } from 'react-redux';
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import "./SidebarLinks.css";


const SidebarLinks = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    // const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <NavLink to={link.path} className={`sidebar-link ${matchRoute(link.path) ? "changeBgSidebar" : ""}`}>
        <span className="sidebar-indicator"></span>
        <div className="sidebarL-content">
            <Icon className="sidebar-icon" />
            <span className="sidebar-text">{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLinks
