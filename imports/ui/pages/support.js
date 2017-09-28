import React from 'react';
import {
  Row,
  Col,
  Grid,
  Clearfix
} from 'react-bootstrap';
import FreshDesk from '../components/freshdesk.js';
import {
  App
} from '../layouts/app';




export const Support = () => (

<App>
    <Grid className="text-center">
        <Row>
         <Clearfix visibleSmBlock></Clearfix>
            <Col mdOffset={2} smOffset={2} lgOffset={2}>
                <FreshDesk />
            </Col>
        </Row>
    </Grid>
</App>



)