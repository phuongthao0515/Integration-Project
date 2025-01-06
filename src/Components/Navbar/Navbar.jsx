import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

import avatar from '../../assets/images/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEllipsis, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import img3 from '../../assets/images/image3.png';
import img4 from '../../assets/images/image4.png';
import img5 from '../../assets/images/image7.png';
import img6 from '../../assets/images/image10.png';
import img7 from '../../assets/images/image11.png';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar({ listTask, setListTask, setIdTask, idTask }) {
    const [idModal, setIdModal] = useState(0);
    const [editTaskId, setEditTaskId] = useState(null); // Track which task is being edited
    const [newName, setNewName] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(listTask);

    const onNewPage = () => {
        setListTask([...listTask, { id: listTask.length + 1, name: 'New Page', content: '<h1>New Page!</h1>' }]);
    };

    const onGetIdTask = (id) => {
        setIdModal(id);
    };

    const handleDelete = () => {
        const newListTask = listTask.filter((item) => item.id !== idModal);
        setListTask(newListTask);
        setIdModal(0);
        setIdTask(0);
    };

    const handleCopyTask = () => {
        const task = listTask.find((item) => item.id === idModal);
        setListTask([...listTask, { id: listTask.length + 1, name: task.name, content: task.content }]);
        setIdModal(0);
    };

    const updateName = (id) => {
        const updatedTasks = listTask.map((task) => (task.id === id ? { ...task, name: newName } : task));
        setListTask(updatedTasks);
        setEditTaskId(null); // Close the input after saving the name
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={avatar} alt="" />
                <p>{user.username}</p>
            </div>

            <div className={cx('add-task')}>
                <button>
                    Add Task
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </button>
            </div>

            <div className={cx('task-list')}>
                <ul>
                    <li>
                        <img src={img1} />
                        <Link to="/home">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <img src={img2} />
                        <Link to="/today">
                            <span>Today</span>
                        </Link>
                    </li>
                    <li>
                        <img src={img3} />
                        <Link to="/upcoming">
                            <span>Upcoming</span>
                        </Link>
                    </li>
                    <li>
                        <img src={img4} />
                        <span>Inbox</span>
                    </li>
                </ul>
            </div>

            <div className={cx('bottom')}></div>

            <div className={cx('actions')}>
                <div className={cx('header-actions')}>
                    <h4>Private</h4>
                    <button onClick={onNewPage}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>

            <div className={cx('list-task')}>
                <ul>
                    {listTask.map((item) => (
                        <li id={cx(idTask === item.id && 'active')} key={item.id}>
                            <div className={cx('item')} onClick={() => setIdTask(item.id)}>
                                <img src={img5} alt={item.name || 'new Page'} />
                                {editTaskId === item.id ? (
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        onBlur={() => updateName(item.id)}
                                        onKeyDown={(e) => e.key === 'Enter' && updateName(item.id)} // Save on Enter key press
                                        id={cx('name')}
                                    />
                                ) : (
                                    <h4
                                        onDoubleClick={() => {
                                            setEditTaskId(item.id);
                                            setNewName(item.name);
                                        }}
                                    >
                                        {item.name || 'new Page'}
                                    </h4>
                                )}
                            </div>
                            <button className={cx('btn')} onClick={() => onGetIdTask(item.id)}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                            {idModal === item.id && (
                                <div className={cx('actions-list', idModal === item.id ? 'slide-in' : 'slide-out')}>
                                    <button onClick={handleCopyTask}>
                                        <FontAwesomeIcon icon={faCopy} />
                                        <span>Copy</span>
                                    </button>
                                    <button onClick={handleDelete}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        <span>Delete</span>
                                    </button>
                                    <button onClick={() => setIdModal(0)}>
                                        <FontAwesomeIcon icon={faClose} />
                                        <span>Close</span>
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={cx('actions-2')}>
                <button>
                    <img src={img6} />
                    <span>Pomodoro</span>
                </button>
                <button>
                    <img src={img7} />
                    <span>Chat</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
