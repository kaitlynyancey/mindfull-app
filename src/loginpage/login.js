import React, { Component } from 'react';
import JournalContext from '../JournalContext';
const { API_BASE_URL } = require('../config')

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        }
    }

    static contextType = JournalContext

    handleLogin = e => {
        e.preventDefault()
        const username = e.target.username.value
        const userCheck = this.context.users.filter(user =>
            user.username === username)
        
        //check to see if username exists
        if (userCheck.length === 0) {
            alert('This username does not exist. Please enter another username or sign up for a new account.')
        }
        
        //check to see if password matches
        const password = e.target.pw.value
        if (userCheck[0].pw !== password) {
            alert('Incorrect password entered! Please try again.')
        }

        //login and update current user
        else if (userCheck.length !== 0) {
            const currentUser = userCheck[0]
            this.context.updateCurrentUser(currentUser)
            this.props.history.push('/')
        }
    }
    handleRegister = e => {
        e.preventDefault()
        const newUsername = e.target.newUsername.value
        const password = e.target.newPw.value

        //check to see if username already exists
        const check = this.context.users.filter(user =>
            user.username === newUsername)
        if (check.length !== 0) {
            alert('This username already exists. Please choose a different username.')
        }

        //if unique username, add it to the database and update the current user
        else if (check.length === 0) {
            const newUser = {
                username: newUsername,
                pw: password
            }
            fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(error => {
                            throw error
                        })
                    }
                    return res.json()
                })
                .then(response => {
                    this.context.addUser(response)
                    this.context.updateCurrentUser(response)
                    this.props.history.push('/')
                })
                .catch(error => {
                    this.setState({ error })
                })
        }
    }

    render() {
        return (
            <div className="loginpage fade-in">
                <section className="center">
                    <h3>For returning users, please login here:</h3>
                </section>
                <form onSubmit={this.handleLogin}>
                    <section>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" required />
                        <br></br>
                        <br></br>
                        <label htmlFor="pw">Password: </label>
                        <input type="text" id="pw" name="pw" required />
                    </section>
                    <button type="submit">Login</button>
                </form>
                <section className="center">
                    <h3>For new users, please sign up here:</h3>
                </section>
                <form onSubmit={this.handleRegister}>
                    <section>
                        <label htmlFor="newUsername"> Username: </label>
                        <input type="text" id="newUsername" name="newUsername" required />
                        <br></br>
                        <br></br>
                        <label htmlFor="newPw">Password: </label>
                        <input type="text" id="newPw" name="newPw" required />
                    </section>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default LoginPage;