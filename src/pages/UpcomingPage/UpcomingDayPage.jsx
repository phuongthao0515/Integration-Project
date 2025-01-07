import React, { useState, useEffect } from 'react';
import './UpcomingDayPage.scss';

const UpcomingDayPage = ({ importantPlans, notImportantPlans }) => {
    const [plans, setPlans] = useState([]);
    const [fadeOutPlans, setFadeOutPlans] = useState([]);

    // Editing
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');
    const [editedDueTime, setEditedDueTime] = useState(''); // 24-hour string
    const [editedImportance, setEditedImportance] = useState(false);

    const to24HourTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const to12HourTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    useEffect(() => {
        const combinedPlans = [...importantPlans, ...notImportantPlans].map((p) => {
            const dateObj = new Date(p.dueDate);

            return {
                planId: p.id,
                content: p.content,
                dueDateObj: dateObj,
                dueDate: p.dueDate.split('T')[0],
                displayTime12h: to12HourTime(dateObj),
                time24h: to24HourTime(dateObj),
                importance: p.importance,
            };
        });

        combinedPlans.sort((a, b) => a.dueDateObj - b.dueDateObj);
        setPlans(combinedPlans);
    }, [importantPlans, notImportantPlans]);

    const groupedItems = plans.reduce((acc, item) => {
        if (!acc[item.dueDate]) {
            acc[item.dueDate] = [];
        }
        acc[item.dueDate].push(item);
        return acc;
    }, {});
    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(a) - new Date(b));

    const getFormattedDate = (date) => {
        const today = new Date();
        const targetDate = new Date(date);
        const dayDifference = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        const formatted = targetDate.toLocaleDateString('en-US', options);

        if (dayDifference === 0) return `Today - ${formatted}`;
        if (dayDifference === 1) return `Tomorrow - ${formatted}`;
        return formatted;
    };

    const startEditing = (item) => {
        setEditingPlanId(item.planId);
        setEditedContent(item.content);
        setEditedDueDate(item.dueDate);
        setEditedDueTime(item.time24h);
        setEditedImportance(item.importance);
    };

    const saveEdit = async (planId) => {
        const combinedISO = `${editedDueDate}T${editedDueTime}:00`;
        const token = localStorage.getItem('access_token');

        try {
            const response = await fetch(`http://localhost:8000/api/v1/plan/plans/${planId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    dueDate: combinedISO,
                    content: editedContent,
                    importance: editedImportance,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update plan: ${response.status} ${response.statusText}`);
            }

            setPlans((prev) => {
                return prev
                    .map((p) => {
                        if (p.planId === planId) {
                            const newDateObj = new Date(combinedISO);

                            return {
                                ...p,
                                content: editedContent,
                                dueDate: editedDueDate,
                                dueDateObj: newDateObj,
                                displayTime12h: to12HourTime(newDateObj),
                                time24h: to24HourTime(newDateObj),
                                importance: editedImportance,
                            };
                        }
                        return p;
                    })
                    .sort((a, b) => a.dueDateObj - b.dueDateObj);
            });
        } catch (error) {
            console.error('Error updating plan:', error);
        }
        setEditingPlanId(null);
    };

    const handlePlanDelete = async (id) => {
        setFadeOutPlans((prev) => [...prev, id]);
        try {
            const token = localStorage.getItem('access_token');
            await fetch(`http://localhost:8000/api/v1/plan/plans/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
        setTimeout(() => {
            setPlans((prevPlans) => prevPlans.filter((plan) => plan.planId !== id));
            setFadeOutPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    return (
        <div className="upcoming-day-page-container">
            <div className="content">
                {sortedDates.map((date) => (
                    <div key={date} className="date-section">
                        <h3>{getFormattedDate(date)}</h3>
                        <ul className="date-list">
                            {groupedItems[date].map((item) => (
                                <li
                                    key={item.planId}
                                    className={`
                    date-item 
                    ${item.importance ? 'important' : 'not-important'} 
                    ${fadeOutPlans.includes(item.planId) ? 'fade-out' : ''}
                  `}
                                >
                                    {editingPlanId === item.planId ? (
                                        <div className="edit-form">
                                            <input
                                                type="text"
                                                value={editedContent}
                                                onChange={(e) => setEditedContent(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="date"
                                                value={editedDueDate}
                                                onChange={(e) => setEditedDueDate(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="time"
                                                value={editedDueTime}
                                                onChange={(e) => setEditedDueTime(e.target.value)}
                                                required
                                            />
                                            <label>
                                                Important
                                                <input
                                                    type="checkbox"
                                                    checked={editedImportance}
                                                    onChange={(e) => setEditedImportance(e.target.checked)}
                                                />
                                            </label>
                                            <button onClick={() => saveEdit(item.planId)}>Save</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="left-section">
                                                <input
                                                    type="checkbox"
                                                    className="tick-circle"
                                                    onChange={() => handlePlanDelete(item.planId)}
                                                />
                                                <span className="due-time">{item.displayTime12h || ''}</span>
                                            </div>
                                            <span className="item-content">
                                                {item.content}
                                                {item.importance && <span className="star-icon"> ★</span>}
                                            </span>
                                            <button className="edit-button" onClick={() => startEditing(item)}>
                                                Edit
                                            </button>
                                        </>
                                    )}
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
