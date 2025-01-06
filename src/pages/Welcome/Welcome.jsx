import React from "react";
import Header from "./header";
import classNames from 'classnames/bind';
import welcome from "./Welcome.module.scss";
import bg1 from "../../assets/bg1.png";
import bgnote from "../../assets/bgnote.png"

const cx = classNames.bind(welcome);

const WelcomePage = () => {
  return (
    <div className={cx('main')}>
      <Header/>
      <div className={cx('welcome_page')}>

      <section className={cx('note_taking_simple')}>
        <div className={cx('content')}>
          <h2>
          <span className={cx('highlight')}>Note</span> taking <br/>made simple
          </h2>
          <p>Passionately made by students.</p>
          <p>Noted, the all in one note taking website.</p>
        </div>

        <div className={cx('image')}>
          <img src={bg1} alt="Note Taking" />
        </div>
      </section>


      <section className={cx('write_notes')}>
      <div className={cx('content')}>
        <h2>Write Notes</h2>
        <p>Write any notes you want</p>
      </div>
      <div className = {cx('box')}>
      <div className={cx('card')}>
        <h3>Web Design</h3>
        <p>Web design is a process of making a website for the user.</p>

        <div className={cx('goals')}>
          <h3>🎯 Goals</h3>
          <p>The goal is to make the website easy to use for the user and drive the necessary growth.</p>
        </div>

        <div className={cx('what_to_do')}>
          <h3>🏃 What to do?</h3>
          <ul>
            <li>Conduct Research</li>
            <li>Develop wireframes</li>
          </ul>
        </div>
      </div>
      </div>
    </section>



      <section>
        <h2>Write Notes</h2>
        <p>Keep your ideas organized and accessible.</p>
        <ul>
          <li><span>Quick Notes:</span> Jot down ideas fast.</li>
          <li><span>Task Manager:</span> Organize your day.</li>
        </ul>
      </section>

      <section>
        <h2>Plan your day</h2>
        <div className="features">
          <div>
            <h3>Kanban</h3>
            <p>Visualize your workflow.</p>
          </div>
          <div>
            <h3>Pomodoro</h3>
            <p>Stay focused and productive.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Work with your team</h2>
        <p>Collaborate in real time with built-in chat.</p>
      </section>

      <div className="cta">
        <h3>Ready to take your <span>notes</span> to the next level?</h3>
        <button>Get Started</button>

        <div className="contact-form">
          <h4>We are always ready to help you and answer your question</h4>
          <form>
            <input type="email" placeholder="Your email" />
            <textarea placeholder="Your question"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WelcomePage;