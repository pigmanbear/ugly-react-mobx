import { Meteor } from 'meteor/meteor';
import { Advisors} from '../advisors';

Meteor.publish('advisors', () => Advisors.find());

