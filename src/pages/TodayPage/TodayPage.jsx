import React, { useState, useEffect } from 'react';
import './TodayPage.scss';
import NavBar from '../../Components/NavBar1/NavBar1';

const TodayPage = () => {
    const [importantPlans, setImportantPlans] = useState([]);
    const [notImportantPlans, setNotImportantPlans] = useState([]);
    const [fadeOutPlans, setFadeOutPlans] = useState([]);
    const [fadeOutNotImportantPlans, setFadeOutNotImportantPlans] = useState([]);

    // Edit state
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');
    const [editedDueTime, setEditedDueTime] = useState('');
    const [editedImportance, setEditedImportance] = useState(false);

    useEffect(() => {
        const fetchPlansForToday = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.warn('No token found in localStorage');
                return;
            }
            try {
                const response = await fetch('http://localhost:8000/api/v1/plan/plans/today', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched plans:', data);

                const newImportant = data
                    .filter((p) => p.importance)
                    .map((p) => {
                        const dateObj = new Date(p.dueDate);
                        return {
                            id: p.planId,
                            content: p.content,
                            dueDate: p.dueDate.split('T')[0],
                            dueTime: dateObj.toTimeString().slice(0, 5),

                            importance: p.importance,
                        };
                    });

                const newNotImportant = data
                    .filter((p) => !p.importance)
                    .map((p) => {
                        const dateObj = new Date(p.dueDate);
                        return {
                            id: p.planId,
                            content: p.content,
                            dueDate: dateObj.toISOString().split('T')[0],
                            dueTime: dateObj.toTimeString().slice(0, 5),
                            importance: p.importance,
                        };
                    });

                setImportantPlans(newImportant);
                setNotImportantPlans(newNotImportant);
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };

        fetchPlansForToday();
    }, []);

    const getFormattedDate = () => {
        const today = new Date();
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return today.toLocaleDateString('en-US', options);
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
            setImportantPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
            setFadeOutPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    const handleNotImportantPlanDelete = async (id) => {
        setFadeOutNotImportantPlans((prev) => [...prev, id]);
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
            setNotImportantPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
            setFadeOutNotImportantPlans((prev) => prev.filter((planId) => planId !== id));
        }, 500);
    };

    const startEditing = (plan) => {
        setEditingPlanId(plan.id);
        setEditedContent(plan.content);
        setEditedDueDate(plan.dueDate);
        setEditedDueTime(plan.dueTime);
        setEditedImportance(plan.importance);
        console.log(plan.dueDate);
    };

    const saveEdit = async (id, wasImportant) => {
        const combinedDateTime = `${editedDueDate}T${editedDueTime}:00`;
        console.log('Combined date time:', combinedDateTime);
        const requestBody = {
            dueDate: combinedDateTime,
            content: editedContent,
            importance: editedImportance,
        };
        console.log('Request body:', requestBody);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://localhost:8000/api/v1/plan/plans/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Update failed: ${response.status} ${response.statusText}`);
            }

            const updatedPlanFromServer = await response.json();
            console.log('Updated plan:', updatedPlanFromServer);

            const todayString = new Date().toISOString().split('T')[0];
            const newDateString = editedDueDate;

            setImportantPlans((prev) => prev.filter((p) => p.id !== id));
            setNotImportantPlans((prev) => prev.filter((p) => p.id !== id));

            if (newDateString === todayString) {
                const updatedPlan = {
                    id,
                    content: editedContent,
                    dueDate: editedDueDate,
                    dueTime: editedDueTime,
                    importance: editedImportance,
                };

                if (editedImportance) {
                    setImportantPlans((prev) => [...prev, updatedPlan]);
                } else {
                    setNotImportantPlans((prev) => [...prev, updatedPlan]);
                }
            }
        } catch (error) {
            console.error('Error updating plan:', error);
        }

        setEditingPlanId(null);
    };

    return (
        <div className="today-page-container">
            <NavBar />
            <div className="content">
                <div className="heading-container">
                    <h1 className="today-heading">TODAY</h1>
                    <h2 className="date-heading">{getFormattedDate()}</h2>
                </div>
                {/* Important Plans */}
                <div className="important-section">
                    <h3>Important</h3>
                    <ul className="important-list">
                        {importantPlans
                            .sort((a, b) => a.dueTime.localeCompare(b.dueTime))
                            .map((plan) => {
                                const planTimeDisplay = new Date(`${plan.dueDate}T${plan.dueTime}`).toLocaleTimeString(
                                    [],
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    },
                                );

                                return (
                                    <li
                                        key={plan.id}
                                        className={`important-item ${fadeOutPlans.includes(plan.id) ? 'fade-out' : ''}`}
                                    >
                                        {editingPlanId === plan.id ? (
                                            <div className="edit-form">
                                                <input
                                                    type="text"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                                <input
                                                    type="date"
                                                    value={editedDueDate}
                                                    onChange={(e) => setEditedDueDate(e.target.value)}
                                                />
                                                <input
                                                    type="time"
                                                    value={editedDueTime}
                                                    onChange={(e) => setEditedDueTime(e.target.value)}
                                                />
                                                <label>
                                                    Important
                                                    <input
                                                        type="checkbox"
                                                        checked={editedImportance}
                                                        onChange={(e) => setEditedImportance(e.target.checked)}
                                                    />
                                                </label>
                                                <button onClick={() => saveEdit(plan.id, true)}>Save</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="left-section">
                                                    <input
                                                        type="checkbox"
                                                        className="tick-circle"
                                                        onChange={() => handlePlanDelete(plan.id)}
                                                    />
                                                    <span className="due-time">{planTimeDisplay}</span>
                                                </div>
                                                <span className="item-content">{plan.content}</span>
                                                <button className="edit-button" onClick={() => startEditing(plan)}>
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                {/* Not Important Plans */}
                <div className="not-important-section">
                    <h3>Not So Important?</h3>
                    <ul className="important-list">
                        {notImportantPlans
                            .sort((a, b) => a.dueTime.localeCompare(b.dueTime))
                            .map((plan) => {
                                const planTimeDisplay = new Date(`${plan.dueDate}T${plan.dueTime}`).toLocaleTimeString(
                                    [],
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    },
                                );

                                return (
                                    <li
                                        key={plan.id}
                                        className={`important-item ${
                                            fadeOutNotImportantPlans.includes(plan.id) ? 'fade-out' : ''
                                        }`}
                                    >
                                        {editingPlanId === plan.id ? (
                                            <div className="edit-form">
                                                <input
                                                    type="text"
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                />
                                                <input
                                                    type="date"
                                                    value={editedDueDate}
                                                    onChange={(e) => setEditedDueDate(e.target.value)}
                                                />
                                                <input
                                                    type="time"
                                                    value={editedDueTime}
                                                    onChange={(e) => setEditedDueTime(e.target.value)}
                                                />
                                                <label>
                                                    Important
                                                    <input
                                                        type="checkbox"
                                                        checked={editedImportance}
                                                        onChange={(e) => setEditedImportance(e.target.checked)}
                                                    />
                                                </label>
                                                <button onClick={() => saveEdit(plan.id, false)}>Save</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="left-section">
                                                    <input
                                                        type="checkbox"
                                                        className="tick-circle"
                                                        onChange={() => handleNotImportantPlanDelete(plan.id)}
                                                    />
                                                    <span className="due-time">{planTimeDisplay}</span>
                                                </div>
                                                <span className="item-content">{plan.content}</span>
                                                <button className="edit-button" onClick={() => startEditing(plan)}>
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodayPage;
