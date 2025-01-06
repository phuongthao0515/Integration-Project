import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Skeleton from 'react-loading-skeleton'

import { formatDistanceToNow } from 'date-fns';

import card10 from '../../assets/card10.png';

import NavBar from '../../Components/NavBar1/NavBar1';

const cx = classNames.bind(styles);

function Dashboard() {
    const [notes,setNotes] = useState(null)
        useEffect(() => {
            console.log('home');
            fetch('http://127.0.0.1:8000/api/v1/note/notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((errorData) => {
                            const errorMsg = errorData.detail || 'Login failed. Please try again.';
                            throw new Error(errorMsg);
                        });
                    }

                    return res.json();
                })
                .then((datas) => {
                    if(datas){
                        console.log('Data: ',datas)
                        setNotes(datas);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });;
        }, []);
    return (
        <div className={cx('dashboard')}>
            <NavBar />
            <main className={cx('main')}>
                <header className={cx('greeting')}>
                    <h1>Good Morning, </h1>
                </header>
                <section className={cx('recently-opened')}>
                    <h2>Recently notes</h2>
                    <div className={cx('cards')}>
                        {notes ? (
                            notes.map(
                                (note, index) =>
                                    index <= 3 && (
                                        <div className={cx('card')} key={index}>
                                            <img src={note.img || ''} alt="SQL" />
                                            <p>{note.title}</p>
                                            <span>
                                                {formatDistanceToNow(new Date(note.createddate), { addSuffix: true })}
                                            </span>
                                        </div>
                                    ),
                            )
                        ) : (
                            <Skeleton />
                        )}

                        {/* Add more cards as needed */}
                    </div>
                </section>
                <section className={cx('upcoming-events')}>
                    <h2>Upcoming events</h2>
                    <div className={cx('events')}>
                        <div className={cx('event-day')}>
                            <h3>May 10</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" />
                                    <span>Meeting</span>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <span>Read paper</span>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('event-day')}>
                            <h3>May 11</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" />
                                    <span>Write report</span>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <span>Code FE, meeting</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>
                        <img src={''} alt="Upcoming events" />
                        Upcoming events
                    </h2>
                    <div className={cx('events')}>
                        <div className={cx('event-day')}>
                            <div className="event-header">
                                <img src={''} alt="Calendar Icon" className="icon" />
                                <h3>January 9</h3>
                            </div>
                            <ul>
                                <li>
                                    <input type="checkbox" id="task1" />
                                    <label htmlFor="task1">Work on frontend tasks</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="task2" />
                                    <label htmlFor="task2">Complete backend tasks</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="task2" />
                                    <label htmlFor="task3">Review report and improve system design</label>
                                </li>
                            </ul>
                        </div>

                        <div className={cx('event-day')}>
                            <div className="event-header">
                                <img src={card10} alt="Calendar Icon" className="icon" />
                                <h3>January 10</h3>
                            </div>
                            <ul>
                                <li>
                                    <input type="checkbox" id="task1" />
                                    <label htmlFor="task1">Read and take notes on academic materials</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="task2" />
                                    <label htmlFor="task2">Submit Assignment tasks</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="task2" />
                                    <label htmlFor="task3">Do light exercises</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
