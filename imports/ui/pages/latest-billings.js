import React from 'react';
import {
  App
} from '../layouts/app';
import R from 'ramda';
import { isNumber,isObject, pluckKeyValues,filterValues, notUndefined} from '../../modules/ramda-utils';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { lightGreen700, fullWhite, blue100, indigo200, amber400, purple500, lightBlue500, grey50, darkBlack, grey100} from 'material-ui/styles/colors';
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
  toJS
} from 'mobx';
import state from '../../stores/mobxstores';
import BillingsLatestTableList  from '../containers/billings/latest-billings';
import { PageHeader } from 'rebass';
import { getLatestUpdatedBillingDate } from '../../modules/calculations';
import moment from 'moment';

const BillingsView = observer(['state'],({state}) => {
  return(<App>
    <PageHeader
          description="With Portfolio and Account Details"
          heading="Latest Monthly Billings" 
          style={{margin:'15px'  , marginTop: '5px', }}
        />
  <BillingsLatestTableList />
  </App>)
});
export default BillingsView;