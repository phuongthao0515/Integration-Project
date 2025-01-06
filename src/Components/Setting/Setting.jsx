import React, { useState } from 'react';
import './Setting.scss';
import userIcon from '../../assets/user.png';

const Setting = ({ isOpen, onClose }) => {
    const [profilePic, setProfilePic] = useState(userIcon);
    const [name, setName] = useState('Real Dog');
    const [email, setEmail] = useState('real.dog@example.com');

    if (!isOpen) return null;

    const handleProfilePicChange = (e) => {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    };

    const handleProfilePicClick = () => {
        document.getElementById('profile-pic').click();
    };

    const handleSave = () => {
        // Handle save logic here
        onClose();
    };

    const handleDeleteAccount = () => {
        // Handle delete account logic here
    };

    return (
        <div className="setting-overlay">
            <div className="setting-container">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="setting-content">
                    <div className="account-section">
                        <div className="account-header">
                            <img src={userIcon} alt="User Icon" className="user-icon" />
                            <span className="account-title">Account</span>
                        </div>
                        <div className="account-details">
                            <button className="account-button">Profile</button>
                            <button className="account-button">Log Out</button>
                        </div>
                    </div>
                    <div className="setting-main">
                        <div>
                            <h2>Settings</h2>
                            <div className="form-control profile-pic-control">
                                <label htmlFor="profile-pic">Change Profile Picture</label>
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="setting-profile-pic"
                                    onClick={handleProfilePicClick}
                                />
                                <input
                                    type="file"
                                    id="profile-pic"
                                    onChange={handleProfilePicChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="name">Change Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter new name"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Change Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter new email"
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="delete-button" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                            <button className="save-button" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
