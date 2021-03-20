import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './homepage/home';
import AboutPage from './aboutpage/about';
import EntryPage from './entrypage/entry';
import JournalPage from './journalpage/journal';
import Nav from './nav/nav';
import DATA from './dummy-data';
import JournalContext from './JournalContext';
import EditPage from './editpage/edit';
import LoginPage from './loginpage/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      users: [],
      currentUser: 'ADMIN',
      error: null,
    }
  }

  componentDidMount() {
    this.setState({
      entries: DATA.entries,
      users: DATA.users,
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
      currentUser: currentUser
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
                <p>Hello, {this.state.currentUser}</p>
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
