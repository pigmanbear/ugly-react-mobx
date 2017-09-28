'use strict'
import {
    Meteor
} from 'meteor/meteor';
import {
    ClientAccounts
} from '../accounts.js';
import {
    getApiData
} from '../../../../server/apicall/methods';
import {
    Portfolios
} from '../../portfolios/portfolios';
import moment from 'moment';
import _ from 'underscore';

//TODO: 
//1. Refactor for use with Astronomy for Schema Validaation and asbtract common tasks
//2. Implement Collection CRUD tasks in Validated Methods for Data Integrity
//3. Check for AsOfDate/Reconcilation Date to avoid duplicate insertion of Accounts 

///Account From Real Time API
///TODO:
//1. Allow Real Time Updates from Client
export const loadAccounts = (when, callback = undefined) => {

    // let time = ((moment().year() * 1000) + (moment().month() * 100) + moment().date());
    // let lastTime = ((moment(when).year() * 1000) + (moment(when).month() * 100) + moment(when).date());
    // let err;
    // let res;

    // if (time > lastTime) {
    //     getApiData('account', (error, result) => {
    //         if (error) {
    //             console.log('Failed to get accounts due to ' + error);
    //             err = error;
    //             callback(err, res);
    //         } else {
    //             console.log('success with accounts');
    //             saveAccounts(result.content, false, (num) => {
    //                 console.log('Total accounts updated in db: ' + num);
    //                 console.log('Total accounts in API call: ' + result.content.length);
    //                 res = moment().valueOf();
    //                 callback(err, res);
    //             });
    //         }
    //     });
    // } else {
    console.log('We do not need to retrieve accounts from Real-Time API.');
    // }
};
///Save Accounts from Real Time or Batch API
export const saveAccounts = (accounts, batch, callback = undefined) => {
    let count = 0;
    if (batch) {
        let account = {};
        let apiDetails = {};
        const allPortfolios = Portfolios.find().fetch();
        console.log('Accounts:', accounts.length);
        for (let i = 0; i < accounts.length; i++) {
            let data = accounts[i];

            //SHould only store the URL information, the AccountId for the URL are available in the API
            // if (!batch) {
            //     for (let key in data) {
            //         if (key !== 'id') {
            //             apiDetails[key] = data[key];
            //         }
            //     }
            //     Accounts.upsert({
            //             _id: data.Id
            //         }, {
            //             $set: {
            //                 apiDetails
            //             }
            //         },
            //         (error, id) => {
            //             if (error) {
            //                 console.log(error);
            //             } else {
            //                 //console.log('account added to db:' + id);
            //                 count++;
            //             }
            //         });
            // } else {
            // console.log(data);
            let insertAccount = {};
            //console.log("Data:", data);
            for (let key in data) {
                insertAccount[key] = data[key];
            }
            // First Check if the Account has been updated with the specicifed Date
            let checkAccount = ClientAccounts.findOne({
                Id: data.Id,
                AsOfDate: data.AsOfDate
            });
            // Insert Accounts to retain historical Data
            if (checkAccount) {
              //  console.log('Already inserted in the database: ', checkAccount.AsOfDate);
            } else {
               ClientAccounts.insert(
                    insertAccount,
                    (error, id) => {
                        if (error) {
                            console.log('Error', error);
                        } else {
                            console.log('New Id:', id);
                            count++;
                        }
                    });
            }
        }
        console.log(allPortfolios.length);
        console.log('Accounts again: ', accounts.length);
        _.each(allPortfolios, (p) => {           // Get List of Portfolios with Account
            const currentPortfolio = p;
            const currentAccountIds = currentPortfolio.AccountIds;
            Portfolios.update({
                _id: currentPortfolio._id
            }, {
                $set: {
                    accounts: []
                }
            });
            console.log('B');
            let portfolioAccounts = [];
            if (currentAccountIds && currentAccountIds.length > 0) {
                console.log('Now inside');
                _.each(currentAccountIds, (a, aIndex) => {
                    let pAccount = _.findWhere(accounts, {
                        Id: a
                    });
                    if (pAccount) {
                        //console.log('Account exists in portfolio,', _.contains(currentAccountIds, pAccount.Id), currentAccountIds, pAccount.Id);
                        portfolioAccounts.push(pAccount);
                    if(aIndex === currentAccountIds.length -1){
                        console.log('Index: ', aIndex, _.indexOf(currentAccountIds, a));
                        console.log('Pa Length', portfolioAccounts.length, currentAccountIds.length);
                        Portfolios.update({
                            _id: currentPortfolio._id,
                        }, {$push: {accounts: { $each: portfolioAccounts }}}, (error, result) => {
                            if(error)
                                console.log(error);
                            else(result)
                                console.log('Documents updated: ', result);
                        }  );
                    }
                    }
                });
            }
            console.log('Now outside');
        });
    }
};

export const processBatchAccounts = (accounts) => {
    //need to strip transactions fix total accounts
    saveAccounts(accounts, true, (num) => {
        console.log('Total accounts in shard updated in db: ' + num);
        console.log('Total accounts in shard in API call: ' + accounts.length);
    });

};