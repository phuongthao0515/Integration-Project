import { useContext, useState, useEffect } from 'react';
import cover1 from '../../assets/images/cover.jpg';
import cov1 from '../../assets/cover/cover1.jpg';
import cov2 from '../../assets/cover/cover2.jpg';
import cov3 from '../../assets/cover/cover3.jpg';
import cov4 from '../../assets/cover/cover4.jpg';
import cov5 from '../../assets/cover/cover5.jpg';
import cov6 from '../../assets/cover/cover6.jpg';
import cov7 from '../../assets/cover/cover7.jpg';
import cov8 from '../../assets/cover/cover8.jpg';
import cov9 from '../../assets/cover/cover9.jpg';
import cov10 from '../../assets/cover/cover10.jpg';
import cov11 from '../../assets/cover/cover11.jpg';
import cov12 from '../../assets/cover/cover12.jpg';

import { GlobalContext } from '../../context';
import { GoSmiley } from 'react-icons/go';
import { CiImageOn } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import EmojiPicker from 'emoji-picker-react';

const Cover = ({ id, data }) => {
    const { chosenNote, setChosenNote } = useContext(GlobalContext);
    const [coverImg, setCoverImg] = useState(null);
    const [icon, setIcon] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    console.log('hello cover: ', data);
    const coverImages = {
        1: cov1,
        2: cov2,
        3: cov3,
        4: cov4,
        5: cov5,
        6: cov6,
        7: cov7,
        8: cov8,
        9: cov9,
        10: cov10,
        11: cov11,
        12: cov12,
    };

    const toggleEmojiPicker = () => {
        setIsOpen(!isOpen);
    };

    const generateCover = () => {
        const random = Math.floor(Math.random() * 12) + 1; // Generate a random cover ID (1-12)

        // Set the cover image in the UI immediately
        setCoverImg(coverImages[random] || cover1);
        setIsLoading(true); // Start loading

        fetch(`http://127.0.0.1:8000/api/v1/note/notes/cover/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ cover: random }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        const errorMsg = errorData.detail || 'Failed to update the cover. Please try again.';
                        throw new Error(errorMsg);
                    });
                }
                return res.json();
            })
            .then(() => {
                setCoverImg(coverImages[random] || cover1);
                setChosenNote({ ...chosenNote, document: random });
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false); // Stop loading once the operation is complete
            });
    };

    useEffect(() => {
        if (chosenNote?.document) {
            const cover = coverImages[chosenNote.document] || cover1;
            setCoverImg(cover);
        }
        if (chosenNote?.icon) {
            setIcon(chosenNote.icon);
        }
        setIsLoading(false); // Ensure loading is false after initial render
    }, [chosenNote]);

    const handleEmojiClick = (data) => {
        setIcon(data.emoji);
        setIsOpen(false);

        // Update the icon in the chosenNote
        setChosenNote({ ...chosenNote, icon: data.emoji });

        // Send the updated icon to the backend
        fetch(`http://127.0.0.1:8000/api/v1/note/notes/icon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ icon: data.emoji }),
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="relative">
            {isLoading ? (
                // Skeleton loader
                <div className="w-[100%] h-[25vh] bg-gray-200 animate-pulse"></div>
            ) : (
                coverImg?<img src={coverImg} className="w-[100%] h-[25vh] object-cover" alt="Cover" />:<div className="w-[100%] h-[25vh]"></div>
            )}

            <div className="absolute bottom-[-20px] ml-2">
                <div className="flex gap-4 ml-8">
                    {icon ? (
                        <div className="relative flex gap-2 items-center">
                            <span className="text-5xl">{icon}</span>
                            <button
                                onClick={() => setIcon(null)}
                                className="absolute top-[-10px] right-[-10px] text-gray-600 p-0.5 rounded-full bg-white"
                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                }}
                            >
                                <IoClose className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEmojiPicker}
                            className="text-gray-600 p-2 rounded flex gap-2 items-center bg-white h-10"
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                            }}
                        >
                            <GoSmiley className="w-6 h-6" />
                            <p>Add icon</p>
                        </button>
                    )}
                    <button
                        onClick={generateCover}
                        className="text-gray-600 p-2 rounded flex gap-2 items-center bg-white h-10"
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        }}
                    >
                        <CiImageOn className="w-6 h-6" />
                        <p>Change cover</p>
                    </button>
                </div>
                {isOpen && (
                    <div className="absolute top-0 left-0 z-50" style={{ zIndex: '9999', position: 'absolute' }}>
                        <EmojiPicker height={350} onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cover;
