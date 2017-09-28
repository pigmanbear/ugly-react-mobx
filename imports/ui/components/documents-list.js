// import React from 'react';
// import {
//   ListGroup,
//   Alert,
//   Table,
//   Col,
//   Panel,
//   Row
// } from 'react-bootstrap';
// import {
//   Document
// } from './document.js';
// import {
//   Session
// } from 'meteor/session';
// import {
//   Pagination
// } from 'rc-pagination';
// import {
//   Tracker
// } from 'meteor/tracker';
// import _ from 'underscore';
// import Toggle from 'material-ui/Toggle';
// import Paper from 'material-ui/Paper';
// import FontIcon from 'material-ui/FontIcon';
// import { lightGreen50,blueGrey50, grey50 } from 'material-ui/styles/colors';
// import Divider from 'material-ui/Divider';



// export class DocumentsList extends React.Component {

//     constructor(props, context) {
//       super(props, context);
//       this.state = {
//         expanded: false,
//       };
//       this.handleToggle = this.handleToggle.bind(this);
//       this.billingTotal = this.billingTotal.bind(this);
//     }
//     handleToggle(event, toggle) {
//       this.setState({
//         expanded: toggle
//       });
//       console.log(this.state.expanded);
//     }
//     billingTotal(portfolio) {
//       return _.reduce(_.pluck(portfolio.latestBillings, 'fee'), (memo, value) => {
//         if (memo === undefined)
//           memo = 0;
//         if (value === undefined)
//           value = 0;
//         return memo + value;
//       });
//     }
//    render() {
//      const  portfolioTotal = portfolio => {
//         return _.reduce(_.pluck(_.pluck(portfolio.accounts, 'Details'), 'TotalEmv'), function (memo, value) {
//           if (memo === undefined)
//             memo = 0;
//           if (value === undefined)
//             value = 0;
//           return memo + value;
//         });
//       };
//     const leftHalf = this.props.documents.slice(0,4);
//     const rightHalf = this.props.documents.slice(4,8); 

//     return (
//       this.props.documents.length > 0 ?
// <div>
//   <Toggle
//             toggled={this.state.expanded}
//             onToggle={this.handleToggle}
//             labelPosition="right"
//             label="Toggle to close or expand all"
//           />
//       <div className="animate-panel" data-effect="zoomIn">
//       <Row>
//      <Col  md={6} lg={6}>
//                 {leftHalf.map((doc, index) => (
  
//             <Document key={ doc._id } document={ doc } index={ index } numAccount= { doc.AccountIds.length } 
//             portfolioTotal= { portfolioTotal(doc)} billingTotal = {this.billingTotal(doc)} toggle={this.state.expanded} />
    
//           ))}
//    </Col>
//         <Col md={6} lg={6}>
//                 {rightHalf.map((doc, index) => (
    
//             <Document key={ doc._id } document={ doc } index={ index } numAccount= { doc.AccountIds.length } 
//             portfolioTotal= { portfolioTotal(doc)} billingTotal = {this.billingTotal(doc)} toggle={this.state.expanded} />
    
//           ))}
//    </Col>
//    </Row>
//       </div>
//       <br />
//       </div>
//       :
//         <Alert bsStyle="warning">No documents yet.</Alert>

//     )
//   }
// }
// DocumentsList.propTypes = {
//   documents: React.PropTypes.array,
// };