'use strict'
import {
    Meteor
} from 'meteor/meteor';
import {
    addAdvisors
} from '../../api/advisors/server/methods';
import {
    getAllRealTimeBlackDiamondData,
    getBatchBlackDiamondData
} from './methods';
import { SyncedCron } from 'meteor/percolate:synced-cron';




//   SyncedCron.config({
//     // Log job run details to console
//     log: true,

//     // Name of collection to use for synchronisation and logging
//     collectionName: 'cronjobs',

//     // Default to using localTime
//     utc: false,

//     /*
//       TTL in seconds for history records in collection to expire
//       NOTE: Unset to remove expiry but ensure you remove the index from
//       mongo by hand

//       ALSO: SyncedCron can't use the `_ensureIndex` command to modify
//       the TTL index. The best way to modify the default value of
//       `collectionTTL` is to remove the index by hand (in the mongo shell
//       run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
//       project. SyncedCron will recreate the index with the updated TTL.
//     */
//     collectionTTL: 172800
//   });

export const apiCalls = () => {

    // getAllRealTimeBlackDiamondData.call((error, result) => {
    //     if (!error) {
            getBatchBlackDiamondData.call();
    //    }
   // });
};
//apiCalls();

// addAdvisors((num) => {
//     console.log('Total Advisors: ', num);
// });

// SyncedCron.add({
//     name: 'APICalls',
//     schedule: function(parser) {
//         return parser.text('at 9:00am except on Sunday and Monday');
//     },
//     job: apiCalls
    

// });

// SyncedCron.add({
//     name: 'AddAdvisors',
//     schedule: function(parser) {
//         return parser.text('at 9:00am except on Sunday and Monday');
//     },
//     job: addAdvisors
// });



// SyncedCron.start();
// console.log('Cron Started . . .');
// console.log('Getting New BlackDiamond Data');
// Meteor.setTimeout(() => {
//     apiCalls();
// }, 10000);