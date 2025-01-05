import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Skeleton from 'react-loading-skeleton'

import { formatDistanceToNow } from 'date-fns';

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
                        {notes?
                            notes.map((note, index) => (
                                index <= 3 && (<div className={cx('card')} key={index}>
                                    
                                    <img src={note.img || ''} alt="SQL" />
                                    <p>{note.title}</p>
                                    <span>{formatDistanceToNow(new Date(note.createddate), { addSuffix: true })}</span>
                                </div>)
                            )):(<Skeleton/>)}

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

                <section className={cx('quick-access')}>
                    <h2>Pin to home for quickly access</h2>
                    <div className={cx('pins')}>
                        <div className={cx('pin')}>
                            <h3>Blockchain</h3>
                            <p>Some description about Blockchain</p>
                        </div>
                        {/* Add more pins */}
                    </div>
                </section>
                <section className={cx('new-ideas')}>
                    <h2>New ideas</h2>
                    <ul>
                        <li>
                            <h3>Title Here</h3>
                            <p>Create a mobile app UI Kit...</p>
                        </li>
                        {/* Add more ideas */}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
