import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  Billings,
  BillingsUploads
} from '../billings';
import _ from 'underscore';
import moment from 'moment';
import {
  ReactiveAggregate
} from 'meteor/jcbernack:reactive-aggregate';



const user = this.userId;



function buildQuery(accountId) {
  const isAvailable = {
    $and: [{

    }, {
      $and: [{
        userId: this.userId
      }, {
        userId: {
          $exists: true
        }
      }]
    }]
  };

  if (acountId) {
    return {
      $and: [{
        _id: accountId
      }, isAvailable]
    };
  }

  return isAvailable;
}

//Collecction with direct connection to DB
Meteor.publish("latestBillingsTotal", function (accountIds = [], options = {}) {
  const maxDate = _.max(distinct(Billings, 'asOfDate'), (d) => {
    return d;
  });
  //   console.log("This is max:", maxDate);
  //   console.log(Billings.find({
  //     asOfDate: maxDate,
  //     accountNumber: {
  //       $in: accountIds
  //     }
  //   }, options).fetch());
  return Billings.find({
    asOfDate: maxDate,
    accountNumber: {
      $in: accountIds
    }
  }, options);
});


//Client Side Collection
Meteor.publish("latestBillings", function (accountIds = [], options = {}) {
  var self = this;
  const maxDate = _.max(distinct(Billings, 'asOfDate'), (d) => {
    return d;
  });
  const selector = {
    asOfDate: maxDate,
    accountNumber: {
      $in: accountIds
    }
  };
  Mongo.Collection._publishCursor(Billings.find(selector, options), self, 'latestBillings');
  return self.ready();
});

//Function for selecting latest date from Billings
const distinct = (collection, field) => {
  return _.uniq(collection.find({}, {
    sort: {
      [field]: 1
    },
    fields: {
      [field]: 1
    }
  }).map(x => x[field]), true);
};

Meteor.publish("billingsLatestDate", function (accountIds = []) {
  // Remember, ReactiveAggregate doesn't return anything
  console.log(accountIds.length);
  ReactiveAggregate(this, Billings, [{
    $match: {
      accountNumber: {
        $in: accountIds
      }
    }
  }, {
    $sort: {
      "asOfDate": -1
    }
  }, {
    $group: {
      '_id': '$accountNumber',
      'billings': {
        $push: '$$ROOT'
      }
    }
  }, {
    $project: {
      "billings": {
        "$slice": ["$billings", 1]
      }
    }
  }], {
    clientCollection: 'billingsaggregate'
  });
});

Meteor.publish("billingsTotalByAdvisor", function (advId = "") {
  // Remember, ReactiveAggregate doesn't return anything
  console.log(advId);
  ReactiveAggregate(this, Billings, [{
    $match: {
      advisorId: advId
    }
  }, {
    $sort: {
      "asOfDate": -1
    }
  }, {
    $group: {
      '_id': '$accountNumber',
      'billings': {
        $push: '$$ROOT'
      }
    }
  }, {
    $project: {
      "billings": {
        "$slice": ["$billings", 1]
      }
    }
  }], {
    clientCollection: 'billingsaggregate'
  });
});
