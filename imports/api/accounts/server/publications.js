import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts as PortfolioAccounts
} from '../accounts';
import {
    ReactiveAggregate
} from 'meteor/jcbernack:reactive-aggregate';



/*Meteor.publish('accountsUser', function returnDocs() {
    if (!this.userId) {
        return this.ready();
    }
    return Accounts.find({
        $or: [{
            userId: this.userId
        }, {
            userId: {
                $exists: true
            }
        }]

    });

});*/
Meteor.publish('accounts', function (accountIds = []) {
    if (!this.userId) {
        return this.ready();
    }
    console.log(accountIds);
    return PortfolioAccounts.find({
        _id: {
            $in: accountIds
        }
    });
});

/*
Meteor.publish('accountsList', function returnAccounts(accountIds) {
      if (!this.userId) {
        return this.ready();
    }
  console.log(Accounts.find({_id: { $in: accountIds }}));
  return Accounts.find({_id: { $in: accountIds }});
});*/

Meteor.publish("portfolioTotal", function (portfolioId = 'nothingPassed', accountIds = []) {
    // Remember, ReactiveAggregate doesn't return anything
    //onsole.log(accountIds);
    ReactiveAggregate(this, PortfolioAccounts, [{
        //First Match the AccountIds from the Portfolio
        $match: {
            '_id': {
                $in: accountIds
            }
        }
    }, {
        //Pass the Matched Accounts to the Group
        $group: {
            _id: null,
            'totals': {
                $sum: '$apiDetails.Details.TotalEmv'
            },
        }
    }, {
        //We only need the total calculation
        $project: {
            totals: '$totals'
        }
    }], {
        //Send to Client Side Publication
        clientCollection: 'PortfolioTotals',
        observeSelector: {
            '_id': {
                $in: accountIds
            }
        },
    });
});