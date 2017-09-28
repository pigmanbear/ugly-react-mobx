import { Mongo } from 'meteor/mongo';

export const LatestBillings = new Mongo.Collection('latestBillings');
export const BillingsAggregate = new Mongo.Collection('billingsaggregate');