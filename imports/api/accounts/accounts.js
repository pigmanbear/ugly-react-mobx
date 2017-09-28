import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import {
  Class
} from 'meteor/jagi:astronomy';
import {
  Address,
  ClassAllocation,
  CostB,
  Detail,
  Goal,
  Holding,
  Manager,
  RepCode,
  SegmentAllocation,
  Target,
  TaxLot,
  TaxMeth,
  TaxStat,
  Tag,
} from '../classes/astronomy';
import moment from 'moment';

export const ClientAccounts = new Mongo.Collection('clientaccounts');
export const ClientAccountsNotes = new Mongo.Collection('clientaccountsnotes');

ClientAccounts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ClientAccounts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ClientAccountsNotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ClientAccountsNotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const ClientAccount = Class.create({
  name: 'ClientAccount',
  collection: ClientAccounts,
  fields: {
    Id: String,
    Name: String,
    AccountNumber: String,
    BillingNumber: {
      type: String,
      default: () => {
        let doc = e.currentTarget;
        return doc.AccountNumber;
      }
    },
    TaxMethodology: {
      type: TaxMeth,
      default: 1,
    },
    TaxStatus: {
      type: TaxStat,
      default: 3,
    },
    StartDate: {
      type: Date,
      default: moment().toISOString()
    },
    ClosedDate: {
      type: Date,
      optional: true,
    },
    AsOfDate: {
      type: Date,
      optional: true,
    },
    LastReconciledDate: {
      type: Date,
      optional: true,
    },
    Custodian: {
      type: String,
      default: 'Not Available'
    },
    Address: {
      type: Address
    },
    ClassAllocations: {
      type: [ClassAllocation],
      optional: true,
    },
    CostBasis: {
      type: CostB,
      optional: true,
    },
    Details: {
      type: Detail
    },
    Goals: {
      type: [Goal],
      optional: true,
    },
    Holdings: {
      type: [Holding],
      optional: true,
    },
    Manager: {
      type: Manager,
      optional: true,
    },
    RepCodes: {
      type: [RepCode],
    },
    SegmentAllocations: {
      type: [SegmentAllocation],
      optional: true,
    },
    Style: {
      type: String,
      default: 'NA'
    },
    Targets: {
      type: [Target],
      optional: true,
    },
    TaxLots: {
      type: [TaxLot],
      optionals: true,
    },
    Tags: {
      type: [Tag],
      optional: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: String,
      default () {
        return Meteor.userId() || 'SYSTEM';
      },
      immutable: true,
    },
    updatedBy: {
      type: String,
      default () {
        return Meteor.userId() || 'SYSTEM';
      },
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
});

// console.log(Account);
