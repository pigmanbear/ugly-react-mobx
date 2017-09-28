// import {
//   composeWithTracker
// } from 'react-komposer';
// import {
//   Ports
// } from '../../../client/portfolios';
// import {
//  LatestBillings
// } from '../../../client/billing';
// import {
//   DocumentsList
// } from '../components/documents-list.js';
// import {
//   Loading
// } from '../components/loading.js';
// import {
//   Meteor
// } from 'meteor/meteor';
// import {
//   Counts
// } from 'meteor/tmeasday:publish-counts';
// import {
//   Accounts
// } from '../../api/accounts/accounts';
// import _ from 'underscore';


// const composer = (params, onData) => {
//   let options = params.options;
//   let search = params.search;
//   options.fields = {
//     'Name': 1,
//     'AccountIds': 1,
//     'accounts.AccountNumber': 1,
//     'accounts.Details.TotalEmv': 1,
//     'accounts.Targets': 1,
//     'accounts.Name': 1
//   };
//   const subscription = Meteor.subscribe('ports', options, search);
//   if (subscription.ready()) {
//     const documents = _.sortBy(Ports.find().fetch(), function (d) {
//       return d.Name;
//     });
//     //Not Ids, but Account Numbers for Billing Retrieval!
//     let accountIds = _.pluck(_.flatten(_.pluck(documents, 'accounts')), 'AccountNumber');
//     const bSubOptions = {
//       fields: {
//         'fee': 1,
//         'accountNumber': 1,
//       }
//     };
//     const bSub = Meteor.subscribe('latestBillings', accountIds, bSubOptions);
//     if (bSub.ready()) {
//       documents.map(doc => {
//         //Now we just need the Accounts with Billing for each Portfolio, and then extend the Object
//         return _.extend(doc, {
//           latestBillings: LatestBillings.find({
//             accountNumber: {
//               $in: _.pluck(_.flatten(doc.accounts), 'AccountNumber')
//             }
//           }).fetch()
//         });
//       });
//       onData(null, {
//         documents
//       });
//     }
//   }
//   const cleanup = () => (console.log('Documents Container disposed'));
//   return cleanup;
// };

// export default composeWithTracker(composer, Loading, {}, {
//   pure: false
// })(DocumentsList);