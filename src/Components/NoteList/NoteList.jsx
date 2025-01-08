import { useContext, useEffect, useState } from 'react';
import './NoteList.scss';
import docPic from '../../assets/doc.png';
import closePic from '../../assets/close.png';
import deletePic from '../../assets/delete.png';
import morePic from '../../assets/more.png';
import plusPic from '../../assets/add-task.png';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context';

const NoteList = () => {
    const { notes, setNotes, chosenNote, setChosenNote } = useContext(GlobalContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/note/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Error fetching notes.';
                        throw new Error(errorMsg);
                    });
                }
                return res.json();
            })
            .then((datas) => {
                if (datas) {
                    setNotes(datas);

                    // Ensure the chosenNote persists on updates
                    if (chosenNote) {
                        const updatedNote = datas.find((n) => n.pageid === chosenNote.pageid);
                        if (updatedNote) {
                            setChosenNote(updatedNote);
                        }
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []); // Empty dependency array ensures this runs only on mount

    const [newNoteName, setNewNoteName] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [newName, setNewName] = useState('');
    const [idModal, setIdModal] = useState(null);
    const [chosenId, setChosenId] = useState(null);
    useEffect(() => {
        console.log('Chosen note updated:', chosenNote);

        setChosenId(chosenNote?.pageid);
    }, [chosenNote]);
    const addNote = () => {
        const newNote = {
            pageid: notes.length + 1,
            name: newNoteName || 'Untitled',
            content: '',
        };
        fetch(`http://127.0.0.1:8000/api/v1/note/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ title: 'Untitled' }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Failed to delete the note. Please try again.';
                        throw new Error(errorMsg);
                    });
                }

                return res.json();
            })
            .then((data) => {
                newNote.pageid = data?.note_id;

                setNotes([...notes, newNote]);

                setEditNoteId(newNote.pageid);
                setNewName(newNote.name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setNewNoteName(''); // Clear the newName state
    };

    const updateName = (id) => {
        console.log('Note id: ', id);
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/title/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ title: newName }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Failed to delete the note. Please try again.';
                        throw new Error(errorMsg);
                    });
                }

                return res.text().then((text) => (text ? JSON.parse(text) : {}));
            })
            .then(() => {
                setNotes(notes.map((note) => (note.pageid === id ? { ...note, title: newName } : note)));
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setEditNoteId(null);
    };

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Failed to delete the note. Please try again.';
                        throw new Error(errorMsg);
                    });
                }

                return res.text().then((text) => (text ? JSON.parse(text) : {}));
            })
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter((note) => note.pageid !== id));
                setChosenNote(null);
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleModalToggle = (id) => {
        setIdModal(idModal === id ? null : id);
    };

    return (
        <div className="note-list">
            <div className="add-note-container">
                <span className="add-note-text">Notes</span>
                <button className="add-note-button" onClick={addNote}>
                    <img src={plusPic} alt="Add" className="plus-icon" />
                </button>
            </div>
            <ul>
                {notes?.map((note) => (
                    <li
                        key={note.pageid}
                        className={`note-item ${note.pageid === chosenId ? 'active' : ''}`}
                        onClick={() => {
                            setChosenNote(note);
                            setChosenId(note.pageid);
                        }} // Set chosenNote to the clicked note
                    >
                        <div className="item">
                            <img src={docPic} alt={note.title || 'Untitled'} className="icon" />
                            {editNoteId === note.pageid ? (
                                <input
                                    autoFocus
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onBlur={() => updateName(note.pageid)}
                                    onKeyDown={(e) => e.key === 'Enter' && updateName(note.pageid)}
                                    className="name outline-none rounded-md"
                                />
                            ) : (
                                <Link to={`/note/${note.pageid}`} className="note-title">
                                    {note.pageid === chosenNote?.pageid ? chosenNote.title : note.title || 'Untitled'}
                                </Link>
                            )}
                        </div>
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleModalToggle(note.pageid);
                            }}
                        >
                            <img src={morePic} alt="More" className="icon" />
                        </button>
                        {idModal === note.pageid && (
                            <div className="actions-list">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIdModal(null);
                                    }}
                                >
                                    <img src={closePic} alt="Close" className="icon" />
                                    <span>Close</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(note.pageid);
                                    }}
                                >
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
