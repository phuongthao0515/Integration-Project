import React from 'react';
import { Link } from 'react-router-dom';
import './TodayPage.scss';

import NavBar from '../components/NavBar/NavBar';

const TodayPage = () => {
    const getFormattedDate = () => {
        const today = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <div className="today-page-container">
            <NavBar />
            <div className="content">
                <div className="heading-container">
                    <h1 className="today-heading">TODAY</h1>
                    <h2 className="date-heading">{getFormattedDate()}</h2>
                </div>
                <p></p>
            </div>
        </div>
    );
};

export default TodayPage;
