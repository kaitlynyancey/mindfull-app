const DATA = {
    entries: [
        {
            id: 1,
            date: new Date().toLocaleDateString(),
            mood: 'happy',
            stressLevel: '5',
            gratitudes: ['A', 'B', 'C'],
            notes: 'test notes',
            userId: 1,
        },
        {
            id: 2,
            date: new Date().toLocaleDateString(),
            mood: 'sad',
            stressLevel: '7',
            gratitudes: ['A', 'B', 'C'],
            notes: 'test notes',
            userId: 2,
        },
        {
            id: 3,
            date: new Date().toLocaleDateString(),
            mood: 'angry',
            stressLevel: '9',
            gratitudes: ['A', 'B', 'C'],
            notes: 'test notes',
            userId: 3,
        },
    ],
    users: [
        {
            id: 1,
            username: 'kaitlyn',
        },
        {
            id: 2,
            username: 'dodge',
        },
        {
            id: 3,
            username: 'yancey',
        },
    ]
}

module.exports = DATA