import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem} from 'react-bootstrap';



export const AdminNavigation = () => (
<Nav>
      <LinkContainer to="/upload">
        <NavItem eventKey={ 10 } href="/upload">Upload</NavItem>
      </LinkContainer>
</Nav>
);
                  