// Header.jsx
import React from 'react';
import styles from './header.module.scss';
import classNames from 'classnames/bind';
import vector from '../../assets/images/vector.png';

const cx = classNames.bind(styles);

const Header = () => {
  return (
  
     <header className={cx('header')}>
        <h1>
          NoteFlow <img src={vector} alt="" />
        </h1>
      <div className={cx('auth-buttons')}>
        <button className={cx('sign_up')}>Sign Up</button>
        <button className={cx('log_in')}>Log in</button>
      </div>
    </header>
  );
};

export default Header;