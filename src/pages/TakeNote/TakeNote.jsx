import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

import classNames from 'classnames/bind';
import styles from './TakeNote.module.scss';

import img1 from '../../assets/images/photo.png';
import Navbar from '../../Components/NavBar/NavBar';

const cx = classNames.bind(styles);

function TakeNote() {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);
    const [content, setContent] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // State riêng cho mỗi task để lưu todo list của task đó
    const [taskTodoItems, setTaskTodoItems] = useState({});
    const [showPopup, setShowPopup] = useState(false); // State cho popup
    const [accessRight, setAccessRight] = useState('private'); // Lưu giá trị của access right
    const [email, setEmail] = useState(''); // Trường nhập email khi chọn public
    const [role, setRole] = useState('view'); // Vai trò (edit/view)

    const editor = useEditor({
        extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true }), Image, ImageResize],
        content: content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);

            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
            const newTimeout = setTimeout(() => {
                saveContent(html);
            }, 500);
            setDebounceTimeout(newTimeout);
        },
    });
    const addLocalImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Tạo Blob URL để hiển thị ảnh
            const imageUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: imageUrl }).run();
        }
    };

    const addTodo = () => {
        const newTodo = {
            id: Date.now(),
            content: 'New Task',
            completed: false,
        };

        setTaskTodoItems((prevState) => {
            const updatedTodoItems = { ...prevState };
            if (!updatedTodoItems[idTask]) {
                updatedTodoItems[idTask] = [];
            }
            updatedTodoItems[idTask] = [...updatedTodoItems[idTask], newTodo];
            return updatedTodoItems;
        });
    };

    const toggleTodo = (id) => {
        setTaskTodoItems((prevState) => {
            const updatedTodoItems = { ...prevState };
            if (updatedTodoItems[idTask]) {
                updatedTodoItems[idTask] = updatedTodoItems[idTask].map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
                );
            }
            return updatedTodoItems;
        });
    };

    const renderTodoList = () => {
        return taskTodoItems[idTask]?.map((todo) => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.content}</span>
            </li>
        ));
    };

    const saveContent = (html) => {
        const task = listTask.find((item) => item.id === idTask);
        if (task && html !== task.content) {
            task.content = html;
            setListTask([...listTask]);
        }
    };

    const handleShareClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleAccessRightChange = (event) => {
        setAccessRight(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(() => {
        if (editor && idTask) {
            const task = listTask.find((item) => item.id === idTask);
            editor.commands.setContent(task ? task.content : '<h1>New Page!</h1>');
        }
    }, [editor, idTask, listTask]);

    return (
        <div className="app">
            <div className="sidebar">
                <Navbar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>
            <div className={cx('wrapper')}>
                {editor && (
                    <div>
                        <div className={cx('menu-bar')}>
                            <button onClick={addTodo}>Add Todo</button>
                            <button>
                                <label htmlFor="upload-image" className={cx('upload-button')}>
                                    <img src={img1} alt="" />
                                    Upload Image
                                </label>
                            </button>
                            <input
                                id="upload-image"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={addLocalImage}
                            />
                            <button onClick={handleShareClick}>Share</button>
                        </div>

                        <EditorContent editor={editor} className={cx('editor-content')} />
                        <ul>{renderTodoList()}</ul>
                    </div>
                )}
            </div>

            {/* Popup Share */}
            {showPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-content')}>
                        <h2>Share Document</h2>
                        <label>
                            <strong>Access Rights</strong>
                        </label>
                        <div>
                            <select value={accessRight} onChange={handleAccessRightChange}>
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>

                        {accessRight === 'public' && (
                            <>
                                <div className={cx('popup-email')}>
                                    <input
                                        type="email"
                                        placeholder="Enter email to share"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className={cx('popup-role')}>
                                    <label>Role</label>
                                    <select value={role} onChange={handleRoleChange}>
                                        <option value="view">View</option>
                                        <option value="edit">Edit</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div className={cx('popup-actions')}>
                            <button onClick={handlePopupClose}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TakeNote;
