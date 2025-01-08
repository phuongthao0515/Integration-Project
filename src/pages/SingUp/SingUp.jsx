import classNames from 'classnames/bind';
import styles from './SingUp.module.scss';
import { useState } from 'react';
import imgLogin1 from '../../assets/images/imglogin.png';
import imgLogin2 from '../../assets/images/imglogin2.png';

import vector from '../../assets/images/vector.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SingUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');

    const handleSignUp = () => {
        setErr('');
        if (!username || !password || !email) {
            setErr('All fields must be filled');
            return;
        } else {
            fetch('http://127.0.0.1:8000/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, email, password }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((errorData) => {
                            const errorMsg = errorData.detail || 'Login failed. Please try again.';
                            setErr(errorMsg);
                            throw new Error(errorMsg);
                        });
                    }

                    return res.json();
                })
                .then((data) => {
                    console.log('Sign Up successful:', data);

                    if (data && data.user) {
                        const userName = data.user.username;
                        toast.success(`Welcome, ${userName}!`);
                        setErr('');
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
                        setErr('Unexpected response format.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>NoteFlow</h1>
                <img src={vector} alt="" className={cx('image')} />
            </header>
            <div className={cx('inner')}>
                <h1>SIGN UP</h1>
                <div className={cx('form')}>
                    <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={cx('checkbox')}>
                    <input type="checkbox" />
                    <label>I wish to receive promotion through my email</label>
                </div>
                <div className={cx('checkbox')}>
                    <input type="checkbox" />
                    <label>I agree to the Terms and Conditions</label>
                </div>
                <div className={cx('btn')}>
                    {err && <p style={{ color: 'red', fontWeight: 'bold' }}>{err}</p>}
                    <button onClick={handleSignUp}>SIGN UP</button>
                </div>

                <div className={cx('continue')}>
                    <button>
                        CONTINUE WITH GOOGLE <img src={imgLogin1} />
                    </button>
                    <button>
                        CONTINUE WITH APPLE <img src={imgLogin2} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SingUp;
