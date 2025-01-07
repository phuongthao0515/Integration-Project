import React, { useState } from 'react';
import './PlanInput.scss';
import SuccessPopup from '../popUp/SuccessPopup';

const PlanInput = ({ isOpen, onClose }) => {
    const [importance, setImportance] = useState(false);
    const [expirationDate, setExpirationDate] = useState('');
    const [expirationTime, setExpirationTime] = useState('');
    const [content, setContent] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSavePlan = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.warn('No token in localStorage');
                return;
            }
            const dueDateObj = new Date(`${expirationDate}T${expirationTime}`);
            const localDueDateObj = new Date(dueDateObj.getTime() - dueDateObj.getTimezoneOffset() * 60000);

            const bodyData = {
                createddate: new Date().toISOString(),
                dueDate: localDueDateObj.toISOString(),
                content,
                importance,
            };

            const response = await fetch('http://localhost:8000/api/v1/plan/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error(`Failed: ${response.status}, ${response.statusText}`);
            }

            setShowSuccess(true);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    };

    const handleClose = () => {
        onClose();
        window.location.reload();
    };

    return (
        <>
            <div className="plan-input-overlay">
                <div className="plan-input-container">
                    <button className="close-button" onClick={handleClose}>
                        &times;
                    </button>
                    <h2>New Plan</h2>
                    <div className="form-control">
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-control expiration-container">
                        <div>
                            <label htmlFor="expiration-date">Expiration Date</label>
                            <input
                                type="date"
                                id="expiration-date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="expiration-time">Expiration Time</label>
                            <input
                                type="time"
                                id="expiration-time"
                                value={expirationTime}
                                onChange={(e) => setExpirationTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="importance-switch"></label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="importance-switch"
                                checked={importance}
                                onChange={(e) => setImportance(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                        <div className="importance-label">{importance ? 'Important' : 'Not Important'}</div>
                    </div>
                    <button className="submit-button" onClick={handleSavePlan}>
                        Save Plan
                    </button>
                </div>
            </div>

            {showSuccess && <SuccessPopup message="Plan saved successfully!" onClose={() => setShowSuccess(false)} />}
        </>
    );
};

export default PlanInput;
