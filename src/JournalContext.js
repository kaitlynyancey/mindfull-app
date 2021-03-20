import React from 'react';

const JournalContext = React.createContext({
    addEntry: () => {},
    deleteEntry: () => {},
    updateEntry: () => {},
    updateCurrentUser: () => {},
    addUser: () => {},
    entries: [],
    users: [],
    currentUser: '',
})

export default JournalContext