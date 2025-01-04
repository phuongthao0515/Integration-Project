import React, { useState, useEffect } from 'react';
import './UpcomingDayPage.scss';

import NavBar from '../../Components/NavBar1/NavBar1';

// Mock data for notes and plans
const mockNotes = [
    { id: 1, content: 'Note 1', dueTime: '10:00 AM', date: '2027-10-01' },
    { id: 2, content: 'Note 2', dueTime: '2:00 PM', date: '2023-10-02' },
    { id: 3, content: 'Note 3', dueTime: '5:00 PM', date: '2024-10-03' },
    { id: 4, content: 'Note 4', dueTime: '7:00 PM', date: '2025-10-04' },
    { id: 5, content: 'Note 5', dueTime: '3:00 PM', date: '2026-01-05' },
];

const mockPlans = [
    { id: 1, content: 'Plan 1', dueTime: '11:00 AM', date: '2023-10-01' },
    { id: 2, content: 'Plan 2', dueTime: '3:00 PM', date: '2023-10-02' },
];

const UpcomingDayPage = () => {
    const [notes, setNotes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [fadeOutNotes, setFadeOutNotes] = useState([]);
    const [fadeOutPlans, setFadeOutPlans] = useState([]);

    useEffect(() => {
        setNotes(mockNotes);
        setPlans(mockPlans);
    }, []);

    const getFormattedDate = (date) => {
        const today = new Date();
        const targetDate = new Date(date);
        const dayDifference = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));

        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = targetDate.toLocaleDateString('en-US', options);

        if (dayDifference === 0) {
            return `Today - ${formattedDate}`;
        } else if (dayDifference === 1) {
            return `Tomorrow - ${formattedDate}`;
        } else {
            return formattedDate;
        }
    };

    const handleNoteDelete = (id) => {
        setFadeOutNotes((prev) => [...prev, id]);
        setTimeout(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            setFadeOutNotes((prev) => prev.filter((noteId) => noteId !== id));
        }, 500);
    };

    const handlePlanDelete = (id) => {
        setFadeOutPlans((prev) => [...prev, id]);
        setTimeout(() => {
            setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
            setFadeOutPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    const groupedItems = [...notes, ...plans].reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(a) - new Date(b));

    return (
        <div className="upcoming-day-page-container">
            <NavBar />
            <div className="content">
                <div className="heading-container">
                    <h1 className="upcoming-heading">UPCOMING</h1>
                </div>
                {sortedDates.map((date) => (
                    <div key={date} className="date-section">
                        <h3>{getFormattedDate(date)}</h3>
                        <ul className="date-list">
                            {groupedItems[date].map((item) => (
                                <li
                                    key={item.id}
                                    className={`date-item ${
                                        fadeOutNotes.includes(item.id) || fadeOutPlans.includes(item.id)
                                            ? 'fade-out'
                                            : ''
                                    }`}
                                >
                                    <div className="left-section">
                                        <input
                                            type="checkbox"
                                            className="tick-circle"
                                            onChange={() =>
                                                item.content.includes('Note')
                                                    ? handleNoteDelete(item.id)
                                                    : handlePlanDelete(item.id)
                                            }
                                        />
                                        <span className="due-time">{item.dueTime}</span>
                                    </div>
                                    <span className="item-content">{item.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingDayPage;
