import React from 'react';
import { ListGroup, Alert, Table, Col, Panel, Row } from 'react-bootstrap';
import { Account } from './accounts.js';




export const AccountsList = ({ accounts }) => (
  accounts.length > 0 ?
<div className="animate-panel" data-effect="zoomIn">
<Row>
          {accounts.map((doc) => (
      <Account key={ doc._id } account={ doc } index={ accounts.indexOf(doc) } />
    ))}
</Row>
</div>
:
  <Alert bsStyle="warning">No documents yet.</Alert>
);

AccountsList.propTypes = {
  accounts: React.PropTypes.array
};