// import React from 'react';
// import Paper from 'material-ui/Paper';
// import FontIcon from 'material-ui/FontIcon';
// import {
// lightGreen500, grey900, blueGrey100, purple50, lightGreen700, blueGrey50, fullWhite, purple500, lightBlue700, amber600
// } from 'material-ui/styles/colors';
// import { Row, Col} from 'react-bootstrap';
// import numeral from 'numeral';

// const style = {
//     textAlign: 'center',
//     display: 'inline-block',
//     backgroundColor: fullWhite,
//     fontFamily: 'Source Sans Pro, sans-serif',
// };
// const innerPaperstyle = {
//     margin: 20,
//     padding: 5,
//     textAlign: 'center',
//     display: 'inline-block',
//     backgroundColor: fullWhite,
// };
// const iconStyles = {
//     margin: 24,
//     fontSize: 36
// };
// const portfolioTotal = portfolio => {
//   let details = filterValues(notUndefined, pluckKeyValues('Details', portfolio.accounts));
//   if (isObject(details)) {
//     return R.sum(filterValues(isNumber, pluckKeyValues('TotalEmv', details)));
//   } else {
//     return 0;
//   }

// };
// const billingTotal = billings => {
//   let fee = pluckKeyValues('fee', billings);
//   if (isObject(fee)) {
//     return R.sum(filterValues(isNumber, fee));
//   } else {
//     return 0;
//   }

// };

// //TODO: Refactor Blocks into Separate Component, Add MOBx State

// export const TotalsPaperComponent = () => (
//   <div>
//     <Paper style={settings ? settings.style : style} zDepth={settings ? setting.zDepth : 2}>
    
//     <Row className="row-table row-flush">
//         <Col xs={6} className="bb br">
//                   <Row className="row-table row-flush">
//                      <Col xs={4}  className="text-center text-info totals-padding">
//                      <FontIcon className="fa fa-users" color={lightGreen700} style={iconStyles}></FontIcon>
//                      </Col>
//                      <Col xs={8}>
//                      <div className="panel-body text-center">
//                      <h4 className="mt0">{totals.totalPortfolios}</h4>
//                      <p className="mb0 text-muted">Households</p>
//                      </div>
//                      </Col>
//                   </Row>
//         </Col>
//         <Col xs={6} className="bb br">
//                   <Row className="row-table row-flush">
//                      <Col xs={4}  className="text-center text-info totals-padding">
//                      <FontIcon className="fa fa-user" color={purple500} style={iconStyles}></FontIcon>
//                      </Col>
//                      <Col xs={8}>
//                      <div className="panel-body text-center">
//                      <h4 className="mt0">{totals.totalAccounts}</h4>
//                      <p className="mb0 text-muted">Accounts</p>
//                      </div>
//                      </Col>
//                   </Row>
//         </Col>
//             </Row>
//             <div className="row-flush">

//         <Col md={6} lg={6} xs={12} className="bb br">
//                   <Row className="row-table row-flush">
//                      <Col xs={4}  className="text-center text-info totals-padding">
//                      <FontIcon className="fa fa-usd" color={lightBlue700} style={iconStyles}></FontIcon>
//                      </Col>
//                      <Col xs={8}>
//                      <div className="panel-body text-center">
//                      <h4 className="mt0"> {numeral(totals.totalValue).format('$0,0.00')}</h4>
//                      <p className="mb0 text-muted">Total Assets</p>
//                      </div>
//                      </Col>
//                   </Row>
//         </Col>
//         <Col md={6} lg={6}  xs={12} className="bb br">
//                   <Row className="row-table row-flush">
//                      <Col xs={4}  className="text-center text-info totals-padding">
//                      <FontIcon className="fa fa-money" color={amber600} style={iconStyles}></FontIcon>
//                      </Col>
//                      <Col xs={8}>
//                      <div className="panel-body text-center">
//                      <h4 className="mt0">{numeral(totals.totalBillings).format('$0,0.00')}</h4>
//                      <p className="mb0 text-muted">Total Billings</p>
//                      </div>
//                      </Col>
//                   </Row>
//         </Col>
//     </div>
//     </Paper>
//   </div>
// );

// TotalsPaperComponent.propTypes = {
//   settings: React.PropTypes.any,
//   totals: React.PropTypes.any.isRequired

// };

//                 // totalBillings: advisorTotalBillings,
//                 // totalAccounts: accountIds.length,
//                 // totalPortfolios: documents.length,
//                 // totalValue:advisorTotalValue,