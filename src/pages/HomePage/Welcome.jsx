// WelcomePage.jsx
import React from "react";
import "./Welcome.module.scss";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <header className="header">
        <div className="header-content">
          <h1>Note taking made simple</h1>
          <p>Take notes efficiently and stay organized.</p>
        </div>
      </header>

      <main className="features">
        <section className="feature write-notes">
          <h2>Write Notes</h2>
          <p>What are your notes about?</p>
        </section>

        <section className="feature plan-day">
          <h2>Plan your day</h2>
          <p>Make your day well-planned.</p>
        </section>

        <section className="feature pomodoro">
          <h2>Pomodoro</h2>
          <p>Stay focused and boost your productivity.</p>
        </section>

        <section className="feature work-with-team">
          <h2>Work with your team</h2>
          <p>Enhance team collaboration with seamless notes sharing.</p>
        </section>

        <section className="feature chatting">
          <h2>Chatting</h2>
          <p>Chat and ask questions with ease.</p>
        </section>

        <section className="call-to-action">
          <h2>Ready to take your notes to the next level?</h2>
          <button>Get Started</button>
        </section>
      </main>

      <footer className="footer">
        <h2>We are always ready to help you and answer your questions</h2>
        <form className="contact-form">
          <input type="email" placeholder="Your email" required />
          <textarea placeholder="Your message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </footer>
    </div>
  );
};

export default WelcomePage;
