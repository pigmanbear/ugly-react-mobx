// import {
//     composeWithTracker
// } from 'react-komposer';
// import {
//     Portfolios
// } from '../../api/portfolios/portfolios';
// import {
//     TotalsPaperComponent
// } from '../components/advisor-totals';
// import {
//     Loading
// } from '../components/loading.js';
// import {
//     Meteor
// } from 'meteor/meteor';
// import _ from 'underscore';
// import {
//     Billings
// } from '../../api/billings/billings';
// import { PortfolioTotals } from '../../../client/portfolios';



// const composer = (params, onData) => {
//     const options = {
//         fields: {
//             'accounts.AccountNumber': 1,
//             'accounts.Details.TotalEmv': 1,
//         }
//     };
//     const subscription = Meteor.subscribe('portfolioTotals', options);
//     if (subscription.ready()) {
//         const accounts = PortfolioTotals.find({}, options).fetch();
//         //Debug
//         //console.log(accounts);

//         //Not Ids, but Account Numbers for Billing Retrieval!
//         const accountIds = _.pluck(_.flatten(_.pluck(accounts, 'accounts')), 'AccountNumber');
//         //Debug
//         //console.log(accountIds);
//         const advisorTotalValue = _.reduce(_.pluck(_.pluck(_.flatten(_.pluck(accounts, 'accounts')), 'Details'), 'TotalEmv'), (memo, value) => {
//             if (memo === undefined)
//                 memo = 0;
//             if (value === undefined)
//                 value = 0;
//             return memo + value;
//         });
//         const bSubOptions = {
//             fields: {
//                 'fee': 1
//             }
//         };
//         const bSub = Meteor.subscribe('latestBillingsTotal', accountIds, bSubOptions);
//         if (bSub.ready()) {
//             const latestBillings = Billings.find({
//             }, {
//                 fields: {
//                     'fee': 1
//                 }
//             }).fetch();
//             const advisorTotalBillings = _.reduce(_.pluck(latestBillings, 'fee'), (memo, value) => {
//                 if (memo === undefined)
//                     memo = 0;
//                 if (value === undefined)
//                     value = 0;
//                 return memo + value;
//             });
//             //console.log(latestBillings);

//             let totals = {
//                 totalBillings: advisorTotalBillings,
//                 totalAccounts: accountIds.length,
//                 totalPortfolios: accounts.length,
//                 totalValue: advisorTotalValue,
//             };
//             onData(null, {
//                 totals
//             });
//         }
//     }
//     const cleanup = () => (console.log('Advisor Totals Container disposed'));
//     return cleanup;
// };


// export default composeWithTracker(composer, Loading)(TotalsPaperComponent);