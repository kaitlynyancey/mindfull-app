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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      users: [],
      currentUser: 'admin',
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
    console.log('delete')
    const newEntries = this.state.entries.filter(entry => 
      entry.id !== entryId
    )
    this.setState({
      entries: newEntries
    })
  }

  updateEntry = entryId => {
    console.log('update')
  }

  render() {
    const contextValue = {
      entries: this.state.entries,
      users: this.state.users,
      currentUser: this.state.currentUser,
      addEntry: this.addEntry,
      deleteEntry: this.deleteEntry,
      updateEntry: this.updateEntry,
    }
    return (
      <BrowserRouter>
        <JournalContext.Provider value={contextValue}>
          <div className='App'>
            <header>
              <section>
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
