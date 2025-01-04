import React, { useState } from 'react';
import './PlanInput.scss';

const PlanInput = ({ isOpen, onClose }) => {
    const [importance, setImportance] = useState(false);
    const [expirationDate, setExpirationDate] = useState('');
    const [expirationTime, setExpirationTime] = useState('');

    if (!isOpen) return null;

    return (
        <div className="plan-input-overlay">
            <div className="plan-input-container">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>New Plan</h2>
                <div className="form-control">
                    <textarea placeholder="Content" required></textarea>
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
                <button className="submit-button">Save Plan</button>
            </div>
        </div>
    );
};

export default PlanInput;
