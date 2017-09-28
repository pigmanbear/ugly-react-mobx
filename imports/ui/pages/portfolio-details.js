import React from 'react';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import AccountsList from '../containers/accounts-list';
import {
  App
} from '../layouts/app';

export const PortfolioDetails = ({ params }) => (
        <App>
          <Grid className="page-header">
             <Row> 
             <h2>This will be the portfolios details page.</h2>
              <AccountsList portfolioId={params.id}/>
            </Row>
          </Grid>
        </App>
);
