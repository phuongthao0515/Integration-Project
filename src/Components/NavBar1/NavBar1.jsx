import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar1.scss';

import profilePic from '../../assets/profile-pic.jpeg';
import homePic from '../../assets/home.png';
import todayPic from '../../assets/today.png';
import upcomingPic from '../../assets/upcoming.png';
import inboxPic from '../../assets/inbox.png';
import projectPic from '../../assets/project.png';
import chatPic from '../../assets/chat.png';
import Dropdown from '../Dropdown/Dropdown';
import NoteInput from '../Input/NoteInput';
import PlanInput from '../Input/PlanInput';

const NavBar1 = () => {
    const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
    const [isPlanInputOpen, setIsPlanInputOpen] = useState(false);

    const openNoteInput = () => {
        setIsNoteInputOpen(true);
    };

    const closeNoteInput = () => {
        setIsNoteInputOpen(false);
    };

    const openPlanInput = () => {
        setIsPlanInputOpen(true);
    };

    const closePlanInput = () => {
        setIsPlanInputOpen(false);
    };

    return (
        <div className="navbar-container">
            <header className="header">
                <div className="profile">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <span className="profile-name">Phuc Tran</span>
                </div>
                <nav className="navbar">
                    <Dropdown onAddNote={openNoteInput} onAddPlan={openPlanInput} />
                    <div className="nav-item">
                        <img src={homePic} alt="Home" className="nav-icon" />
                        <Link to="/">Home</Link>
                    </div>
                    <div className="nav-item">
                        <img src={todayPic} alt="Today" className="nav-icon" />
                        <Link to="/today">Today</Link>
                    </div>
                    <div className="nav-item">
                        <img src={upcomingPic} alt="Upcoming" className="nav-icon" />
                        <Link to="/upcoming">Upcoming</Link>
                    </div>
                    <div className="nav-item">
                        <img src={inboxPic} alt="Inbox" className="nav-icon" />
                        <Link to="/inbox">Inbox</Link>
                    </div>
                    <div className="nav-item">
                        <img src={projectPic} alt="Project" className="nav-icon" />
                        <Link to="/projects">My projects</Link>
                    </div>
                    <div className="spacer"></div>
                    <div className="chat-box">
                        <img src={chatPic} alt="Chat" className="nav-icon" />
                        <Link to="/chat">Chat</Link>
                    </div>
                </nav>
            </header>
            <NoteInput isOpen={isNoteInputOpen} onClose={closeNoteInput} />
            <PlanInput isOpen={isPlanInputOpen} onClose={closePlanInput} />
        </div>
    );
};

export default NavBar1;
