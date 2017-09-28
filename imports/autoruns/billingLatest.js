import {
  Meteor
} from 'meteor/meteor';
import {
  observable,
  useStrict,
  action,
  toJS
} from 'mobx';
import autorun, {
  observe
} from 'meteor/space:tracker-mobx-autorun';
import {
  Billings
} from '../api/billings/billings';
import {
  BillingsAggregate
} from '../api/billings/client/billing';
import state from '../stores/mobxstores';
import {
  billingsLatestSetLoading, denormalizeBillings
} from '../actions/billings';
import moment from 'moment';


// Optionally MobX strict mode makes state in the store immutable, in that case
// state can ony be changed by MobX actions, and we only want state to be changed by
//Mobx actions for fine grained control of application state
useStrict(true);





const billingsLatestAutorun = autorun(() => {
  const options = state.portfoliosAccountNumbers;
  const handle = Meteor.subscribe('latestBillingsTotal', toJS(options));
  const handleAgg = Meteor.subscribe('billingsLatestDate', toJS(options));
  const cursor = Billings.find({});
  console.log(cursor.fetch());
  const subLoading = handle.ready();
  const loading = billingsLatestSetLoading(subLoading);
  const cursorAgg = BillingsAggregate.find({});
  console.log(cursorAgg.fetch());
  observe('billingsAutorun', state.billingsLatest, handle, cursor);
  observe('billingsAggregate', state.billingsLatestAggregate, handleAgg, cursorAgg);
  denormalizeBillings(toJS(state.billingsLatest));
}).start();

// Starting autorun on startup or when needed

// Stopping autorun
//TODO: Do I need to stop the autorun?
//portfolioTotalsAutorun().stop();
