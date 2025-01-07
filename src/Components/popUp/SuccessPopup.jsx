import React, { useEffect, useState } from 'react';
import './SuccessPopup.scss';

const SuccessPopup = ({ message, onClose }) => {
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setFadingOut(true);
        }, 1000);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    return (
        <div className={`success-popup ${fadingOut ? 'fade-out' : 'fade-in'}`}>
            <div className="success-popup-content">
                <span className="checkmark">&#10003;</span>
                <p className="success-message">{message}</p>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
        </div>
    );
};

export default SuccessPopup;
