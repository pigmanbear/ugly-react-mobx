// import {
//     composeWithTracker
// } from 'react-komposer';
// import {
//     Documents
// } from '../../api/documents/documents';
// import { Accounts } from '../../api/accounts/accounts';
// import {
//     AccountsList
// } from '../components/accounts-list';
// import {
//     Loading
// } from '../components/loading';
// import {
//     Meteor
// } from 'meteor/meteor';


// const composer = (params, onData) => {
//     const pSub = Meteor.subscribe('document', params.portfolioId);
//     console.log(params.portfolioId);
//     let handle = pSub.ready();
//     if (handle) {
//         const portfolio = Documents.findOne(params.portfolioId);
//         let accounts = Accounts.find({_id: { $in: portfolio.portfolio.AccountIds}}).fetch();
//         if (accounts) {
//             onData(null, {
//                 accounts
//             });
//         }
//         else {
//             accounts = [];
//             onData(null,{
//                 accounts
//             });
//         }
//         const cleanup = () => (console.log('Accounts Container disposed'));
//         return cleanup;
//     }
// };


// export default composeWithTracker(composer, Loading)(AccountsList);