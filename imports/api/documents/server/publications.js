import {
    Meteor
} from 'meteor/meteor';
import {
    Mongo
} from 'meteor/mongo';
import {
    Documents
} from '../documents';
import {
    Accounts
} from '../../accounts/accounts';
import {
    check,
    Match
} from 'meteor/check';
import {
    Counts
} from 'meteor/tmeasday:publish-counts';
import {
    publishComposite
} from 'meteor/reywood:publish-composite';

const user = this.userId;


function buildQuery(portfolioId, search) {
    const isAvailable = {
        $and: [{
            userId: this.userId
        }, {
            userId: {
                $exists: true,
            },
            AccountIds: {
                $exists: true
            },
            accounts: {
                $not: {
                    $size: 0
                }
            }
        }]
    };
    const searchRegEx = {
        '$regex': '.*' + (search || '') + '.*',
        '$options': 'i'
    };

    if (portfolioId) {
        return {
            $and: [{
                _id: portfolioId
            }, isAvailable]
        };
    }

    return {
        $and: [{
            Name: searchRegEx,
            $or: [{
                'accounts': {
                    $elemMatch: {
                        Name: searchRegEx
                    }
                },
            }],
        }, isAvailable]
    };
}

Meteor.publish('document', function (portfolioId) {
    console.log("In document", portfolioId);

    return {
        find: function () {
            if (portfolioId === undefined || portfolioId === null) {
                portfolioId = '';
            }
            //console.log(Documents.find(buildQuery.call(this, portfolioId)));
            return Documents.find(buildQuery.call(this, portfolioId));
        },
        children: [{
            find: function (port) {
                return Accounts.find({
                    _id: {
                        $in: port.portfolio.AccountIds
                    }
                });
            }
        }]
    };
});

Meteor.publish('docCounts', function (search) {
    const selector = buildQuery.call(this, null, search);
    Counts.publish(this, 'numberOfDocuments', Documents.find(selector));
    var self = this;
    Mongo.Collection._publishCursor(Documents.find(selector), self, 'docCounts');
    return self.ready(); 
});
Meteor.publish('portfolioTotals', function (options={}) {
    const selector = buildQuery.call(this, null);
    var self = this;
    Mongo.Collection._publishCursor(Documents.find(selector, options), self, 'portfolioTotals');
    return self.ready(); 
});

Meteor.publish('ports', function (options, search) {
    var self = this;
    const selector = buildQuery.call(this, null, search);

    if (options === undefined || options === null) {
        options = {
            sort: {
                "Name": 1
            },
            limit: 0,
            skip: 0,
        };
    }
    Mongo.Collection._publishCursor(Documents.find(selector, options), self, 'ports');
    return self.ready(); 
});

