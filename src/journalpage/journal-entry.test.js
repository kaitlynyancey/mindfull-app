import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import JournalEntry from './journal-entry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <JournalEntry />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});