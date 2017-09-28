import { Mongo } from 'meteor/mongo';

export const PortfolioTotals = new Mongo.Collection('portfolioTotals');
export const PortCounts = new Mongo.Collection('portCounts');
export const Ports = new Mongo.Collection('ports');
export const PortfoliosBilling = new Mongo.Collection('portfoliosbilling');