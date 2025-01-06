import React from 'react';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

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

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('dashboard')}>
            <NavBar />
            <main className={cx('main')}>
                <header className={cx('greeting')}>
                    <h1>Good Morning, </h1>
                </header>
                <section className={cx('recently-opened') }>
                    <h2>
                        <img src={recently} alt="Recently opened" />
                        Recently opened
                    </h2>
                    <div className={cx('cards')}>
                        <div className={cx('card')}>
                            <img src={blockchainIcon} alt="Blockchain" />
                            <p>Blockchain</p>
                            <span>8h ago</span>
                    </div>
                        <div className={cx('card')}>
                            <img src={networkIcon} alt="Network" />
                            <p>Computer Network</p>
                            <span>12h ago</span>
                        </div>
                        <div className={cx('card')}>
                            <img src={sqlIcon} alt="SQL" />
                            <p>SQL</p>
                            <span>12h ago</span>
                        </div>
                        <div className={cx('card')}>
                            <img src={AIIcon} alt="AI" />
                            <p>Deep Learning</p>
                            <span>12h ago</span>
                        </div>
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
        <div class="event-header">
            <img src={card9} alt="Calendar Icon" class="icon"/>
            <h3>January 9</h3>
        </div>
        <ul>
            <li>
                <input type="checkbox" id="task1"/>
                <label for="task1">Work on frontend tasks</label>
            </li>
            <li>
                <input type="checkbox" id="task2"/>
                <label for="task2">Complete backend tasks</label>
            </li>
            <li>
                <input type="checkbox" id="task2"/>
                <label for="task3">Review report and improve system design</label>
            </li>
        </ul>
        </div>
        <div className={cx('event-day')}>
        <div class="event-header">
            <img src={card10} alt="Calendar Icon" class="icon"/>
            <h3>January 10</h3>
        </div>
        <ul>
            <li>
                <input type="checkbox" id="task1"/>
                <label for="task1">Read and take notes on academic materials</label>
            </li>
            <li>
                <input type="checkbox" id="task2"/>
                <label for="task2">Submit Assignment tasks</label>
            </li>
            <li>
                <input type="checkbox" id="task2"/>
                <label for="task3">Do light exercises</label>
            </li>
        </ul>
        </div>
    </div>
</section>


                <section className={cx('quick-access')}>
                    <h2>
                        <img src={pin} alt="shared note" />
                        Shared Notes Arena
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
