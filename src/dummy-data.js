const DATA = {
    entries: [
        {
            id: "1",
            date: '1/1/2021',
            month: 'January',
            mood: 'Happy',
            stressLevel: '3',
            gratitudes: ['My dog', 'My health', 'My family'],
            notes: 'This is an example journal entry. Login to your account or sign up for a new account to enter your own entries!',
            userId: 'ADMIN',
        },
        {
            id: "2",
            date: '2/23/2021',
            month: 'February',
            mood: 'Sad',
            stressLevel: '6',
            gratitudes: ['Enter in what you are grateful for', 'It can be anything', 'Try it out for yourself'],
            notes: 'Click on the New Entry tab to fill out an example journal entry. Note, this will not be saved to your account unless you are signed in',
            userId: 'ADMIN',
        },
        {
            id: "3",
            date: '3/10/21',
            month: 'March',
            mood: 'Bored',
            stressLevel: '4',
            gratitudes: ['Example A', 'Example B', 'Example C'],
            notes: 'Thanks for testing out my app :)',
            userId: 'ADMIN',
        },
    ],
    users: [
        {
            id: '1',
            username: 'ADMIN',
        },
        {
            id: '2',
            username: 'Kaitlyn',
        },
    ]
}

module.exports = DATA