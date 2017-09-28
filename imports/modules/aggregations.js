import R from 'ramda';
import state from '../stores/mobxstores';




export const isObject1 = R.is(Object, R.__);
export const isNumber = R.is(Number, R.__);
export const pluckKeyValues = (selector, collection) => R.pluck(selector)(collection);
export const filterValues1 = R.filter(R.__, R.__);
export const notUndefined = n => R.not(R.isNil(n));
export const isNotEmpty = x => R.not(R.isEmpty(x));
//Pass in Complete Portfolio Object to Calculate Portfolio Total Assets 
export const portfolioTotal = portfolio => {
  let details = filterValues(notUndefined, pluckKeyValues('Details', portfolio.accounts));
  if (isObject(details)) {
    return R.sum(filterValues(isNumber, pluckKeyValues('TotalEmv', details)));
  } else {
    return 0;
  }

};

//Calculates Total Billing based on CURRENT accounts associated witn portfolio
export const billingTotal = portfolio => {
  if(notUndefined(portfolio.accounts)){
    let accountNums = R.flatten(filterValues(notUndefined, pluckKeyValues('AccountNumber', portfolio.accounts)));
    console.log(accountNums);
      const accountMatch = a => {
      let g = R.whereEq({
          accountNumber: a
        });
        return  filterValues(g, toJS(appstate.billingsLatest));
      };
      let accountBillings = R.flatten(filterValues(isNotEmpty, R.map(accountMatch, accountNums)));
      if(isNotEmpty(accountBillings)) {
      return R.sum(filterValues(isNumber, pluckKeyValues('fee', accountBillings)));
      } else { 
        return 0;
      }
  }else {
    return 0;
  }
};


//Calculates Total Assets For an Array of Portfolio Objects
export const portfoliosTotal = (portfolios) => {
    let accounts = R.flatten(filterValues(notUndefined, pluckKeyValues('accounts', portfolios)));
    if (isObject(accounts) && accounts.length > 0) {
       let details =  filterValues(notUndefined, pluckKeyValues('Details', accounts));
       return R.sum(filterValues(isNumber, pluckKeyValues('TotalEmv', details)));
    } else {
      return 0;
    }
};

//Calculates Total Billing for array of Pprtfolio Objects based CURRENT associated accounts
export const billingsTotal = billings => {
    let fee = filterValues(notUndefined, pluckKeyValues('fee', billings));
    if (isObject(fee) && fee.length > 0) {
      return R.sum(filterValues(isNumber, fee));
    } else {
      return 0;
    }
};