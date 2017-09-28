import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    UploadFS
} from 'meteor/jalik:ufs';
import {
    SimpleSchema
} from 'meteor/aldeed:simple-schema';


export const Billings = new Mongo.Collection('billings');
export const BillingsUploads = new Mongo.Collection('billingsUploads');
export const BillingsNotes = new Mongo.Collection('billingsNotes');
let userId = this.userId;


Billings.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Billings.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

BillingsUploads.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

BillingsUploads.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

BillingsNotes.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

BillingsNotes.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});
export const BillingsStore = new UploadFS.store.Local({
    collection: BillingsUploads,
    name: 'billingsUploads',
    //path: '/Volumes/Overdrive/wealthsource/billings-uploads', //Development
    path: '/app/bundle/programs/billings-upload', //Production
    filter: new UploadFS.Filter({
        onCheck: function (file) {
            if (file.extension !== 'csv' && file.extension !== 'json' && file.extension !== 'xls' && file.extension != 'xlsx') {
                return false;
            }
            return true;
        }
    }),
    mode: '0744', //directory permissions
    writeMode: '0744',
    transformRead: function (from, to, fileId, file, request) {

        console.log(to); // this returns the raw data
        console.log(from);
        console.log(fileId);
        console.log(file);
        console.log(request);
        from.pipe(to);
        console.log(to);
    },
    onWriteError: function (err, fileId, file) {
            console.error('Cannot write ' + file.name);

        } //file permissions


    //trasnfrom File to JSON 
    /*  transformWrite(from, to, fileId, file) {
      }
      */
});



export const BillingsSchema = new SimpleSchema({

    accountNumber: {
        type: String,
        label: "Account Number",
    },
    custodian: {
        type: String,
        label: 'Custodian of account.',
        optional: true,
    },
    billingAccount: {
        type: String,
        label: "Billing Number",
    },
    feeSchedule: {
        type: String,
        label: 'Fee Schedule Name',
    },
    accountValue: {
        type: Number,
        decimal: true,
    },
    billedValue: {
        type: Number,
        decimal: true,
    },
    fee: {
        type: Number,
        decimal: true,
    },
    asOfDate: {
        type: Date,
        label: 'Date of Last Account Reconciliation.',
    },
    cashDifference: {
        type: Number,
        decimal: true,
    },
    cashAvailable: {
        type: Number,
        decimal: true,
    },
    billingGroup: {
        type: String,
    },
    billingSchedule: {
        type: String,
    },
    prorate: {
        type: Boolean,
        optional: true,
    },
    dayCount: {
        type: Number,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('prorate').value === true;

            if (shouldBeRequired) {
                // inserts
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return SimpleSchema.ErrorTypes.REQUIRED;
                }

                // updates
                else if (this.isSet) {
                    if (this.operator === '$set' && this.value === null || this.value === '') return SimpleSchema.ErrorTypes.REQUIRED;
                    if (this.operator === '$unset') return SimpleSchema.ErrorTypes.REQUIRED;
                    if (this.operator === '$rename') return SimpleSchema.ErrorTypes.REQUIRED;
                }
            }
        }
    },
    created: {
        type: Object,
        autoValue: function () {
            if (this.isInsert) {
                return {
                    at: new Date(),
                    by: this.userId,
                };
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: {
                        at: new Date(),
                        by: this.userId,
                    }
                };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    'created.at': {
        type: Date,
        optional:true,
    },
    'created.by': {
        type: String,
        optional:true,
    },
    updatesHistory: {
        type: Array,
        optional: true,
        autoValue: function () {
            var fee = this.field("fee");
            if (fee.isSet) {
                if (this.isInsert) {
                    return [{
                        at: new Date(),
                        by: this.userId,
                        fee: fee.value,
                        asOfDate: this.field('asOfDate').value,
                        billingAccount: this.field('billingAccount').value,
                        feeSchedule: this.field('feeSchedule').value,
                        billedValue: this.field('billedValue').value,
                        billingSchedule: this.field('billingSchedule').value,
                        billingGroup: this.field('billingGroup').value,
                    }];
                } else {
                    return {
                        $push: {
                            at: new Date(),
                            by: this.userId,
                            fee: fee.value,
                            asOfDate: this.field('asOfDate').value,
                            billingAccount: this.field('billingAccount').value,
                            feeSchedule: this.field('feeSchedule').value,
                            billedValue: this.field('billedValue').value,
                            billingSchedule: this.field('billingSchedule').value,
                            billingGroup: this.field('billingGroup').value,
                        }
                    };
                }
            }
        }
    },
    'updatesHistory.$': {
        type: Object,
        optional:true,
        blackbox: true,
    },
});

Billings.attachSchema(BillingsSchema);
