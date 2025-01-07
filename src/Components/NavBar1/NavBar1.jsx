import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar1.scss';

import profilePic from '../../assets/profile-pic.jpeg';
import homePic from '../../assets/home.png';
import todayPic from '../../assets/today.png';
import upcomingPic from '../../assets/upcoming.png';
import inboxPic from '../../assets/inbox.png';
import chatPic from '../../assets/chat.png';
import Dropdown from '../Dropdown/Dropdown';
import NoteInput from '../Input/NoteInput';
import PlanInput from '../Input/PlanInput';
import Setting from '../Setting/Setting';
import NoteList from '../NoteList/NoteList';

const NavBar1 = () => {
    const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
    const [isPlanInputOpen, setIsPlanInputOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
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

    const openSetting = () => {
        setIsSettingOpen(true);
    };

    const closeSetting = () => {
        setIsSettingOpen(false);
    };

    return (
        <div className="navbar-container">
            <header className="header">
                <div className="profile" onClick={openSetting}>
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <span className="profile-name">{user.username}</span>
                </div>
                <nav className="navbar">
                    <Dropdown onAddNote={openNoteInput} onAddPlan={openPlanInput} />

                    <div className="nav-item">
                        <Link to="/home" className="flex gap-3">
                            <img src={homePic} alt="Home" className="nav-icon" />
                            <Link to="/home">Home</Link>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/today" className="flex gap-3">
                            <img src={todayPic} alt="Today" className="nav-icon" />
                            <Link to="/today">Today</Link>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/upcoming" className="flex gap-3">
                            <img src={upcomingPic} alt="Upcoming" className="nav-icon" />
                            <Link to="/upcoming">Upcoming</Link>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/inbox" className="flex gap-3">
                            <img src={inboxPic} alt="Inbox" className="nav-icon" />
                            <Link to="/inbox">Inbox</Link>
                        </Link>
                    </div>
                    <div className="separator"></div>
                    <NoteList />
                </nav>
                <div className="chat-box">
                    <Link to="/chat">
                        <img src={chatPic} alt="Chat" className="nav-icon" />
                        <Link to="/chat">Chat</Link>
                    </Link>
                </div>
            </header>
            <NoteInput isOpen={isNoteInputOpen} onClose={closeNoteInput} />
            <PlanInput isOpen={isPlanInputOpen} onClose={closePlanInput} />
            <Setting isOpen={isSettingOpen} onClose={closeSetting} />
        </div>
    );
};

export default NavBar1;
