// Header.jsx
import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import vector from '../../assets/images/vector.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = () => {
  return (
      <header className={cx('header')}>
          <h1>
              NoteFlow <img src={vector} alt="" />
          </h1>
          <div className={cx('auth-buttons')}>
              <Link to="/signup">
                  <button className={cx('sign_up')}>Sign Up</button>
              </Link>
              <Link to="/login">
                  <button className={cx('log_in')}>Log in</button>
              </Link>
          </div>
      </header>
  );
};

export default Header;