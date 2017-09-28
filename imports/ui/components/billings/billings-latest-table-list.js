import React from 'react';
import R from 'ramda';
import {
  isNumber,
  isObject,
  pluckKeyValues,
  filterValues,
  notUndefined,
  isNotEmpty
} from '../../../modules/ramda-utils';
import {
  List,
  ListItem
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {
  lightGreen700,
  fullWhite,
  blue100,
  indigo200,
  amber400,
  purple500,
  lightBlue500,
  grey50,
  grey100
} from 'material-ui/styles/colors';
import numeral from 'numeral';
import FontIcon from 'material-ui/FontIcon';
import {
  Alert
} from 'react-bootstrap';
import {
  propTypes,
  observer
} from 'mobx-react';
import {
  action,
  toJS,
  observable
} from 'mobx';
import state from '../../../stores/mobxstores';
import MuiDataTable from '../../../modules/mui-data-table/lib/mui-data-table';
import { Loading } from '../../components/loading';
import { billingTotal, portfoliosTotal } from '../../../modules/calculations';
import BillingsDisplay from '../../components/accounts/billing-details-marquee';

const configureTableData = action(() => {
  let tdHolder =[];
  state.portfoliosBilling.map((p) => {
    if (notUndefined(p.accounts)) {
      let bd = {
        portfolioName: p.Name,
        totalPortfolioBilledValue: billingTotal(toJS(p), toJS(state.billingsLatest), 'billedValue'),
        totalPortfolioValue: billingTotal(toJS(p), toJS(state.billingsLatest), 'accountValue'),
        totalPortfolioFee: billingTotal(toJS(p), toJS(state.billingsLatest)),
        totalPortfolioAccounts: p.accounts.length,
        rowNumber: p._id,
      };
      tdHolder.push(bd);
      if (R.isNil(state.portfolioIdTableSelected)) state.portfolioIdTableSelected = p._id;
    }
  });
  state.billingsLatestTableData.replace(tdHolder);
});

const config = action(() => {
  configureTableData();
  let tableOptions = state.billingsLatestTableConfig;
  tableOptions.data.replace(state.billingsLatestTableData);
  tableOptions.paginated = true;
  tableOptions.search = 'portfolioName';
  return tableOptions;
});

const BillingsLatestTableList = observer(['state'], ({
  state
}) => {
  return ( state.portfoliosBilling.length > 0 ? 

    <div>
          <MuiDataTable config={config()} />
    <BillingsDisplay />

    </div>
    :
    <div>
      <Loading />
    </div>

  );

});
export default BillingsLatestTableList;
