import {
  action,
  toJS
} from 'mobx';
import state from '../stores/mobxstores';
import {
  accountMatchToBillings
} from '../modules/calculations';
import {
  filterValues
} from '../modules/ramda-utils';

import R from 'ramda';


const curry = R.curry;
const pluck = R.pluck;
const set = R.set;
const forEach = R.forEach;
const mapObjIndexed = R.mapObjIndexed;
const lensProp = R.lensProp;
const map = R.map;

export const billingsLatestSetLoading = action(isLoading => {
  state.billingsLatestLoading = isLoading;
  return isLoading;
});

export const denormalizeBillings = action(billings => {
  if (state.portfolios.length > 0 && billings.length > 0) {
    let g = map(getBillings, toJS(state.portfolios));
    let b = map(getBillings, toJS(state.portfoliosBilling));
    state.portfolios.replace(g);
    state.portfoliosBilling.replace(b);
    //state.portfoliosBilling.replace(map(setBillingsForAccount, toJS(state.portfoliosBilling)));
  }
});
const getBillings = action((portfolio) => {
  portfolio = set(lensProp('accounts'), map((acct) => {
    if (acct) {
      let accountMatch = R.whereEq({
        accountNumber: acct.AccountNumber
      });
      let accountFees = filterValues(accountMatch, toJS(state.billingsLatest));
      acct = set(lensProp('latestBillings'), accountFees, acct);
      return acct;
    } else return (acct);
  }, portfolio.accounts), portfolio);
  return portfolio;
});
