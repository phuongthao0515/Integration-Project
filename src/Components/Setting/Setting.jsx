import React, { useState } from 'react';
import './Setting.scss';
import userIcon from '../../assets/user.png';
import { useEffect } from 'react';
import SuccessPopup from '../popUp/SuccessPopup';
const Setting = ({ isOpen, onClose }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [profilePic, setProfilePic] = useState(userIcon);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => {
        if (isOpen) {
            fetchUserData();
        }
    }, [isOpen]);
    if (!isOpen) return null;
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://127.0.0.1:8000/api/v1/user/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.statusText}`);
            }

            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleProfilePicChange = (e) => {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    };

    const handleProfilePicClick = () => {
        document.getElementById('profile-pic').click();
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('access_token');

            // Update username
            const usernameResponse = await fetch('http://127.0.0.1:8000/api/v1/user/user/username', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username: name }),
            });

            if (!usernameResponse.ok) {
                throw new Error(`Failed to update username: ${usernameResponse.statusText}`);
            }

            // Update email
            const emailResponse = await fetch('http://127.0.0.1:8000/api/v1/user/user/email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: email }),
            });

            if (!emailResponse.ok) {
                throw new Error(`Failed to update email: ${emailResponse.statusText}`);
            }
            const existingUser = JSON.parse(localStorage.getItem('user'));
            const userData = {
                id: existingUser.id,
                username: name,
                timestamp: existingUser.timestamp,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setShowSuccess(true);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('access_token');
        try {
            await fetch('http://127.0.0.1:8000/api/v1/user/user', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('access_token');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error deleting user:', error);
        }
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
                            <button className="account-button" onClick={handleLogout}>
                                Log Out
                            </button>
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
            {showSuccess && <SuccessPopup message="Update successfully!" onClose={() => setShowSuccess(false)} />}
        </div>
    );
};

export default Setting;
