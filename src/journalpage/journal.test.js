import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import JournalPage from './journal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
        <JournalPage />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});