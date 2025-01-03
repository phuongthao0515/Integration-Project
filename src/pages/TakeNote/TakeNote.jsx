import './TakeNote.module.scss';
import Main from '../../Components/Main/Main';
import Navbar from '../../Components/Navbar/Navbar';

import { useState } from 'react';

function TakeNote() {
    const [listTask, setListTask] = useState([]);
    const [idTask, setIdTask] = useState(0);

    return (
        <div className="app">
            <div className="sidebar">
                <Navbar listTask={listTask} setListTask={setListTask} setIdTask={setIdTask} idTask={idTask} />
            </div>

            <div>
                <Main listTask={listTask} idTask={idTask} setListTask={setListTask} />
            </div>
        </div>
    );
}

export default TakeNote;