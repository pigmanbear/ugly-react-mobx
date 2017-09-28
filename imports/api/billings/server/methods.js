'use strict';
import {
    Billings,
    BillingsUploads,
    BillingsStore,
} from '../billings';
import { insertBilling } from '../methods.js';
import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import Baby from 'babyparse';
import fs from 'fs';


Meteor.methods({

    billingUpload: function (id) {
        // Get the file from database
        check(id, String);
        let bfile = BillingsUploads.findOne(id);
        console.log('bfile: ', bfile);
        let e;
        let r;

        // Get the file stream from the store
        var readStream = BillingsStore.getReadStream(id, bfile);

        let error = readStream.on('error', Meteor.bindEnvironment(function (error) {
            console.error(error);
            e = error;
            console.log('In meteor method, error: ', e);
            return e;
        }));

        let success = readStream.on('data', Meteor.bindEnvironment(function (data) {
            let thisdata = Baby.parse(data.toString(), {
                header: true,
                dynamicTyping: true,
                complete: (result) => {}
            });
            r = thisdata;
            let p = 'success';
            console.log('In meteor method, result: ', p);
            return p;

        }));
        if (!error)
            return success;
        else return error;
    }
});
//Use Validated method

