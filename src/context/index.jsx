import { createContext, useState } from 'react';






export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    
    const [notes,setNotes] = useState(null);
    const [chosenNote,setChosenNote] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                notes,
                setNotes,
                chosenNote,
                setChosenNote,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
