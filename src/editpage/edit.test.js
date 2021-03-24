import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from './edit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <EditPage />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});