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

    const shareNote = () => {
        // Implement share functionality here
        alert('Share functionality is not implemented yet.');
    };

    return (
        <div className="note-page">
            <div className="editor-menu">
                <Link to="/home" className="menu-button">
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
                <button onClick={shareNote} className="menu-button">
                    Share
                </button>
            </div>
            <EditorContent editor={editor} className="editor-content" />
        </div>
    );
};

export default NotePage;