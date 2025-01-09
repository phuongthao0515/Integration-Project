import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from './Error';
import Title from './Title';

import Editor from './Editor';
import SharedCover from './ShareNoteCover';
import ShareTitle from './ShareTitle';
import ShareNoteInfo from './ShareNoteInfo';

const ShareNote = () => {
    const { pageid } = useParams();
    const [sharedNote, setSharedNote] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            setSharedNote(null);
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/v1/note/shared/${pageid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();

                    setErr(errorData.detail || 'An unexpected error occurred.');
                    return;
                }

                const data = await res.json();
                if (data.status_code) {
                    setErr(data.detail);
                    setSharedNote(null);
                    return;
                }
                setErr(null);
                setSharedNote(data);
            } catch (err) {
                console.error('Network error:', err);
                setErr('A network error occurred. Please try again.');
            }
        };

        fetchNote();
        console.log('Shared note: ', sharedNote);
    }, [pageid]);

    return (
        <div>
            {err && <Error err={err} />}
            {!err && sharedNote && (
                <div className="min-h-screen bg-white flex flex-col justify-between">
                    <div className="bg-white h-full">
                        <div className="w-full h-10 bg-white flex items-center px-3 justify-between">
                            <ShareTitle id={sharedNote.pageid} size="small" data={sharedNote} />
                        </div>

                        <div>
                            <SharedCover id={sharedNote.pageid} data={sharedNote} />
                            <ShareTitle id={sharedNote.pageid} size="big" data={sharedNote} />
                            <div className="mt-6">
                                <Editor
                                    id={pageid}
                                    onChange={() => {}}
                                    initialContent={sharedNote.content}
                                    editable={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <ShareNoteInfo id={sharedNote?.pageid} data={sharedNote} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareNote;
