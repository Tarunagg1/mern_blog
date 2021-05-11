import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div>
            <div className="sidebar">
                <div className="sidebar__element">
                    <h3>Settings</h3>
                </div>
                <div className="sidebar__element">
                    <Link to='/updatepassword'>Update password</Link>
                </div>
                <div className="sidebar__element">
                    <Link to='/updateprofile'>View & Update Profile</Link>
                </div>
            </div>
        </div>
    )
}
