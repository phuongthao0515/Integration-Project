import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import vector from '../../assets/images/vector.png';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>
                    NoteFlow <img src={vector} alt="" />
                </h1>
            </header>
            <div className={cx('inner')}>
                <h1>LOG IN</h1>
                <div className={cx('form')}>
                    <input type="text" placeholder="Your username" />
                    <input type="password" placeholder="Your password" />
                </div>
                <div className={cx('btn')}>
                    <button>LOG IN</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
