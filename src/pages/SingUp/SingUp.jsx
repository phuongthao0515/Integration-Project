import classNames from 'classnames/bind';
import styles from './SingUp.module.scss';

import imgLogin1 from '../../assets/images/imglogin.png';
import imgLogin2 from '../../assets/images/imglogin2.png';

import vector from '../../assets/images/vector.png';

const cx = classNames.bind(styles);

function SingUp() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1>
                    NoteFlow <img src={vector} alt="" />
                </h1>
            </header>
            <div className={cx('inner')}>
                <h1>SIGN UP</h1>
                <div className={cx('form')}>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="text" placeholder="Email" />
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
                    <button>SIGN UP</button>
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
