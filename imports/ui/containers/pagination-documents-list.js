// import {
//   composeWithTracker
// } from 'react-komposer';
// import {
//   DocCounts
// } from '../../api/portfolios';
// import {
//   PaginationDocumentsList
// } from '../components/pagination-documents-list.js';
// import {
//   Loading
// } from '../components/loading.js';
// import {
//   Meteor
// } from 'meteor/meteor';
// import {
//   Counts
// } from 'meteor/tmeasday:publish-counts';



// const composer = (params, onData) => {
//   console.log(params);
//   const search = params.search;
//   const currentPage = params.currentPage;
//   const subscription = Meteor.subscribe('docCounts', search);
// if (subscription.ready()) {
//     const counts = Counts.get('numberOfDocuments');
//     onData(null, {
//       counts
//     });
//   }
//   const cleanup = () => (console.log('DocCounts Container disposed'));
//   return cleanup;
// };
// export default composeWithTracker(composer, Loading)(PaginationDocumentsList);

