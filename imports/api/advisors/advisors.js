import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import {
  Class
} from 'meteor/jagi:astronomy';

export const Advisors = new Mongo.Collection('advisors');
export const AdvisorsNotes = new Mongo.Collection('advisorsnotes');


Advisors.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Advisors.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

AdvisorsNotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

AdvisorsNotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

/*{
    "_id" : "z02274581",
    "firstName" : "DANIEL",
    "lastName" : "ROHR"
}*/

// export const Advisor = Class.create({
//   name: 'Advisor',
//   collection: Advisors,
//   fields: {
  
//   _id: {
//     type: String,
//     lable: 'Black Diamond Id',
//   },

//   firstName: {
//     type: String,
//     label: "First Name",
//   },
//   lastName: {
//     type: String,
//     label: 'Advisor Last Name',
//   },
//   portfolios: {
//     type: Array,
//     label: "Advisor Portfolios",
//     optional: true,
//   },
//   'portfolios.$': {
//     type: Object,
//     label: 'Portfolio Id and Account Ids',

//   },
//   'portfolios.$._id': {
//     type: String,
//     lable: 'Portfolio Id'

//   },
//   'portfolios.$.accountIds': {
//     type: [String],
//     lable: 'Portfolio Account Ids'

//   },
//   objectId: {
//     type: String,
//     labe1: 'Office 365 Unique Identifier',
//   },
//   platformFee: {
//     type: Number,
//     label: 'Fee for Wealthsource Partners Services'
//   },
//   managmentFee: {
//     type: Number,
//     label: 'Fee for Asset Management Services',
//   },
//   payout: {
//     type: Number,
//     label: 'Payout for Advisor Fees',
//   },
//   fees: {
//     type: Array,
//     label: 'Advisor Fees'
//   },
//   'fees.$': {
//     type: Object,
//     label: 'Fee Description and Amount',
//   },
//   'fees.$.description' : {
//     type: String,
//     label: 'Description of Advisor Fee',
//   }, 
//   'fees.$.amount' : {
//     type: Number,
//     label: 'Fee Amount'
//   },
//   created: {
//     type: Object,
//     autoValue: function () {
//       if (this.isInsert) {
//         return {
//           at: new Date(),
//           by: this.userId,
//         };
//       } else if (this.isUpsert) {
//         return {
//           $setOnInsert: {
//             at: new Date(),
//             by: this.userId,
//           }
//         };
//       } else {
//         this.unset(); // Prevent user from supplying their own value
//       }
//     }
//   },
//   'created.at': {
//     type: Date,
//     optional: true,
//   },
//   'created.by': {
//     type: String,
//     optional: true,
//   },
//   updatesHistory: {
//     type: Array,
//     optional: true,
//     autoValue: function () {
//       var fee = this.field("fee");
//       if (fee.isSet) {
//         if (this.isInsert) {
//           return [{
//             at: new Date(),
//             by: this.userId,
//             minimum: this.field('minimum').value,
//             platformFee: this.field('platformFee').value,
//             managmentFee: this.field('managmentFee').value,
//           }];
//         } else {
//           return {
//             $push: {
//               at: new Date(),
//               by: this.userId,

//             minimum: this.field('minimum').value,
//             platformFee: this.field('platformFee').value,
//             managmentFee: this.field('managmentFee').value,
//             }
//           };
//         }
//       }
//     }
//   },
//   'updatesHistory.$': {
//     type: Object,
//     optional: true,
//     blackbox: true,
//   },
// }}
// );
