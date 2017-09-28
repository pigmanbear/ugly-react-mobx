import { Meteor } from 'meteor/meteor';
import { Services } from './services';

const gt = Meteor.settings.blackDiamond.grant_type;
const gt2 = Meteor.settings.blackDiamond.grant_type2;
const cid = Meteor.settings.blackDiamond.client_id;
const cs = Meteor.settings.blackDiamond.client_secret;
const username = Meteor.settings.blackDiamond.username;
const password = Meteor.settings.blackDiamond.password;

const bd_settings = {
  '_id': 'blackdiamond',
  'grant_type': [gt, gt2],
  'client_id': cid,
  'client_secret': cs,
  'username': username,
  'password': password
};

export const bd_service = () => {
  Services.upsert({
      _id: bd_settings._id
    }, {
      $setOnInsert: {
        _id: bd_settings._id,

      },
      $set: {
        grant_type: bd_settings.grant_type,
        client_id: bd_settings.client_id,
        client_secret: bd_settings.client_secret,
        username: bd_settings.username,
        password: bd_settings.password
      }
    },
    (error, docCount) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Documents affected: ', docCount);
        console.log('Services setup completed.');
      }
    });
};