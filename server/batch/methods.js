'use strict'
import {
    Meteor
} from 'meteor/meteor';
import {
    ApiCall
} from '../apicall/apicall';
import {
    getBatchId,
    getBatchZip
} from '../apicall/methods';
import {
    processBatchAccounts
} from '../../imports/api/accounts/server/methods';
import {
    processBatchPortfolios
} from '../../imports/api/portfolios/server/methods';
import {
    processBatchTransactions
} from '../../imports/api/transactions/server/methods';
import moment from 'moment';
import fs from 'fs';
import zip from 'adm-zip';
import _ from 'underscore';






export const processApiBatchData = (again = false) => {
    let call = ApiCall.findOne('blackDiamondBatch');
    console.log('Again: ' + again);
    let when;
    if (!call) {
        when = moment().toDate();
    } else if (!call.lastRequest) {
        when = moment().toDate();
        console.log('This is when: ' + when);
    } else {
        when = call.lastRequest;
    }
    const yesterday = () => {
        let day = moment().add(-1, 'd');
        switch (day.weekday()) {
            case 0:
                return moment().add(-2, 'd');
            case 1:
                return moment().add(-3, 'd');
            default:
                return day;
        }
    };
    console.log('When: ' + when);
    console.log('Yesterday: ' + yesterday().toDate());
    if (again && !yesterday().isSameOrAfter(when)) {
        getBatchZip((error, result) => {
            console.log('batchzip call back ');
            if (error)
                throw error;
            else
                saveApiBatchData(call.batch_id);
        });

    }
    if (yesterday().isSameOrAfter(when)) {
        console.log('Batch is outdated, getting new batch Id before retrieving zip. . .');
        getBatchId((error, result) => {
            if (error) {
                console.log('Error returned from getting Batch ID');
                console.log(error);
            } else {
                call = ApiCall.findOne('blackDiamondBatch');
                getBatchZip((error, result) => {
                    console.log('batchzip call back ');
                    if (error)
                        throw error
                    else
                        saveApiBatchData(call.batch_id);
                });
            }
        });
    } else if (!again) {
        console.log('Batch last ran: ' + moment(when).toDate() + '. Another call will be made tomorrow');
        let time = ((1000 * moment().year()) + (100 * moment().month()) + moment().date());
        let lastTime;
        if (call.batchlastProcessed) {
            lastTime = ((1000 * moment(call.batchlastProcessed).year()) + (100 * moment(call.batchlastProcessed).month()) +
                moment(call.batchlastProcessed).date());
        } else {
            call.batchlastProcessed = moment().add(-4, 'd').valueOf();
            lastTime = ((1000 * moment(call.batchlastProcessed).year()) + (100 * moment(call.batchlastProcessed).month()) +
                moment(call.batchlastProcessed).date());
        }
        if (time > lastTime) {
            call = ApiCall.findOne('blackDiamondBatch');
            saveApiBatchData(call.batch_id);
        } else {
            console.log('Batch has been called and processed as of: ' + call.batchlastProcessed);
            console.log('Process will run with cron tomorrow');
        }
    }

};

export const saveApiBatchData = (batch) => {
    let batchFile = '/tmp/batch_call_' + batch + '.zip';
    let accountEntries = [];
    fs.stat(batchFile, Meteor.bindEnvironment((error, stats) => {
        if (error) {
            processApiBatchData(true);
            return console.log('No File!! Will try to retrieve with current batch id: ' + batch);
        }
        if (stats.isFile()) {
            let zFile = new zip(batchFile);
            let zipEntries = zFile.getEntries();
            for (let zz = 0; zz < zipEntries.length; zz++) {
                console.log(zz, zipEntries[zz].entryName);
                if (zipEntries[zz].entryName.includes('portfolio')) {
                    let batchPortfolios = JSON.parse(zFile.readAsText(zipEntries[zz].entryName));
                    processBatchPortfolios(batchPortfolios);
                } else if (zipEntries[zz].entryName.includes('account')) {
                    let batchAccounts = JSON.parse(zFile.readAsText(zipEntries[zz].entryName));
                    console.log(batchAccounts.length);
                    _.each(batchAccounts, (ba) => {
                        accountEntries.push(ba);
                    });
                    if (zz === zipEntries.length - 1) {
                        _.flatten(accountEntries);
                        console.log(accountEntries.length);
                        processBatchAccounts(accountEntries);
                        console.log('Finished processing the batch file.');
                        saveLastProcessed();
                    }
                }
            }
        } else {
            console.log('Zip file with batch id:' + batch + ' does not exist. Get Zip File');
            processApiBatchData(true);
        }
    }));
};


function saveLastProcessed() {
    ApiCall.update({
        _id: 'blackDiamondBatch'
    }, {
        $set: {
            batchlastProcessed: moment().valueOf()
        }
    });
}