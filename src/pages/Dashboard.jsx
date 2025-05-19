import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"
import "./Dashboard.css"

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
    document.body.style.overflow = "auto"
  }, [location.pathname])

  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = sidebarOpen ? "hidden" : "auto"
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
        document.body.style.overflow = "auto"
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidebarOpen])

  if (profileLoading || authLoading) {
    return <div className="loading-container">Loading...</div>
  }

  return (
    <div className="dashboard-layout">
      <button
        className="hamburger-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        &#8942;
      </button>

      {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)}></div>}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </aside>

      <main
        className="main-content"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <div className="inner-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Dashboard


