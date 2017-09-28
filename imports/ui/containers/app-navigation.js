import {
  composeWithTracker
} from 'react-komposer';
import {
  Meteor
} from 'meteor/meteor';
import {
  AppNavigation
} from '../components/app-navigation';
import { 
  Roles
} from 'meteor/alanning:roles';

const composer = (props, onData) => {
  onData(null, {
    hasUser: Meteor.user(),
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
  });
};

export default composeWithTracker(composer, {}, {}, {
  pure: false
})(AppNavigation);