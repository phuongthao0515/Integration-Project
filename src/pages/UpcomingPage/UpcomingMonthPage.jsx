import React, { useState, useEffect } from 'react';
import './UpcomingMonthPage.scss';

import NavBar from '../../Components/NavBar1/NavBar1';
import UpcomingDayPage from './UpcomingDayPage';

const UpcomingMonthPage = () => {
    const [importantPlans, setImportantPlans] = useState([]);
    const [notImportantPlans, setNotImportantPlans] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchPlansForMonth = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.warn('No token found in localStorage');
                return;
            }
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            try {
                const response = await fetch(`http://localhost:8000/api/v1/plan/plans/month/${year}/${month}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const newImportant = data
                    .filter((p) => p.importance)
                    .map((p) => ({
                        id: p.planId,
                        content: p.content,
                        dueDate: p.dueDate,
                        importance: p.importance,
                    }));
                const newNotImportant = data
                    .filter((p) => !p.importance)
                    .map((p) => ({
                        id: p.planId,
                        content: p.content,
                        dueDate: p.dueDate,
                        importance: p.importance,
                    }));
                setImportantPlans(newImportant);
                setNotImportantPlans(newNotImportant);
            } catch (error) {
                console.error('Error fetching monthly plans:', error);
            }
        };

        fetchPlansForMonth();
    }, [currentDate, selectedDate, view]);

    const getFormattedDate = () => {
        const options = { month: 'long', year: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setView('day');
    };

    const handleBackToMonth = () => {
        setView('month');
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const calendar = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const plans = importantPlans
                .filter((plan) => new Date(plan.dueDate).getDate() === day)
                .concat(notImportantPlans.filter((plan) => new Date(plan.dueDate).getDate() === day));

            calendar.push(
                <div key={day} className="calendar-day" onClick={() => handleDayClick(date)}>
                    <div className="date">{day}</div>
                    <div className="plans">
                        {plans.map((plan) => (
                            <div key={plan.id} className="plan">
                                {plan.content.length > 15 ? `${plan.content.substring(0, 15)}...` : plan.content}
                            </div>
                        ))}
                    </div>
                </div>,
            );
        }

        return calendar;
    };

    const renderWeekdays = () => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return weekdays.map((day) => (
            <div key={day} className="calendar-weekday">
                {day}
            </div>
        ));
    };

    return (
        <div className="upcoming-month-container">
            <NavBar />
            <div className="content">
                <div className="heading-container">
                    <h1 className="upcoming-heading">UPCOMING</h1>
                    <button className="switch-button" onClick={() => setView(view === 'month' ? 'day' : 'month')}>
                        {view === 'month' ? 'Switch to Day View' : 'Switch to Month View'}
                    </button>
                    <div className="month-nav-container">
                        <button className="month-nav prev" onClick={handlePreviousMonth}>
                            &lt;
                        </button>
                        <h2 className="date-heading">{getFormattedDate()}</h2>
                        <button className="month-nav next" onClick={handleNextMonth}>
                            &gt;
                        </button>
                    </div>
                </div>
                {view === 'month' ? (
                    <div className="calendar">
                        {renderWeekdays()}
                        {renderCalendar()}
                    </div>
                ) : (
                    <UpcomingDayPage
                        date={selectedDate}
                        onBack={handleBackToMonth}
                        importantPlans={importantPlans}
                        setImportantPlans={setImportantPlans}
                        notImportantPlans={notImportantPlans}
                        setNotImportantPlans={setNotImportantPlans}
                    />
                )}
            </div>
        </div>
    );
};

export default UpcomingMonthPage;
