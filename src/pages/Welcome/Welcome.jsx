import React from "react";
import Header from "./header";
import classNames from 'classnames/bind';
import welcome from "./Welcome.module.scss";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";

const cx = classNames.bind(welcome);

const WelcomePage = () => {
  return (
    <div className={cx('main')}>
      <Header/>
      <div className={cx('welcome_page')}>

{/* note taking simple */}
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


{/* connect write note, plan, pomodoro, team, chat  */}
<section className={cx('connect')}>
      <section className={cx('write_notes')}>
      
      <div className = {cx('box')}>
      <img src={bg2} alt="pen icon" className={cx('icon-bg2')} />
  
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

      <div className={cx('content')}>
        <h2>Write Notes</h2>
        <p>Write any notes you want</p>
      </div>
    </section>

    {/* Đường nối */}
    <svg className={cx('connector')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
  <path d="M10 20 L50 50 L90 20" stroke="#F57C00" strokeWidth="2" fill="none" />
  <polygon points="90,20 85,25 95,25" fill="#F57C00" /> {/* Arrowhead */}
</svg>

  {/* Section Plan */}
  <section className={cx('plan_day')}>
    <div className={cx('content')}>
      <h2>Plan your day</h2>
      <p>Make sure your day is well planned</p>
    </div>
    <div className={cx('box')}>
      <div className={cx('card')}>
        <h3>Monday</h3>
        <p>May, 3rd</p>
        <ul>
          <li>Do laundry</li>
          <li>Call mom</li>
          <li>Daily meeting</li>
        </ul>
      </div>
      <div className={cx('card')}>
        <h3>Other Tasks</h3>
        <ul>
          <li>Go to school</li>
          <li>Study</li>
          <li>Cooking</li>
        </ul>
      </div>
    </div>
  </section>
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