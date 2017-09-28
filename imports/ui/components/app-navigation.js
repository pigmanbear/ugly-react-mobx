import { PublicNavigation } from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';
import React from 'react';
import pubsub from 'pubsub-js';
import { header } from '../../modules/header';
import { Nav, NavDropdown, MenuItem, NavItem, Navbar, Header, Collapse, Toggle} from 'react-bootstrap';
import { Router, Route, Link, History } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { AdminNavigation } from './admin-navigation';


export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

componentDidMount() {

        header();
    }

  renderAdminNavigation(isAdmin) {
      return isAdmin ? <AdminNavigation /> : <div></div>; 
  }

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <Navbar role="navigation" className="navbar topnavbar">
                    { /* START navbar header */ }
                    <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <div className="brand-logo">
                                <img src="/img/logo.png" alt="App Logo" className="img-responsive" />
                            </div>
                        </a>
                 
                    </Navbar.Brand>
                           <Navbar.Toggle />
                    </Navbar.Header>
                    { /* END navbar header */ }
      { this.renderAdminNavigation(this.props.isAdmin)}
      { this.renderNavigation(this.props.hasUser) }
                </Navbar>
                { /* END Top Navbar */ }
            </header>
            );
    }

}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
  isAdmin: React.PropTypes.bool
};
