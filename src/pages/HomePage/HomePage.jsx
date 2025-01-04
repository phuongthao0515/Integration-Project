import React from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import blockchainIcon from '../../assets/blockchain.png';
import sqlIcon from '../../assets/sql.png';
import NavBar from '../../Components/NavBar1/NavBar1';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('dashboard')}>
            <NavBar />
            <main className={cx('main')}>
                <header className={cx('greeting')}>
                    <h1>Good Morning, </h1>
                </header>
                <section className={cx('recently-opened')}>
                    <h2>Recently opened</h2>
                    <div className={cx('cards')}>
                        <div className={cx('card')}>
                            <img src={blockchainIcon} alt="Blockchain" />
                            <p>Blockchain</p>
                            <span>8h ago</span>
                        </div>
                        <div className={cx('card')}>
                            <img src={sqlIcon} alt="SQL" />
                            <p>SQL</p>
                            <span>12h ago</span>
                        </div>
                        <div className={cx('card')}>
                            <img src={sqlIcon} alt="SQL" />
                            <p>SQL</p>
                            <span>12h ago</span>
                        </div>
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
