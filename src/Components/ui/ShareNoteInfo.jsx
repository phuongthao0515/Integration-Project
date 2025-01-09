import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';

const ShareNoteInfo = ({ id, data }) => {
    console.log(data);
    const [owner, setOwner] = useState(null);
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return;
        const date = new Date(dateTimeString);

        const formattedDate = date.toISOString().split('T')[0];

        const formattedTime = date.toTimeString().split(' ')[0];

        return `${formattedDate} ${formattedTime}`;
    };

    useEffect(() => {
        const getOwner = () => {
            fetch(`http://127.0.0.1:8000/api/v1/note/owner/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((errorData) => {
                            const errorMsg = errorData.detail || 'Failed to get the owner';
                            throw new Error(errorMsg);
                        });
                    }
                    return res.json();
                })
                .then((res) => {
                    setOwner(res.email);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        getOwner();
    });
    return (
        <div className="flex gap-4 m-6">
            <div
                className="border border-gray-300 px-6 py-2 rounded-md text-gray-500"
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
            >
                <div className="flex gap-2 items-center">
                    <CiUser className="text-2xl" />
                    <p>{owner}</p>
                </div>
            </div>
            <div
                className="border border-gray-300 px-6 py-2 rounded-md text-gray-500"
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
            >
                <div className="flex gap-2 items-center">
                    <MdOutlineCreateNewFolder className="text-2xl" />
                    {formatDateTime(data?.created_date)}
                </div>
            </div>
            <div
                className="border border-gray-300 px-6 py-2 rounded-md text-gray-500 "
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
            >
                <div className="flex gap-2 items-center">
                    <IoCreateOutline className="text-2xl" />
                    {formatDateTime(data?.updated_date)}
                </div>
            </div>
        </div>
    );
};
export default ShareNoteInfo;
