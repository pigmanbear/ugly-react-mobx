import {
    Meteor
} from 'meteor/meteor';
import {
    Portfolios
} from '../../portfolios/portfolios';
import {
    Households
} from '../../households/households';
import {
    Advisors
} from '../advisors';

let count = 0;
export const addAdvisors = (callback) => {
    let advisorList = Portfolios.rawCollection().distinct('Advisors');
    Meteor.setTimeout(() => {
        advisorList.then((advisor) => {
            advisor.map((a) => {
                if (a._id) {
                    let ports = Portfolios.rawCollection().find({
                        "Advisors._id": a._id
                    }, {
                        _id: 1
                    }).toArray();
                    let portArray = [];
                    ports.then((p) => {
                        p.map((id) => {
                            let hids = Households.findOne(id);
                            if (hids !== null && hids !== undefined) {
                                portArray.push(hids);
                            }
                        });
                        console.log(advisor.indexOf(a) + ' | ' + advisor.length);
                        console.log(a._id);
                        let selector = {
                            _id: a._id
                        };
                        let modifier = {
                            $set: {
                                firstName: a.FirstName,
                                lastName: a.LastName,
                                portfolios: portArray
                            }
                        };
                        Advisors.upsert(selector, modifier, false, (error, id) => {
                            if (error) {
                                console.log(error);
                                return count;
                            } else {
                                return count++;
                            }
                        });
                    });
                } else {
                    if (a === null) console.log('Advisor is Null');
                }
            });
        });
    }, 3000);
    Meteor.setTimeout(() => {
        callback(count);
    }, 6000);
};