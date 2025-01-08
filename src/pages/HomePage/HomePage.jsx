import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Skeleton from 'react-loading-skeleton';
import profilePic from '../../assets/profile-pic.jpeg';

import { formatDistanceToNow } from 'date-fns';

import blockchainIcon from '../../assets/blockchain.png';

import upcoming from '../../assets/upcoming.png';

import pin from '../../assets/pin.png';

import card9 from '../../assets/card9.png';
import card10 from '../../assets/card10.png';
import MLIcon from '../../assets/ML.png';
import NavBar from '../../Components/NavBar1/NavBar1';
import { GlobalContext } from '../../context';
import cover1 from '../../assets/images/cover.jpg';
import cov1 from '../../assets/cover/cover1.jpg';
import cov2 from '../../assets/cover/cover2.jpg';
import cov3 from '../../assets/cover/cover3.jpg';
import cov4 from '../../assets/cover/cover4.jpg';
import cov5 from '../../assets/cover/cover5.jpg';
import cov6 from '../../assets/cover/cover6.jpg';
import cov7 from '../../assets/cover/cover7.jpg';
import cov8 from '../../assets/cover/cover8.jpg';
import cov9 from '../../assets/cover/cover9.jpg';
import cov10 from '../../assets/cover/cover10.jpg';
import cov11 from '../../assets/cover/cover11.jpg';
import cov12 from '../../assets/cover/cover12.jpg';

const cx = classNames.bind(styles);

function Dashboard() {
    const { notes, setNotes } = useContext(GlobalContext);
    const coverImages = {
        1: cov1,
        2: cov2,
        3: cov3,
        4: cov4,
        5: cov5,
        6: cov6,
        7: cov7,
        8: cov8,
        9: cov9,
        10: cov10,
        11: cov11,
        12: cov12,
    };
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
                if (datas) {
                    console.log('Data: ', datas);
                    setNotes(datas);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div className={cx('dashboard')}>
            <NavBar />
            <main className={cx('main', 'h-[100vh] overflow-scroll overflow-x-hidden')}>
                <header className={cx('greeting')}>
                    <h1 className={cx('cursor', 'typewriter-animation')}>
                        Welcome, {JSON.parse(localStorage.getItem('user')).username}
                    </h1>
                </header>
                <section className={cx('recently-opened')}>
                    <h2>Recently notes</h2>
                    <div className={cx('cards')}>
                        {notes ? (
                            notes.map(
                                (note, index) =>
                                    index <= 5 && (
                                        <div className={cx('card')} key={index}>
                                            <img
                                                src={coverImages[note.document] || ''}
                                                alt={note.document}
                                                className="w-full h-20 object-cover"
                                            />
                                            <p className="mt-6 text-left text-xl">{note.title}</p>
                                            <div className="text-left mt-4 flex items-center gap-4">
                                                <div>
                                                    <img
                                                        src={profilePic}
                                                        className="w-8 h-8 rounded-full border-2 border-gray-500"
                                                    />
                                                </div>
                                                <span className="text-gray-600 text-sm">
                                                    {formatDistanceToNow(new Date(note.createddate.split('.')[0]), {
                                                        addSuffix: true,
                                                    })}
                                                </span>
                                            </div>
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
                    <h2>
                        <img src={upcoming} alt="Upcoming events" />
                        Upcoming events
                    </h2>
                    <div className={cx('events')}>
                        <div className={cx('event-day')}>
                            <div className="event-header">
                                <img src={card9} alt="Calendar Icon" className="icon" />
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

                <section className={cx('quick-access')}>
                    <h2>
                        <img src={pin} alt="shared note" />
                        Shared Notes
                    </h2>
                    <div className={cx('pins', 'mt-4')}>
                        <div
                            className={cx('pin1', 'w-40 p-2 rounded-md bg-white')}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                            }}
                        >
                            <img src={cov2} alt="BlockChain" className="w-44 h-20 object-cover " />
                            <p className="mt-2 text-left">BlockChain: a distributed ledger ...</p>
                        </div>

                        <div
                            className={cx('pin2', 'w-40 p-2 rounded-md bg-white')}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                            }}
                        >
                            <img src={cov1} alt="ML" className="w-44 h-20 object-cover" />
                            <p className="mt-2 text-left">Machine Learning: Decision tree ...</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
