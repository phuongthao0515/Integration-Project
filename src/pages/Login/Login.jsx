import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import iconLogin from '../../assets/images/bg login.png';
import vector from '../../assets/images/vector.png';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login({ email, password, setUserName, setPassword, handleLogIn, errorMessage }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>
                    NoteFlow <img src={vector} alt="" />
                </h1>
            </header>
            <div className={cx('body')}>
                <div className={cx('left')}>
                    <img src={iconLogin} alt="Login icon" />
                </div>
                <div className={cx('right')}>
                    <h1 className={cx('title')}>LOGIN ACCOUNT</h1>
                    <div className={cx('form')}>
                        <label>
                            Email
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>
                        <label>
                            Password
                            <div className={cx('password-wrapper')}>
    <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <button
        type="button"
        className={cx('toggle-password')}
        onClick={togglePasswordVisibility}
    >
        {showPassword ? '👁️‍🗨️' : '👁️'}
    </button>
</div>

                        </label>
                        <div className={cx('options')}>
                            <label>
                                <input type="checkbox" />
                                Remember your account
                            </label>
                            <a href="/forgot-password">Forgot your password?</a>
                        </div>
                        {errorMessage && <p className={cx('error')}>{errorMessage}</p>}
                    </div>
                    <button className={cx('login-button')} onClick={handleLogIn}>
                        LOG IN
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
