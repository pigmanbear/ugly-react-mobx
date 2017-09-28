import React from 'react';
import { Jumbotron, Grid, Row, Col, Image } from 'react-bootstrap';
import { App } from '../layouts/app';

export const Index = () => (
  <App>
  <Jumbotron className="text-center">
    <h2>Wealth Source Advisor Portal</h2>
    <p>View and manage billings, households, and accounts.</p>
      <Grid>
    <Row>
    <Col>
        <Image src="/wonly.png" />
    </Col>
    </Row>
  </Grid>
    <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v1.0.0</p>
  </Jumbotron>
  </App>
);
