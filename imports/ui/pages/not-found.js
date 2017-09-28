import React from 'react';
import { Alert } from 'react-bootstrap';
import { App } from '../layouts/app';

export const NotFound = () => (
  <App>
  <Alert bsStyle="danger">
    <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
  </Alert>
  </App>
);
