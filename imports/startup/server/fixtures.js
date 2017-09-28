///From Base///
import {
  Meteor
} from 'meteor/meteor';
import {
  ValidatedMethod
} from 'meteor/mdg:validated-method';
import {
  Roles
} from 'meteor/alanning:roles';
import {
  Accounts
} from 'meteor/accounts-base';
import {
  Services
} from '../../../server/services/services';
const users = [{
  email: 'admin@admin.com',
  password: 'password',
  profile: {
    name: {
      first: 'Carl',
      last: 'Winslow'
    },
  },
  roles: ['admin'],
}];

users.forEach(({
  email,
  password,
  profile,
  roles
}) => {
  const userExists = Meteor.users.findOne({
    'emails.address': email
  });

  if (!userExists) {
    const userId = Accounts.createUser({
      email,
      password,
      profile
    });
    Roles.addUsersToRoles(userId, roles);
  }
});
////////////End Base


