import {
    Meteor
} from 'meteor/meteor';
import {
    Households
} from '../households';

Meteor.publish('households', () => Households.find());
