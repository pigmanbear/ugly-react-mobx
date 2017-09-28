'use strict'
import {
    Transactions
} from '../transactions';
import {
    Meteor
} from 'meteor/meteor';
import moment from 'moment';


export const saveTransactions = (transactions, callback) => {
    let count = 0;
    let transaction = {};
    if (!transactions) {
        console.log('No transactions: ' + transactions);
        return;
    }
    for (let i = 0; i < transactions.length; i++) {

        let data = JSON.stringify(transactions[i]);
        let parsed = JSON.parse(data, function(k, v) {
            if (k === 'transactionId' || k == 'TransactionID')
                this._id = v;
            else
                return v;
        });

        for (let key in parsed) {
            if (key !== '_id') {
                transaction[key] = parsed[key];
            }
        }
        Transactions.upsert({
                _id: parsed._id
            }, {
                $set: {
                    transaction
                }
            },
            (error, id) => {
                if (error) {
                    console.log(id, +': ' + error);
                } else {
                    count++;
                }
            });
    }
    Meteor.setTimeout(() => {
        callback(count);
    }, 1000);
};

export const processBatchTransactions = (transactions) => {
    //fix total Transactions
    console.log('Do not need to Save Transactions in seperate collection.');
    // for (let t = 0; t < transactions.length; t++) {
    //     if (transactions[t].Transactions) {
    //         saveTransactions(transactions[t].Transactions, (num) => {
    //             // console.log('Total transactions in account updated in db: ' + num);
    //             // console.log('Total transactions in API call: ' + transactions[t].Transactions.length);
    //         });
    //     }
    // }
};













//export function loadTransactions() {
    //throw 'Function Not Implemented!!';
    /*  function getToken(): any {
       Meteor.call('blackDiamond', (error, result) => {
          if (error) {
            console.log('Failed to get token ' + error);
            return error;
          } else {
            console.log('success retrieving token, now get some transactions');
            g = result;
            token_time = moment().utc();
            let token_time2 = moment().add(500, 'seconds');
            console.log(token_time);
            console.log(token_time2);
            console.log(moment().utc().valueOf());
            token = g;
            console.log(moment(token_time).isBefore(token_time2));
          }
        });
        return g;
      }
      let token = getToken();
      Meteor.setTimeout(function () {
      console.log(token); }, 3000);*/

    //cannot retrieve all transaciton so must iterate through households
    /*for (let j = 0; households.length; j++) {
      console.log(households_counter + '/' + households.length);
      households_counter++;
      if (households) {
        console.log(households[j]._id);
        Meteor.call('getApiData', token.content.access_token, 'portfolio/' + households[j]._id + '/transaction', (error, result) => {
          if (error) {
            console.log('Failed to get transactions due to ' + error);
            return error;
          } else {
            t = result;
            console.log('success with transactions');
            if (t) {
              saveTransactions(t.content, (num) => {
                console.log('Total transactions updated in db: ' + num);
                //console.log('Total transactions in API call: ' + t.content.length);
              });
            } else {
              console.log('No error in return of results, need to not add to list, or delete portfolioID.')
            }
          }
        });
      }
      if (token_time < moment.utc()) {
        token = getToken();
      }
    };*/
//}

