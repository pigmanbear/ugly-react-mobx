import React from 'react';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import {
  App
} from '../layouts/app';
import {
  lightGreen50,
  blueGrey50,
  grey50,
  grey900,
  redA100
} from 'material-ui/styles/colors';
import TotalsPaperComponent from '../components/widgets/advisor-totals';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import PortfoliosList from '../containers/portfolios/portfoliosList'; 
import { Provider } from 'mobx-react';
import state from '../../stores/mobxstores';
import FuzzySearchTextField from '../components/widgets/fuzzysearch';
import {PageHeader} from 'rebass';
import {Flex, Box} from 'reflexbox'



export class Portfolios extends React.Component {
render() {
        const iconStyles = {
          marginRight: 24,
          fontSize: 36,
        }; 
        const style = {
          // height: 200,
          width: '100%',
          margin: 10,
          display: 'inline-block',
          padding: 30,
          backgroundColor: blueGrey50,
        };
        const iconButtonStyles = {
          marginLeft: 24,
          fontSize: 12,
        };
        const indexes = ['Name'];
        const subIndexes = ['accounts','Name', 'AccountNumber'];

    return (
      <App>
        <Paper style={style} zDepth={3}>
          <PageHeader
                description="Details for Accounts Organized by Household"
                heading="Households"
                style={{margin:'15px'  , marginTop: '5px', }}
              />
          <Row>
            <Col lg={12} md={12}>
                <Col lg={6} md={6} className='text-center'>
                  <Box col={12} p={3} m={3} align="center" justify="center">
                    <FuzzySearchTextField  style={{paddingTop: '25px'}}hintText={'Search for Portfolio or Account . . .' }   />
                </Box>
                </Col>
                <Col lg={6} md={6}>
                   <TotalsPaperComponent />
                </Col>
            </Col>
          </Row>
          <PortfoliosList/>
        </Paper>
      </App>
        
    );
  }
}