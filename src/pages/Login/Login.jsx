import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import iconLogin from '../../assets/images/bg login.png';
import vector from '../../assets/images/vector.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
        setErrorMessage('');

        fetch('http://127.0.0.1:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Login failed. Please try again.';
                        setErrorMessage(errorMsg);
                        throw new Error(errorMsg);
                    });
                }

                return response.json();
            })
            .then((data) => {
                console.log('Login successful:', data);

                if (data && data.user) {
                    const userName = data.user.username;
                    toast.success(`Welcome back, ${userName}!`);
                    setErrorMessage('');
                    const userData = {
                        id: data.user.user_id,
                        username: data.user.username,
                        timestamp: new Date().toISOString(),
                    };
                    localStorage.setItem('user', JSON.stringify(userData));

                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    navigate('/home');
                } else {
                    setErrorMessage('Unexpected response format.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {}, [errorMessage]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>NoteFlow</h1>
                <img src={vector} alt="" className={cx('image')} />
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
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        {/* Display the error message if it exists */}
                        {errorMessage && errorMessage !== '' && (
                            <p className={cx('error')} style={{ color: 'red', fontWeight: 'bold' }}>
                                {errorMessage}
                            </p>
                        )}
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
