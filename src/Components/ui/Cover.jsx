import { useContext, useState } from 'react';
import cover from '../../assets/images/cover.jpg';
import { GlobalContext } from '../../context';
import EmojiPicker from 'emoji-picker-react';
import { GoSmiley } from 'react-icons/go';
import { CiImageOn } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const Cover = ({ id }) => {
    const { chosenNote,setChosenNote } = useContext(GlobalContext);
    const [icon, setIcon] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleEmojiPicker = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div className="relative">
            <img src={cover} className="w-[100%] h-[25vh] object-cover" />
            <div className="absolute bottom-[-20px]  ml-2">
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
                        onClick={toggleEmojiPicker}
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
                    <div className="absolute top-0 left-0">
                        <EmojiPicker
                            height={350}
                            onEmojiClick={(data) => {
                                setIcon(data.emoji);
                                setIsOpen(false); 
                                setChosenNote({...chosenNote,icon:data.emoji})
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cover;
