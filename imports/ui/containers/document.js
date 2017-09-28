// import {
//   composeWithTracker
// } from 'react-komposer';
// import {
//   Document
// } from '../components/document.js';
// import {
//   Loading
// } from '../components/loading.js';
// import {
//   Meteor
// } from 'meteor/meteor';
// import _ from 'underscore';
// import { PortfolioTotals } from '../../api/accounts/accounts';
// import { Accounts as PortfolioAccounts } from '../../api/accounts/accounts';


// const composer = (params, onData) => {
//   console.log(params);
//   const document = params.document;
//   const index = params.index;
//   const numAccounts = params.numAccounts;
//   const subscription = Meteor.subscribe('portfolioTotal', document._id, document.portfolio.AccountIds);
//   if (subscription.ready()) {
//     const portfolioTotalEmv = PortfolioTotals.find().fetch();
//     const test = PortfolioAccounts.find().fetch();
//     console.log(test);
//     console.log(portfolioTotalEmv);
//     console.log(subscription);
//     onData(null, {
//       document,
//       index,
//       numAccounts,
//       portfolioTotalEmv,
//     });
//   }
//   const cleanup = () => (console.log('Document Container disposed'));
//   return cleanup;
// };

// export default composeWithTracker(composer, Loading, {}, {pure: false})(Document);