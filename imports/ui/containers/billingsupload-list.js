/*import {
  composeWithTracker
} from 'react-komposer';
import {
  Billings
} from '../../api/billings/billings';
import {
  DocumentsList
} from '../components/documents-list.js';
import {
  Loading
} from '../components/loading.js';
import {
  Meteor
} from 'meteor/meteor';
import {
  Tracker
} from 'meteor/tracker';

const composer = (params, onData) => {
  Tracker.autorun(() => {
    const subscription = Meteor.subscribe('documents');

    if (subscription.ready()) {
      const documents = Documents.find().fetch();
      onData(null, {
        documents
      });
    }
  });
};


export default composeWithTracker(composer, Loading)(DocumentsList);*/