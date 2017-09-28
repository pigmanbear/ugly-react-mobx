import R from 'ramda';
import {
  isNumber,
  isObject,
  pluckKeyValues,
  filterValues,
  notUndefined,
  isNotEmpty
} from './ramda-utils';
import moment from 'moment';
import {
  toJS,
  action
} from 'mobx';

//Pass in Complete Portfolio Object to Calculate Portfolio Total Assets 
export const portfolioTotal = action(accounts => {
  if (R.isNil(accounts)) return 0;
  let details = filterValues(notUndefined, pluckKeyValues('Details', accounts));
  if (isObject(details)) {
    return R.sum(filterValues(isNumber, pluckKeyValues('TotalEmv', details)));
  } else {
    return 0;
  }
});
//Calculates Total Billing based on CURRENT accounts associated witn portfolio
export const billingTotal = action((portfolio, billings, k = 'fee') => {
  if (R.isNil(portfolio.accounts)) return 0;
  let accountBillings = getAccountBillings(getPortfolioAccountNumbers(portfolio.accounts), billings);
  if (isNotEmpty(accountBillings)) {
    return billingsTotal(accountBillings, k);
  } else {
    return 0;
  }
});
//Calculates Total Assets For an Array of Portfolio Objects
export const portfoliosTotal = action((portfolios) => {
  let accounts = getAllAdvisorAccounts(portfolios);
  if (isObject(accounts) && accounts.length > 0) {
    return portfolioTotal(accounts);
  } else {
    return 0;
  }
});
//Calculates Total Billing for array of Billings based CURRENT associated accounts
export const billingsTotal = action((billings, k = 'fee') => {
  let value = filterValues(notUndefined, pluckKeyValues(k, billings));
  if (isObject(value) && value.length > 0) {
    return R.sum(filterValues(isNumber, value));
  } else {
    return 0;
  }
});
//Find portfolio from portfolioID and list of portfolios, return first match , return accounts
export const getPortfolioAccounts = (portfolioId, portfolios) => filterValues(notUndefined, (R.view(R.lensProp('accounts'), R.find(R.propEq('_id', portfolioId))(portfolios))));
//Pass in Array of Portfolios to get a Flattened array of Account Objects 
export const getAllAdvisorAccounts = portfolios => R.uniq(R.flatten(filterValues(notUndefined, pluckKeyValues('accounts', portfolios))));
//Pass in Portfolio Objects to get a Flattened array of Account Numbers
export const getPortfolioAccountNumbers = accounts => R.uniq(R.flatten(filterValues(notUndefined, pluckKeyValues('AccountNumber', accounts))));
//Pass in Account Numbers, Billings And Return All Billings Objects matching the account numbers, returns array
export const getAccountBillings = (accountNums, billings) => R.flatten(filterValues(isNotEmpty, R.map(accountMatchToBillings(R.__, billings), accountNums)));
//Filter fo find account in billings array, returns array of billing objects
export const accountMatchToBillings = R.curry((a, billings) => {
  return filterValues(g(a), billings);
});
//Filter for matching account number to object
const g = a => R.whereEq({
  accountNumber: a
});
///////////////////
export const getAccountFee = (acct) => {
  let accountFees = filterValues(accountMatch, toJS(state.billingsLatest));
  return R.sum(filterValues(isNumber, pluckKeyValues('fee', accountFees)));
};
///////////////////
export const sumAccountFee = acctBillings => R.sum(filterValues(isNumber, pluckKeyValues('fee', acctBillings)));
//Calculate both Segment and Class Allocation
export const portfolioAllocation = (aggtee, prop, keyValue, emvType = 'TotalEmv') => {
  let accounts = R.is(Array, aggtee);
  let toBeReduced;
  if (accounts) { //Array of Accounts, Portfolio Totals
    toBeReduced = R.flatten(R.pluck([prop], aggtee));
  } else { //Single Account, Account Totals
    toBeReduced = aggtee[prop];
  }
  if (R.isNil(toBeReduced)) return [];
  let keyFn = obj => obj[keyValue];
  let reducedByEmvType = R.reduceBy((acc, s) => acc.concat(s[emvType]), [], keyFn, filterValues(notUndefined, toBeReduced));
  let sumEmvTypeByKeyValueForProp = (num, key, obj) => R.sum(num);
  return R.mapObjIndexed(sumEmvTypeByKeyValueForProp, reducedByEmvType);
};
///////////////////
export const getLatestUpdatedBillingDate = billings => {
  let billingDates = R.flatten(pluckKeyValues('updatesHistory', billings));
  if (isNotEmpty(billingDates)) {
    let isoToEpoch = R.pipe(moment, R.invoker("valueOf"));
    return R.reduce(R.maxBy(R.pipe(R.prop("at"), isoToEpoch), {
      at: "0"
    }, billingDates));
  } else {
    return 0;
  }
};
//////////////////
export const getAccountTransactions = accounts => {
  let arrTest = R.is(Array, accounts);
  let toBeReduced;
  if (arrTest) { //Array of Accounts, Portfolio Totals
    toBeReduced = R.flatten(R.pluck(['Transactions'], accounts));
  } else { //Single Account, Account Totals
    toBeReduced = accounts.Transactions;
  }
  if (R.isNil(toBeReduced)) return [];
  const trmf = R.whereEq({
    TransactionType: 'Management Fee'
  });
  let manTrans = filterValues(trmf, toJS(toBeReduced));
  return R.take(3, filterValues(notUndefined, manTrans));
};
