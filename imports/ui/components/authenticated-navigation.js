import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem, Navbar, Collapse } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));
  return user ? `${name}` : '';
};
        const ddAlertTitle = (
            <span>
                <em className="icon-bell"></em>
                <span className="label label-danger">11</span>
            </span>
        )

export const AuthenticatedNavigation = () => (
                  <Navbar.Collapse>
     
<Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/portfolios">
        <NavItem eventKey={ 2 } href="/portfolios">Portfolios</NavItem>
      </LinkContainer>
            <LinkContainer to="/billings-latest">
        <NavItem eventKey={ 3 } href="/billings-latest">Latest Billings</NavItem>
      </LinkContainer>
      <LinkContainer to="/Support">
        <NavItem eventKey={ 5 } href="/support">Support</NavItem>
      </LinkContainer>
      <NavDropdown pullRight  eventKey={ 6 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 6.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
</Nav>
 <Nav pullRight>
</Nav>
</Navbar.Collapse>
);
                  