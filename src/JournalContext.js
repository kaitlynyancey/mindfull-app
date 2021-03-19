import React from 'react';

const JournalContext = React.createContext({
    addEntry: () => {},
    deleteEntry: () => {},
    updateEntry: () => {},
    entries: [],
    users: [],
    currentUser: '',
})

export default JournalContext