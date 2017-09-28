import {
  processApiBatchData
} from '../../../server/batch/methods';
import {
  loadAccounts
} from '../../api/accounts/server/methods';
import {
  loadPortfolios
} from '../../api/portfolios/server/methods';
import {
  loadHouseholds
} from '../../api/households/server/methods';
import {
  ApiCall
} from '../../../server/apicall/apicall';
import {
  Services
} from '../../../server/services/services';
import {
  ValidatedMethod
} from 'meteor/mdg:validated-method';
import moment from 'moment';

import {
  Accounts
} from 'meteor/accounts-base';
import {
  Advisors
} from '../../api/advisors/advisors';
import {
  Roles
} from 'meteor/alanning:roles';

let services = Services.findOne('blackdiamond');
let call = ApiCall.findOne('blackDiamondBatch');

let hCall;
let pCall;
let aCall;

if (call) {
  hCall = call.householdCall;
  pCall = call.portfolioCall;
  aCall = call.accountCall;
}

if (!hCall || !call) hCall = 1;
if (!pCall || !call) pCall = 1;
if (!aCall || !call) aCall = 1;
if (!call) {
  call = {};
  call._id = 'blackDiamondBatch';
}

console.log(moment(hCall).toDate(), moment(pCall).toDate(), moment(aCall).toDate());


export const getAllRealTimeBlackDiamondData = new ValidatedMethod({
  name: 'getAllRealTimeBlackDiamondData',
  validate: null,
  run() {
    Meteor.setTimeout(() => {
      loadHouseholds(hCall, (error, result) => {
        if (error) {
          console.log('Error return from retrieving Households.');
          console.log(error);
        } else {
          ApiCall.update({
            _id: call._id
          }, {
            $set: {
              householdCall: moment().valueOf()
            }
          });
        }
      });
      Meteor.setTimeout(() => {
        loadPortfolios(pCall, (error, result) => {
          if (error) {
            console.log('Error return from retrieving Households.');
            console.log(error);
          } else {
            ApiCall.update({
              _id: call._id
            }, {
              $set: {
                portfolioCall: moment().valueOf()
              }
            });
          }
        });
        Meteor.setTimeout(() => {
          loadAccounts(aCall, (error, result) => {
            if (error) {
              console.log('Error return from retrieving Households.');
              console.log(error);
            } else {
              ApiCall.update({
                _id: call._id
              }, {
                $set: {
                  accountCall: moment().valueOf()
                }
              });
            }
          });
        }, 3000);
      }, 2000);
    }, 1000);
  }
});

export const getBatchBlackDiamondData = new ValidatedMethod({
  name: 'getBatchBlackDiamondData',

  validate: null,
  run() {
    Meteor.setTimeout(() => {
      processApiBatchData();
    }, 10000);
  },
});

Accounts.onCreateUser((options, user) => {
  if (user.services.azureAd){
    user._id = user.services.azureAd.id;

  }
  if (options.profile) {
    user.profile = options.profile;
  
}
  //Copy the .emails option as well.
  if (options.emails)
    user.emails = options.emails;

  Roles.addUsersToRoles(user, 'advisor');

  return user;

});
