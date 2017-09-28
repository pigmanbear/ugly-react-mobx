import {
  Meteor
} from 'meteor/meteor';
import {
  observable,
  useStrict,
  action
} from 'mobx';
import autorun, {
  observe
} from 'meteor/space:tracker-mobx-autorun';
import {
  Portfolios
} from '../api/portfolios/portfolios';
import {
  PortfoliosBilling
} from '../api/portfolios/client/portfolios';
import state from '../stores/mobxstores';
import {
  portfoliosSetLoading,
  portfoliosAccounts
} from '../actions/portfolios';
import R from 'ramda';
import {
  portfoliosBillingSetLoading,
  portfoliosBillingAccounts
} from '../actions/portfolios';

// Optionally MobX strict mode makes state in the store immutable, in that case
// state can ony be changed by MobX actions, and we only want state to be changed by
//Mobx actions for fine grained control of application state
useStrict(true);


const portfolioTotalsAutorun = autorun(() => {
console.log('Autorun commencing');
  const portfolios = state.portfolios;
  const portfoliosBilling = state.portfoliosBilling;
  const options = state.portfoliosOptions;
  const optionsBilling = state.portfoliosBillingOptions;
  const handle = Meteor.subscribe('portfolios', options);
  const handleBilling = Meteor.subscribe('portfoliosbilling', optionsBilling);
  const cursor = Portfolios.find();
  console.log(cursor);
  const cursorBilling = PortfoliosBilling.find();
  observe('portfoliosAutorun', state.portfolios, handle, cursor);
  observe('portfoliosBillings', state.portfoliosBilling, handleBilling, cursorBilling);
  const subLoading = handle.ready();
  const subLoadingBilling = handleBilling.ready();
  const loading = portfoliosSetLoading(subLoading);
  const loadingBilling = portfoliosBillingSetLoading(subLoadingBilling);
  const getAccountNumbers = action(() => {
    portfoliosAccounts(state.portfolios);
    state.portfolioAccountSearchMatches.replace(state.portfolios);
    state.portfoliosCounts = state.portfolios.length;
    portfoliosBillingAccounts(state.portfoliosBilling);
    state.portfoliosAccountBillingSearchMatches.replace(state.portfoliosBilling);
    state.portfoliosBillingCounts = state.portfoliosBilling.length;
  });
  getAccountNumbers();
}).start();


// Starting autorun on startup or when needed



// Stopping autorun
//TODO: Do I need to stop the autorun?
//portfoliosAutorun().stop();
