import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LuGlobe } from 'react-icons/lu';
import { GlobalContext } from '../../context';
import { FaCheck } from 'react-icons/fa6';
import { LuCopy } from 'react-icons/lu';

const Publish = ({ id }) => {
    const [toggle, setToggle] = useState(false);
    const { chosenNote, setChosenNote, setNotes } = useContext(GlobalContext);
    const [share, setShare] = useState(chosenNote?.visibility || false);
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(`http://localhost:3001/note/shared/${id}`);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onShare = () => {
        setShare(true);
    };

    const onPrivate = () => {
        setShare(false);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/visibility/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ visibility: share }),
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
                setChosenNote({ ...chosenNote, visibility: share });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [share]);

    return (
        <div className="relative">
            <div
                className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer hover:bg-[#f8eee2]"
                onClick={() => setToggle(!toggle)}
            >
                <p className="font-semibold">Publish</p>
                {share && <LuGlobe className="text-lg text-blue-600" />}
            </div>
            {toggle ? (
                share ? (
                    <div
                        className="absolute w-[240px] left-[-140px] flex flex-col items-start bg-white rounded-md gap-4 p-4 mt-1 z-50" // Increased z-index for Publish pop-up
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        }}
                    >
                        <div className="flex gap-2 items-center text-blue-500">
                            <LuGlobe />
                            <p className="text-sm">This note is live on web</p>
                        </div>
                        <div className="flex items-center w-[100%]">
                            <input
                                disabled
                                value={`http://localhost:3001/note/shared/${id}`}
                                className="px-2 text-xs border rounded-l-md h-8 bg-muted truncate flex-grow"
                            />
                            <button
                                onClick={onCopy}
                                disabled={copied}
                                className="flex justify-center h-8 rounded-l-none bg-[#7d654f] text-white py-2 w-8 hover:bg-[#997b60] rounded-r-md"
                            >
                                {copied ? <FaCheck className="h-4 w-4" /> : <LuCopy className="h-4 w-4" />}
                            </button>
                        </div>
                        <button
                            className="border-none font-semibold text-sm bg-[#7d654f] text-white w-[100%] py-1 rounded-md hover:bg-[#997b60]"
                            onClick={onPrivate}
                        >
                            Unpublish
                        </button>
                    </div>
                ) : (
                    <div
                        className="absolute w-[240px] left-[-160px] flex flex-col items-center bg-white rounded-md gap-2 p-4 mt-1 z-50" // Increased z-index for Publish pop-up
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        }}
                    >
                        <LuGlobe className="text-3xl text-[#57606f]" />
                        <p className="text-md font-bold">Publish this note</p>
                        <p className="text-sm text-[#747d8c]">Share your work with others</p>
                        <button
                            className="border-none font-semibold text-sm bg-[#7d654f] text-white w-[100%] py-1 rounded-md hover:bg-[#997b60]"
                            onClick={onShare}
                        >
                            Publish
                        </button>
                    </div>
                )
            ) : null}
        </div>
    );
};

export default Publish;
