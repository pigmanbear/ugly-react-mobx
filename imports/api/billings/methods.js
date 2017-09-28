'use strict';
import {
  UploadFS
} from 'meteor/jalik:ufs';
import {
  Billings,
  BillingsUploads,
  BillingsStore,
  BillingsSchema,
} from './billings.js';
import {
  Meteor
} from 'meteor/meteor';
import {
  Bert
} from 'meteor/themeteorchef:bert';
import Baby from 'babyparse';
import fs from 'fs';
import {
  SimpleSchema
} from 'meteor/aldeed:simple-schema';
import {
  ValidatedMethod
} from 'meteor/mdg:validated-method';
import {
  rateLimit
} from '../../modules/rate-limit.js';
import {
  simpleSchemaMixin
} from 'meteor/rlivingston:simple-schema-mixin';
import {
  check
} from 'meteor/check';


export const upload = (data) => {
  return new Promise((resolve, reject) => {
    // pick from an object only: name, type and size
    const file = {
      name: data.name,
      type: data.type,
      size: data.size,
    };
    const upload = new UploadFS.Uploader({
      data,
      file,
      store: BillingsStore,
      onError: reject,
      onComplete: resolve
    });
    upload.start();

  });
};



export const processBillingsUpload = (id) => {
  return new Promise((resolve, reject) => {
    Meteor.call('billingUpload', id, Meteor.bindEnvironment((error, result) => {
      if (error) {
        console.log('Error.Result: ', error);
        reject(error);
      } else {
        console.log('Success.Result: ', result);
        resolve(result);
      }
    }));
  });
};

export const insertBilling = new ValidatedMethod({
  name: 'Billings.insert',
  mixins: [simpleSchemaMixin],
  schema: Billings.simpleSchema().pick([
    'feeSchedule',
    'accountNumber',
    'asOfDate',
    'billingAccount',
    'accountValue',
    'billedValue',
    'cashAvailable',
    'fee',
    'cashDifference',
    'billingGroup',
    'billingSchedule',
    'custodian'

  ]),
  schemaValidatorOptions: {
    clean: true,
    filter: true
  },
  //validate: Billings.simpleSchema().validator({clean: true}),
  run({
    feeSchedule,
    accountNumber,
    asOfDate,
    billingAccount,
    accountValue,
    billedValue,
    cashAvailable,
    fee,
    cashDifference,
    billingGroup,
    billingSchedule,
    custodian
  }) {
    console.log({
      feeSchedule,
      accountNumber,
      asOfDate,
      billingAccount,
      accountValue,
      billedValue,
      cashAvailable,
      fee,
      cashDifference,
      billingGroup,
      billingSchedule,
      custodian
    });
    Billings.insert({
      feeSchedule,
      accountNumber,
      asOfDate,
      billingAccount,
      accountValue,
      billedValue,
      cashAvailable,
      fee,
      cashDifference,
      billingGroup,
      billingSchedule,
      custodian
    }, (num) => {
      console.log(num);
    });
  },
});

export const updateBilling = new ValidatedMethod({
  name: 'Billings.update',
  validate: BillingsSchema.validator({
    clean: true
  }),
  run({
    _id,
    update
  }) {
    Billings.update(_id, {
      $set: update
    });
  },
});

export const removeBilling = new ValidatedMethod({
  name: 'Billings.remove',
  validate: BillingsSchema.validator(),
  run({
    _id
  }) {
    Billings.remove(_id);
  },
});

rateLimit({
  methods: [
    insertBilling,
    updateBilling,
    removeBilling,
  ],
  limit: 500,
  timeRange: 100,
});

Meteor.methods({
  addBilling(data) {
    check(data, Array);
    for (let i = 0; i < data.length; i++) {
      insertBilling.call(data[i]);
    }
  }
});
