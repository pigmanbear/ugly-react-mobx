// import {
//   Meteor
// } from 'meteor/meteor';
// import {
//   observable,
//   useStrict,
//   action,
//   toJS
// } from 'mobx';
// import autorun, {
//   observe
// } from 'meteor/space:tracker-mobx-autorun';
// import {
//   PortfoliosBilling
// } from '../api/portfolios/client/portfolios';
// import state from '../stores/mobxstores';
// import {
//   portfoliosBillingSetLoading,
//   portfoliosBillingAccounts
// } from '../actions/portfolios';
// import R from 'ramda';

// // Optionally MobX strict mode makes state in the store immutable, in that case
// // state can ony be changed by MobX actions, and we only want state to be changed by
// //Mobx actions for fine grained control of application state
// useStrict(true);


// const portfoliosBillingsAutorun = autorun(() => {
//   console.log('PortfoliosBillingsAutorunCommencing');
//   const portfolios = state.portfoliosBilling;
//   const options = state.portfoliosBillingOptions;
//   const handle = Meteor.subscribe('portfoliosbilling', options);
//   const cursor = PortfoliosBilling.find();
//   observe('portfoliosBillings', state.portfoliosBilling, handle, cursor);
//   const subLoading = handle.ready();
//   const loading = portfoliosBillingSetLoading(subLoading);
//   const getAccountNumbers = action(() => {
//       portfoliosBillingAccounts(state.portfoliosBilling);
//       state.portfoliosAccountBillingSearchMatches.replace(state.portfoliosBilling);
//       state.portfoliosBillingCounts = state.portfoliosBilling.length;  
//   });
//   getAccountNumbers();
// }).start();


// // Starting autorun on startup or when needed



// // Stopping autorun
// //TODO: Do I need to stop the autorun?
// //portfoliosAutorun().stop();
