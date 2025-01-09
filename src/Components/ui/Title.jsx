import { useContext, useRef, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import { FaRegNoteSticky } from 'react-icons/fa6';

const Title = ({ id, size }) => {
    const inputRef = useRef(null);
    const { setNotes, chosenNote, setChosenNote } = useContext(GlobalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(chosenNote?.title);

    // Sync title state with chosenNote updates
    useEffect(() => {
        setTitle(chosenNote?.title || '');
    }, [chosenNote]);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (e) => {
        const updatedTitle = e.target.value;

        setTitle(updatedTitle);
        setChosenNote({ ...chosenNote, title: updatedTitle });

        fetch(`http://127.0.0.1:8000/api/v1/note/notes/title/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ title: updatedTitle }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Failed to update the note. Please try again.';
                        throw new Error(errorMsg);
                    });
                }

                return res.json();
            })
            .then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.pageid === chosenNote.pageid ? { ...note, title: updatedTitle } : note,
                    ),
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            disableInput();
        }
    };

    return (
        <div className={`flex items-center gap-x-2 text-lg ${size === 'big' && 'mt-8 ml-12'}`}>
            {size === 'small' &&
                (chosenNote?.icon ? <p>{chosenNote?.icon}</p> : <FaRegNoteSticky className="text-2xl" />)}
            {isEditing ? (
                <input
                    className={`${size === 'small' && 'h-7'} px-2 focus-visible:ring-transparent outline-none ${
                        size === 'big' && 'text-4xl font-bold py-2'
                    }`}
                    ref={inputRef}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                />
            ) : (
                <button onClick={enableInput} className="font-normal h-auto p-1 outline-none">
                    <span className={`truncate ${size === 'big' && 'text-4xl font-bold'}`}>{title}</span>
                </button>
            )}
        </div>
    );
};

export default Title;
