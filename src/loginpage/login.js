import React, { Component } from 'react';
import JournalContext from '../JournalContext';

const { v4: uuid } = require('uuid')

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        }
    }

    static contextType = JournalContext

    componentDidMount() {
        
        
    }

    handleLogin = e => {
        e.preventDefault()
        const username = e.target.username.value
        const check = this.context.users.filter(user => 
            user.username === username)
        if (check.length === 0) {
            alert('This username does not exist. Please enter another username or sign up for a new account.')
        }
        else if (check.length !== 0) {
            this.context.updateCurrentUser(username)
            this.props.history.push('/')
        }
    }
    handleRegister = e => {
        e.preventDefault()
        const newUsername = e.target.newUser.value
        const check = this.context.users.filter(user => 
            user.username === newUsername)
        if(check.length !== 0) {
            alert('This username already exists. Please choose a different username.')
        }
        else if (check.length === 0) {
            const newUser = {
                id: uuid(),
                username: newUsername,
            }
            this.context.addUser(newUser)
            this.context.updateCurrentUser(newUsername)
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="loginpage">
                <section>
                    <h3>For returning users, please login here:</h3>
                </section>
                <form onSubmit={this.handleLogin}>
                    <section>
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" name="username" required />
                        <br></br>
                    </section>
                    <button type="submit">Login</button>
                </form>
                <section>
                    <h3>For new users, please sign up here:</h3>
                </section>
                <form onSubmit={this.handleRegister}>
                    <section>
                        <label htmlFor="username"> New Username: </label>
                        <input type="text" id="newUser" name="newUser" required />
                        <br></br>
                    </section>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default LoginPage;