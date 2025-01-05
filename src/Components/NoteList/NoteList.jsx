import React, { useState } from 'react';
import './NoteList.scss';
import docPic from '../../assets/doc.png';
import closePic from '../../assets/close.png';
import deletePic from '../../assets/delete.png';
import morePic from '../../assets/more.png';
import plusPic from '../../assets/add-task.png';
import { Link } from 'react-router-dom';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteName, setNewNoteName] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [newName, setNewName] = useState('');
    const [idModal, setIdModal] = useState(null);

    const addNote = () => {
        const newNote = {
            id: notes.length + 1,
            name: newNoteName || 'New Note',
        };
        setNotes([...notes, newNote]);
        setNewNoteName('');
    };

    const updateName = (id) => {
        setNotes(notes.map((note) => (note.id === id ? { ...note, name: newName } : note)));
        setEditNoteId(null);
    };

    const handleDelete = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
        setIdModal(null);
    };

    const handleModalToggle = (id) => {
        setIdModal(idModal === id ? null : id);
    };

    return (
        <div className="note-list">
            <div className="add-note-container">
                <Link to="/note">
                    <span className="add-note-text">Notes</span>
                </Link>
                <button className="add-note-button" onClick={addNote}>
                    <img src={plusPic} alt="Add" className="plus-icon" />
                </button>
            </div>
            <ul>
                {notes.map((note) => (
                    <li key={note.id} className="note-item">
                        <div className="item">
                            <img src={docPic} alt={note.name || 'New Note'} className="icon" />
                            {editNoteId === note.id ? (
                                <input
                                    autoFocus
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onBlur={() => updateName(note.id)}
                                    onKeyDown={(e) => e.key === 'Enter' && updateName(note.id)}
                                    className="name"
                                />
                            ) : (
                                <div
                                    className="note-title"
                                    onDoubleClick={() => {
                                        setEditNoteId(note.id);
                                        setNewName(note.name);
                                    }}
                                >
                                    {note.name || 'New Note'}
                                </div>
                            )}
                        </div>
                        <button className="btn" onClick={() => handleModalToggle(note.id)}>
                            <img src={morePic} alt="More" className="icon" />
                        </button>
                        {idModal === note.id && (
                            <div className="actions-list">
                                <button onClick={() => setIdModal(null)}>
                                    <img src={closePic} alt="Close" className="icon" />
                                    <span>Close</span>
                                </button>
                                <button onClick={() => handleDelete(note.id)}>
                                    <img src={deletePic} alt="Delete" className="icon" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
