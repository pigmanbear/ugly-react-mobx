'use strict'
import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    Households
} from '../households';
import {
    getApiData
} from '../../../../server/apicall/methods';

import moment from 'moment';


export const loadHouseholds = (when, callback=undefined) => {

    let time = ((moment().year() * 1000)+ (moment().month() * 100 ) + moment().date());
    console.log(time);
    let lastTime = ((moment(when).year() * 1000)+ (moment(when).month() * 100 ) + moment(when).date());
    console.log(lastTime);
    let err;
    let res;

    if (time > lastTime) {
        getApiData('household', (error, result) => {
            if (error) {
                console.log('Failed to get households due to ' + error);
                err = error;
                callback(err, res);
            } else {
                console.log('success with households');
                saveHouseholds(result.content, (num) => {
                    console.log('Total Households updated in db: ' + num);
                    console.log('Total Households in API call: ' + result.content.length);
                    res = moment().valueOf();
                    callback(err, res);
                });
            }
        });
    } else {
        console.log('Households retrieved today, will run again tomorrow.');
    }
};


export const saveHouseholds = (households, callback=undefined) => {
    let count = 0;

    for (var i = 0; i < households.length; i++) {
        Households.upsert({
                _id: households[i].id
            }, {
                $setOnInsert: {
                    _id: households[i].id,

                },
                $set: {
                    accountIds: households[i].accountIds
                }
            },
            (error, docCount) => {
                if (error) {
                } else {
                    count++;
                }
            });
    }
    Meteor.setTimeout(() => {
        callback(count);
    }, 1000);
};