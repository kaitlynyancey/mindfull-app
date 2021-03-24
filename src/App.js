import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './homepage/home';
import AboutPage from './aboutpage/about';
import EntryPage from './entrypage/entry';
import JournalPage from './journalpage/journal';
import Nav from './nav/nav';
import JournalContext from './JournalContext';
import EditPage from './editpage/edit';
import LoginPage from './loginpage/login';
const { API_BASE_URL } = require('./config')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      users: [],
      currentUser: 1,
      error: null,
      currentUsername: 'You are currently in demo mode!'
    }
  }

  componentDidMount() {
    //get entries from database
    fetch(`${API_BASE_URL}/entries`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
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
        this.setState({
          entries: response
        })
      })
      .catch(error => {
        this.setState({ error })
      })
    //get users from database
    fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
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
        this.setState({
          users: response
        })
      })
      .catch(error => {
        this.setState({ error })
      })

    //set the current user to default test user
    fetch(`${API_BASE_URL}/users/1`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
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
        this.updateCurrentUser(response)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  addEntry = newEntry => {
    this.state.entries.push(newEntry)
  }

  deleteEntry = entryId => {
    const newEntries = this.state.entries.filter(entry =>
      entry.id !== entryId
    )
    this.setState({
      entries: newEntries
    })
  }

  updateEntry = updatedEntry => {
    const updatedEntries = this.state.entries.map(entry =>
      (entry.id !== updatedEntry.id) ? entry : updatedEntry)
    this.setState({
      entries: updatedEntries
    })
  }

  updateCurrentUser = currentUser => {
    this.setState({
      currentUser: currentUser.id,
      currentUsername: currentUser.username,
    })
  }

  handleLogout = () => {
    this.setState({
      currentUser: 1,
      currentUsername: 'You are currently in demo mode!',
    })
  }

  addUser = newUser => {
    this.state.users.push(newUser)
  }

  render() {
    const contextValue = {
      entries: this.state.entries,
      users: this.state.users,
      currentUser: this.state.currentUser,
      addEntry: this.addEntry,
      deleteEntry: this.deleteEntry,
      updateEntry: this.updateEntry,
      updateCurrentUser: this.updateCurrentUser,
      addUser: this.addUser,
    }
    return (
      <BrowserRouter>
        <JournalContext.Provider value={contextValue}>
          <div className='App'>
            <header>
              <div className="right">
                <p>Hello, {this.state.currentUsername}</p>
                {this.state.currentUser === 1 &&
                  <Link to='/login'>
                    Login | Signup
                  </Link>
                }
                {this.state.currentUser !== 1 &&
                  <button className="link" type="button" onClick={() => this.handleLogout()}>Logout</button>
                }
              </div>
              <section className="center">
                <h1>mindFULL</h1>
              </section>
              <Nav />
            </header>
            <main>
              <Route
                exact path='/'
                component={HomePage}
              />
              <Route
                path='/about'
                component={AboutPage}
              />
              <Route
                path='/entry'
                component={EntryPage}
              />
              <Route
                path='/journal'
                component={JournalPage}
              />
              <Route
                path='/edit/:entryId'
                component={EditPage}
              />
              <Route
                path='/login'
                component={LoginPage}
              />
            </main>
            <footer>
              <p>
                Created by Kaitlyn Yancey
            </p>
              <p>
                <small>&copy; Copyright 2021. All Rights Reserved</small>
              </p>
            </footer>
          </div>
        </JournalContext.Provider>
      </BrowserRouter>
    )
  }
}


export default App;
