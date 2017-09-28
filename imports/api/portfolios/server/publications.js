import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  Portfolios
} from '../portfolios';
import {
  Accounts
} from '../../accounts/accounts';
import {
  check,
  Match
} from 'meteor/check';
import {
  Counts
} from 'meteor/tmeasday:publish-counts';
import {
  Roles
} from 'meteor/alanning:roles';
import {
  publishComposite
} from 'meteor/reywood:publish-composite';
import {
  getPortfolioAccountNumbers
} from '../../../modules/calculations';
import {
  Billings
} from '../../billings/billings';


const user = this.userId;


function buildQuery(portfolioId, search) {
  const isAvailable = {
    $and: [{
      advisorId: this.userId
    }, {
      advisorId: {
        $exists: true,
      },
      AccountIds: {
        $exists: true
      },
      accounts: {
        $not: {
          $size: 0
        }
      }
    }]
  };
  const searchRegEx = {
    '$regex': '.*' + (search || '') + '.*',
    '$options': 'i'
  };

  if (portfolioId) {
    return {
      $and: [{
        _id: portfolioId
      }, isAvailable]
    };
  }

  return {
    $and: [{
      Name: searchRegEx,
      $or: [{
        'accounts': {
          $elemMatch: {
            Name: searchRegEx
          }
        },
      }],
    }, isAvailable]
  };
}


Meteor.publish('portfolios', function (options, search) {
    var self = this;
    const selector = buildQuery.call(this, null, search);
    //Counts.publish(this, 'numberOfportfolios', Portfolios.find(selector));
    if (options === undefined || options === null) {
        options = {
            sort: {
                "Name": 1
            },
            limit: 0,
            skip: 0,
        };
    }

    return Portfolios.find(selector, options);
   // return self.ready(); 
});


Meteor.publish('portfoliosbilling', function (options, search) {
  var self = this;
  const selector = buildQuery.call(this, null, search);
  if (options === undefined || options === null) {
    options = {
      sort: {
        "Name": 1
      },
      limit: 0,
      skip: 0,
    };
  }
  Mongo.Collection._publishCursor(Portfolios.find(selector, options), self, 'portfoliosbilling');
  return self.ready();
});

// Meteor.publishComposite('portfolios', function (options, search) {
//   var self = this;
//   const selector = buildQuery.call(this, null, search);
//   //Counts.publish(this, 'numberOfportfolios', Portfolios.find(selector));
//   if (options === undefined || options === null) {
//     options = {
//       sort: {
//         "Name": 1
//       },
//       limit: 0,
//       skip: 0,
//     };
//   }

//   return {
//     find: function () {
//       return Portfolios.find(selector, options);
//     },
//     children: [{
//       find: function (port) {
//         const pAccountNumbers = getPortfolioAccountNumbers(port.accounts);
//         console.log(pAccountNumbers);
//         return Billings.find({
//           accountNumber: {
//             $in: pAccountNumbers
//           }
//         }, {
//           sort: {
//             asOfDate: 1
//           },
//           limit: pAccountNumbers.length
//         });
//       }
//     }]
//   };
// });

// Meteor.publishComposite('documents', function (options) {
//   return {
//     find: function () {
//       if (options === undefined || options === null) {
//         options = {
//           sort: {
//             "portfolio.Name": 1
//           },
//           limit: 0,
//           skip: 0,
//         };
//       }
//       //console.log(Documents.find(buildQuery.call(this), options));
//       return Documents.find(buildQuery.call(this), {
//         limit: options.limit,
//         skip: options.skip,
//         sort: options.sort
//       });
//     },
//     children: [{
//       find: function (port) {
//         const accountIds = R.pluck(account)
//         return Accounts.find({
//           _id: {
//             $in: ids
//           }
//         });
//       }
//     }]
//   };
// });
// Meteor.publishComposite('document', function (portfolioId) {
//     console.log("In document", portfolioId);

//     return {
//         find: function () {
//             if (portfolioId === undefined || portfolioId === null) {
//                 portfolioId = '';
//             }
//             //console.log(Documents.find(buildQuery.call(this, portfolioId)));
//             return Documents.find(buildQuery.call(this, portfolioId));
//         },
//         children: [{
//             find: function (port) {
//                 return Accounts.find({
//                     _id: {
//                         $in: port.portfolio.AccountIds
//                     }
//                 });
//             }
//         }]
//     };
// });
