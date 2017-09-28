import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';
import { App } from '../layouts/app';

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
<App>

    <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className="page-header">Welcome to the WealthSource Portal</h4>
        <p>User your Office 365 credentials to Login</p>
        <form ref="login" className="login" onSubmit={ this.handleSubmit }>
          <FormGroup>
          </FormGroup>
          <Button type="submit" bsStyle="success">Login</Button>
        </form>
      </Col>
    </Row>

 </App> );
  }
}
