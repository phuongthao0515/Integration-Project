import { createContext, useState } from 'react';






export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    
    const [notes,setNotes] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                notes,
                setNotes
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
