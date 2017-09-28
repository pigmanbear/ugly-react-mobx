import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export const PublicNavigation = () => (
 <ul className="nav navbar-nav">
    <LinkContainer to="login">
      <NavItem eventKey={ 1 } href="/login">Log In</NavItem>
    </LinkContainer>
</ul>
);
