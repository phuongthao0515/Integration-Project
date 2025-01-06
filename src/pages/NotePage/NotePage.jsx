import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import './NotePage.scss';

import returnPic from '../../assets/return.png';

const NotePage = () => {
    const [content, setContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [accessRight, setAccessRight] = useState('restricted');
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    const editor = useEditor({
        extensions: [StarterKit, Image, ImageResize],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    const addLocalImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: imageUrl }).run();
        }
    };

    const addList = () => {
        editor.chain().focus().toggleBulletList().run();
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

    const handleAddEmail = () => {
        if (email && !emails.includes(email)) {
            setEmails([...emails, email]);
            setEmail('');
        }
    };

    const handleSave = () => {
        // Implement save functionality here
        alert('Settings saved.');
        setShowPopup(false);
    };

    return (
        <div className="note-page">
            <div className="editor-menu">
                <Link to="/today" className="menu-button">
                    <img src={returnPic} alt="Return" className="return-icon" />
                    Return
                </Link>
                <label htmlFor="upload-image" className="upload-button">
                    Upload Image
                </label>
                <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={addLocalImage}
                />
                <button onClick={addList} className="menu-button">
                    Add as List
                </button>
                <button onClick={handleShareClick} className="menu-button">
                    Share
                </button>
            </div>
            <EditorContent editor={editor} className="editor-content" />

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Share Document</h2>
                        <label>
                            <strong>Access Rights</strong>
                        </label>
                        <div>
                            <select value={accessRight} onChange={handleAccessRightChange}>
                                <option value="restricted">Restricted</option>
                                <option value="public">Public</option>
                            </select>
                        </div>

                        {accessRight === 'restricted' && (
                            <>
                                <div className="popup-email">
                                    <input
                                        type="email"
                                        placeholder="Enter email to share"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <button onClick={handleAddEmail}>Add</button>
                                </div>
                                <ul className="email-list">
                                    {emails.map((email, index) => (
                                        <li key={index}>{email}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <div className="popup-actions">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handlePopupClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotePage;
