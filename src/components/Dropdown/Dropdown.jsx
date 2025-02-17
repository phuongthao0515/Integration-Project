import React from 'react';
import './Dropdown.scss';
import createIcon from '../../assets/add-task.png';

const Dropdown = ({ onAddNote, onAddPlan }) => {
    return (
        <div className="menu">
            <div className="item">
                <a href="#" className="link">
                    <img src={createIcon} alt="Create icon" className="create-icon" />
                    <span> Create </span>
                    <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_iconCarrier">
                            <path
                                id="XMLID_225_"
                                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                            ></path>
                        </g>
                    </svg>
                </a>
                <div className="submenu">
                    {/* <div className="submenu-item">
                        <a href="#" className="submenu-link" onClick={onAddNote}>
                            Add note
                        </a>
                    </div> */}
                    <div className="submenu-item">
                        <a href="#" className="submenu-link" onClick={onAddPlan}>
                            Make plan
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
