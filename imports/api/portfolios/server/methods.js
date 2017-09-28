'use strict'
import {
  Meteor
} from 'meteor/meteor';
import {
  Portfolios
} from '../portfolios';
import {
  getApiData
} from '../../../../server/apicall/methods';
import R from 'ramda';
import {
  isNotEmpty,
  isEqualProps,
  isNotEqualProps,
  hasId,
  notUndefined,
  filterValues,
} from '../../../modules/ramda-utils';
import {
  camelCase
} from 'lodash';





export const savePortfolios = (portfolios, batch, callback) => {
  let count = 0;

  for (let i = 0; i < portfolios.length; i++) {
    let data = JSON.stringify(filterValues(notUndefined, portfolios[i]));
    let parsed = JSON.parse(data, function (k, v) {
      if (R.toLower(k) === "id")
        this._id = v;
      else if (R.toLower(k) === 'accountids')
        return filterValues(isNotEmpty, v);
      else
        return v;
    });
    let upsert = {
      $set: {}
    };
    for (let key in parsed) {
      if (key !== '_id') {
        upsert.$set[key] = parsed[key];
      }
      if (R.toLower(key) === 'accountids') {
      }
    }
    Portfolios.upsert({
        _id: parsed._id
      }, upsert,
      (error, id) => {
        if (error) {
          console.log(error);
        } else {
          count++;
        }
      });

  }

  //   const checkExists = obj => hasId(obj) ? Portfolio.findOne(obj.Id) : R.F(obj);

  //   const preparePortfolio = obj => JSON.parse(JSON.stringify(obj), function (k, v) {
  //     if (R.toLower(k) === "id") {
  //       this._id = v;
  //     } else if (R.toLower(k) === 'accountids') {
  //       this.accountIds = filterValues(isNotEmpty, v);
  //     }
  //     return (this[camelCase(k)] = v);
  //   });

  //   const saveNewPortfolio = obj => {
  //     const port = new Portfolio();
  //     port.set(preparePortfolio(obj));
  //     port.save((error, id) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('New Portfolio: ', id);
  //         count++;
  //       }
  //     });
  //   };

  //   const processPortfolio = portfolio => {
  //     debugger;
  //     const existingPortfolio = checkExists(portfolio);
  //     debugger;
  //     const cleanedPortfolio = preparePortfolio(portfolio);
  //     console.log(existingPortfolio);
  //     console.log(cleanedPortfolio);
  //     debugger;
  //     const checkProps = (value, key, obj) => {
  //       let x = R.cond([
  //         [isNotEqualProps(key, obj), R.always(value)],
  //         [isEqualProps(key, obj), R.always(null)]
  //       ]);
  //       return x(existingPortfolio);
  //     };
  //     if (existingPortfolio) {
  //       let difference = R.mapObjIndexed(checkProps, cleanedPortfolio);
  //       console.log(existingPortfolio);
  //       let cleanedDifference = filterValues(notUndefined, difference);
  //       existingPortfolio.set(cleanedDifference);
  //       console.log(existingPortfolio);
  //       debugger;
  //       existingPortfolio.save();
  //     } else {
  //         debugger;
  //       saveNewPortfolio(portfolio);
  //     }

  //   };
  //   R.forEach(processPortfolio, portfolios);





  Meteor.setTimeout(() => {
    callback(count);
  }, 2000);
};

export const processBatchPortfolios = (portfolios) => {
  savePortfolios(portfolios.Portfolios, true, (num) => {
    console.log('Total portfolios updated in db: ' + num);
    console.log('Total portfolios in API call: ' + portfolios.Portfolios.length);
  });

}
