import {
  Mongo
} from 'meteor/mongo';
import {
  Class
} from 'meteor/jagi:astronomy';

import {
  Address,
  Advisor,
  Target,
  Goal,
  Tag
} from '../classes/astronomy';
import {
  ClientAccount
} from '../accounts/accounts';

export const Portfolios = new Mongo.Collection('portfolios');
export const PortfoliosNotes = new Mongo.Collection('portfoliosnotes');

Portfolios.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Portfolios.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

PortfoliosNotes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

PortfoliosNotes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const Portfolio = Class.create({
  name: 'Portfolio',
  collection: Portfolios,
  fields: {
    _id: String,
    name: String,
    clientVisibility: Boolean,
    accountIds: [String],
    address: {
      type: Address,
      optional: true,
    },
    advisors: {
      type: [Advisor],
      optional: true,
    },
    targets: {
      type: [Target],
      optional: true,
    },
    goals: {
      type: [Goal],
      optional: true,
    },
    accounts: {
      type: [ClientAccount],
      optional: true,
    },
    tag: {
      type: [Tag],
      optional: true,
    },

    advisorId: {
      type: String,
      default: 'None',
    },
    objectId: {
      type: String,
      default: 'None',
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
