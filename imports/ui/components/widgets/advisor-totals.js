import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {
  propTypes,
  observer
} from 'mobx-react';
import {
  action,
  toJS
} from 'mobx';
import state from '../../../stores/mobxstores';
import {
  lightGreen500,
  grey900,
  blueGrey100,
  purple50,
  lightGreen700,
  blueGrey50,
  fullWhite,
  purple500,
  lightBlue700,
  amber600
} from 'material-ui/styles/colors';
import {
  Row,
  Col
} from 'react-bootstrap';
import numeral from 'numeral';
import R from 'ramda';
import {
  isNumber,
  isObject,
  pluckKeyValues,
  filterValues,
  notUndefined,
} from '../../../modules/ramda-utils';
import {
  portfoliosTotal,
  billingsTotal
} from '../../../modules/calculations';
import {
  portfoliosBillingAccounts,
  portfoliosAccounts
} from '../../../actions/portfolios';


const style = {
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: fullWhite,
  fontFamily: 'Source Sans Pro, sans-serif',
};
const innerPaperstyle = {
  margin: 20,
  padding: 5,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: fullWhite,
};
const iconStyles = {
  margin: 24,
  fontSize: 36
};

const curry = R.curry;
const pluck = R.pluck;
const flatten = R.flatten;
const unique = R.uniq;
const uniqueWith = R.uniqWith;



//TODO: Refactor Blocks into Separate Component

const getKo = portfolios =>  unique(pluck('AccountNumber')(flatten((pluck('accounts')(toJS(portfolios)))))).length;

const getTotalBillings = action(portfolios => {

  console.log(pluck('accounts')(toJS(portfolios)));
  let g =  unique(flatten(filterValues(notUndefined, pluck('latestBillings')(flatten((pluck('accounts')(toJS(portfolios))))))));
  console.log(g);
  console.log(billingsTotal(g));
  return billingsTotal(g);
});

const TotalsPaperComponent = observer(['state'],({ state }) => {
return (
  <div>
    <Paper style={style} zDepth={2}> 
    <Row className="row-table row-flush">
        <Col xs={6} className="bb br">
                  <Row className="row-table row-flush">
                     <Col xs={4}  className="text-center text-info totals-padding">
                     <FontIcon className="fa fa-users" color={lightGreen700} style={iconStyles}></FontIcon>
                     </Col>
                     <Col xs={8}>
                     <div className="panel-body text-center">
                     <h4 className="mt0">{state.portfolios.length}</h4>
                     <p className="mb0 text-muted">Households</p>
                     </div>
                     </Col>
                  </Row>
        </Col>
        <Col xs={6} className="bb br">
                  <Row className="row-table row-flush">
                     <Col xs={4}  className="text-center text-info totals-padding">
                     <FontIcon className="fa fa-user" color={purple500} style={iconStyles}></FontIcon>
                     </Col>
                     <Col xs={8}>
                     <div className="panel-body text-center">
                     <h4 className="mt0">{getKo(state.portfolios)}</h4>
                     <p className="mb0 text-muted">Accounts</p>
                     </div>
                     </Col>
                  </Row>
        </Col>
            </Row>
            <div className="row-flush">

        <Col md={6} lg={6} xs={12} className="bb br">
                  <Row className="row-table row-flush">
                     <Col xs={4}  className="text-center text-info totals-padding">
                     <FontIcon className="fa fa-usd" color={lightBlue700} style={iconStyles}></FontIcon>
                     </Col>
                     <Col xs={8}>
                     <div className="panel-body text-center">
                     <h4 className="mt0"> {numeral(portfoliosTotal(toJS(state.portfolios))).format('$0,0.00')}</h4>
                     <p className="mb0 text-muted">Total Assets</p>
                     </div>
                     </Col>
                  </Row>
        </Col>
        <Col md={6} lg={6}  xs={12} className="bb br">
                  <Row className="row-table row-flush">
                     <Col xs={4}  className="text-center text-info totals-padding">
                     <FontIcon className="fa fa-money" color={amber600} style={iconStyles}></FontIcon>
                     </Col>
                     <Col xs={8}>
                     <div className="panel-body text-center">
                     <h4 className="mt0">{numeral(getTotalBillings(state.portfolios)).format('$0,0.00')}</h4>
                     <p className="mb0 text-muted">Total Billings</p>
                     </div>
                     </Col>
                  </Row>
        </Col>
    </div>
    </Paper>
  </div>
)});
export default TotalsPaperComponent;


                // totalBillings: advisorTotalBillings,
                // totalAccounts: accountIds.length,
                // totalPortfolios: documents.length,
                // totalValue:advisorTotalValue,