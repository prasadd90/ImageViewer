import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const MasterPage = () => {
    const [isStudentSubmenuOpen, setStudentSubmenuOpen] = useState(false);
    const [isTeacherSubmenuOpen, setTeacherSubmenuOpen] = useState(false);
    const toggleStudentSubmenu = () => setStudentSubmenuOpen(!isStudentSubmenuOpen);
    const toggleTeacherSubmenu = () => setTeacherSubmenuOpen(!isTeacherSubmenuOpen);

    return (
        
        <div className="container d-flex">
            <div className="sidebar" id="sidebar" style={{'width':'10%', 'weight':'40px'}}>
                <h2 className="text-white">School Admin</h2>
                <a href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                <a href="#" onClick={toggleStudentSubmenu}><i className="fas fa-user-graduate"></i> Students</a>
                <div className={`submenu ${isStudentSubmenuOpen ? 'show' : ''}`}>
                    <a href="#"><i className="fas fa-users"></i> Manage Students</a>
                    <a href="#"><i className="fas fa-user-plus"></i> Add Student</a>
                </div>
                <a href="#" onClick={toggleTeacherSubmenu}><i className="fas fa-chalkboard-teacher"></i> Teachers</a>
                <div className={`submenu ${isTeacherSubmenuOpen ? 'show' : ''}`}>
                    <a href="#"><i className="fas fa-users"></i> Manage Teachers</a>
                    <a href="#"><i className="fas fa-user-plus"></i> Add Teacher</a>
                </div>
                <a href="#"><i className="fas fa-book"></i> Courses</a>
                <a href="#"><i className="fas fa-calendar-alt"></i> Events</a>
                <a href="#"><i className="fas fa-cog"></i> Settings</a>
            </div>
            <div className="content">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" onClick={() => document.getElementById('sidebar').classList.toggle('active')}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">School Admin</a>
                </nav>
                <h1>Welcome to the School Admin Dashboard</h1>
                <p>Manage your school effectively with our administrative tools.</p>

                <h2>Add Student</h2>
                <form className="needs-validation" noValidate>
                    <div className="form-group">
                        <label htmlFor="studentName">Student Name</label>
                        <input type="text" className="form-control" id="studentName" required />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">Please provide a valid name.</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Student</button>
                </form>
            </div>
        </div>
    );


};
export default MasterPage;