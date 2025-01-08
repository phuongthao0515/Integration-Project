import { useState, useEffect } from 'react';
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

import { GoSmiley } from 'react-icons/go';
import { CiImageOn } from 'react-icons/ci';

const SharedCover = ({ id, data }) => {
    const [coverImg, setCoverImg] = useState(null);

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

    useEffect(() => {
        if (data?.document) {
            const cover = coverImages[data.document] || cover1;
            setCoverImg(cover);
        }
    }, [data]);

    return (
        <div className="relative">
            <img src={coverImg || cover1} className="w-[100%] h-[25vh] object-cover" alt="Cover" />
            <div className="absolute bottom-[-20px] ml-2">
                {data?.icon && (
                    <div className="flex items-center gap-2">
                        <span className="text-5xl">{data.icon}</span>
                        <p className="text-lg font-semibold">{data.title}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SharedCover; 
