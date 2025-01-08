import { useContext, useRef, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import { FaRegNoteSticky } from "react-icons/fa6";

const ShareTitle = ({ id,size,data }) => {
    return (
        <div className={`flex items-center gap-x-2 text-lg ${size === 'big'? 'mt-8 ml-12':'mt-4'} relative mb-4`}>
            {size === 'small' && (data?.icon ? <p>{data?.icon}</p> : <FaRegNoteSticky className="text-2xl" />)}
            {size === 'big' ? (
                <>
                    <p
                        className="font-bold text-4xl bg-white px-6 py-2 absolute bottom-0 rounded-md"
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        }}
                    >
                        {data.title}
                    </p>
                </>
            ) : (
                <p>{data?.title}</p>
            )}
        </div>
    );
};

export default ShareTitle;
