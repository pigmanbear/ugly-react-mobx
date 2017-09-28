import { Meteor } from 'meteor/meteor';
import { Transactions } from '../transactions';

Meteor.publish('transactions', () => Transactions.find());
