import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import NavBar1 from '../../Components/NavBar1/NavBar1';
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import avt from '../../assets/images/avatar.png';
import Title from '../../Components/ui/Title';
import { GlobalContext } from '../../context';
import Publish from '../../Components/ui/Publish';
import Cover from '../../Components/ui/Cover';
import Editor from '../../Components/ui/Editor';

const cx = classNames.bind(styles);

const NoteID = () => {
    const { pageid } = useParams();
    const { chosenNote, setChosenNote } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/${pageid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Login failed. Please try again.';
                        throw new Error(errorMsg);
                    });
                }

                return res.json();
            })
            .then((data) => {
                if (data) {
                    setChosenNote(data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [pageid, setChosenNote]);

    const onChange = (content) => {
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/content/${pageid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ content: content }),
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
                setChosenNote({ ...chosenNote, content: content });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={cx('dashboard')}>
            <NavBar1 />
            <main className="flex-1">
                {loading ? (
                    <Skeleton />
                ) : chosenNote ? (
                    <div className="bg-white h-full">
                        <div className="w-full h-10 bg-white flex items-center px-3 justify-between">
                            <Title id={pageid} size="small" />
                            <div className="flex items-center gap-x-2">
                                <Publish id={pageid} />
                            </div>
                        </div>

                        <div>
                            <Cover id={pageid} />
                            <Title id={pageid} size="big" />
                            <Editor
                                id={pageid}
                                onChange={onChange}
                                initialContent={chosenNote.content}
                                editable={true}
                            />
                        </div>
                    </div>
                ) : (
                    <Skeleton />
                )}
            </main>
        </div>
    );
};

export default NoteID;
