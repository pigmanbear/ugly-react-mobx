// import React from 'react';
// import {
//   Row,
//   Col,
//   Grid
// } from 'react-bootstrap';

// import {
//   AddDocument
// } from '../components/add-document.js';
// import {
//   App
// } from '../layouts/app';
// import {
//   lightGreen50,
//   blueGrey50,
//   grey50,
//   grey900,
//   redA100
// } from 'material-ui/styles/colors';
// import TotalsPaperComponent from '../containers/advisor-totals';
// import TextField from 'material-ui/TextField';
// import Paper from 'material-ui/Paper';
// import FontIcon from 'material-ui/FontIcon';
// import IconButton from 'material-ui/IconButton';
// import  { PaginationDocumentsList } from '../components/pagination-documents-list.js';
// import {
//     Session
// } from 'meteor/session';

// import {
//     browserHistory
// } from 'react-router';


// export class Documents extends React.Component {
//     constructor(props, context) {
//       super(props, context);
//       this.searchstart = (Session.get('search') ? Session.get('search') : '');
//       this.state = {
//         search: this.searchstart,
//         currentPage: this.props.params.page ? parseInt(this.props.params.page, 10) : 1
//       };

//       this.clearSearch = this.clearSearch.bind(this);
//       this.search = this.search.bind(this);
// }  

//     search(evt) {
//       evt.persist();
//       const searchTerm = evt.target.value.toLowerCase();
//       Session.set('search', searchTerm);
//       console.log(this.state);
//       _.debounce(this.setState({
//         search: evt.target.value.toLowerCase(),
//         currentPage: 1,
//       }), 100);
//       Session.set('page', 1);
//     }
//     clearSearch() {
//       this.setState({
//         search: ''
//       });
//       Session.set({
//         search: ''
//       });
//     }

//     render() {
//         const iconStyles = {
//           marginRight: 24,
//           fontSize: 36,
//         }; 
//         const style = {
//           // height: 200,
//           width: '100%',
//           margin: 10,
//           display: 'inline-block',
//           padding: 30,
//           backgroundColor: blueGrey50,
//         };
//         const iconButtonStyles = {
//           marginLeft: 24,
//           fontSize: 12,
//         };

//         return (
//         <App>
//             <Paper style={style} zDepth={4}>
//                    <Row>
//                    <Col lg={6} md={6}>
//                     <Row>
//                     <Col xs={12} className="page-header">
//                         <FontIcon className="fa fa-list-ul" color={grey900} style={iconStyles}> Households</FontIcon>

//                   <div>
//                         <TextField
//                             hintText={'Search for Portfolio or Account . . .' }
//                             value={this.state.search}
//                             onChange={this.search} />
//                           <IconButton
//                         onTouchTap={this.clearSearch}
//                         iconStyle={iconButtonStyles}
//                         iconClassName="fa fa-trash-o"
//                         tooltip="Clear Search Item"
//                         tooltipPosition="top-right"
//                         disabled={(this.state.search && this.state.search !== '')  ? false : true}
//                         />
//                     </div>  
                        
//                     </Col>
//                     <Col xs={12}>
//                       (Text Component Goes Here)
//                     </Col>
//                     </Row>
//                 </Col>
//                 <Col lg={6} md={6}>
//                 <TotalsPaperComponent />
//                 </Col>
//                 </Row>
//           </Paper>
//         </App>
//         );
//       }
//     }