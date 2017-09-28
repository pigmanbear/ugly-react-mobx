import {
  action,
  toJS
} from 'mobx';
import state from '../stores/mobxstores';
import R from 'ramda';



const curry = R.curry;
const pluck = R.pluck;
const flatten = R.flatten;
const unique = R.uniq;




export const portfoliosSetLoading = action(isLoading => {
  state.portfoliosLoading = isLoading;
  return isLoading;
});

export const portfoliosAccounts = action(portfolios => {
  let f = toJS(portfolios);
  let AccountNumbers = unique(pluck('AccountNumber')(flatten((pluck('accounts')(f)))));
  state.portfoliosAccountNumbers = AccountNumbers;
  return AccountNumbers.length;
});

export const portfoliosBillingSetLoading = action(isLoading => {
  state.portfoliosBillingLoading = isLoading;
  return isLoading;
});

export const portfoliosBillingAccounts = action(portfolios => {
  let f = toJS(portfolios);
  let AccountNumbers = unique(pluck('AccountNumber')(flatten((pluck('accounts')(f)))));
  state.portfoliosBillingAccountNumbers = AccountNumbers;
});
