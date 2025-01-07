import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Skeleton from 'react-loading-skeleton'

import { formatDistanceToNow } from 'date-fns';

import blockchainIcon from '../../assets/blockchain.png';
import sqlIcon from '../../assets/sql.png';
import networkIcon from '../../assets/network.png';
import upcoming from '../../assets/upcoming.png';
import recently from '../../assets/recently.png';
import pin from '../../assets/pin.png';
import AIIcon from '../../assets/AI.png';
import card9 from '../../assets/card9.png';
import card10 from '../../assets/card10.png';
import MLIcon from '../../assets/ML.png';
import NavBar from '../../Components/NavBar1/NavBar1';
import { GlobalContext } from '../../context';

const cx = classNames.bind(styles);

function Dashboard() {
    const {notes,setNotes} = useContext(GlobalContext);
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
                                    index <= 2 && (
                                        <div className={cx('card')} key={index}>
                                            <img src={note.img || ''} alt="SQL" />
                                            <p>{note.title}</p>
                                            <span>
                                                {formatDistanceToNow(new Date(note.createddate.split('.')[0]), {
                                                    addSuffix: true,
                                                })}
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
                    <div className={cx('pins')}>
                        <div className={cx('pin1')}>
                            <img src={blockchainIcon} alt="BlockChain" />
                            <p>BlockChain</p>
                            <span>a distributed ledger ...</span>
                        </div>
                        {/* Add more pins */}
                        <div className={cx('pin2')}>
                            <img src={MLIcon} alt="ML" />
                            <p>Machine Learning</p>
                            <span>Decision tree ...</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
