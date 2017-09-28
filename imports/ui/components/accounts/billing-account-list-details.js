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
  grey100,
  pink700,
  blueGrey50,
  grey800,
} from 'material-ui/styles/colors';
import numeral from 'numeral';
import FontIcon from 'material-ui/FontIcon';
import {
  Alert, Row
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
import { Flex, Box, Grid } from 'reflexbox';
import Paper from 'material-ui/Paper';
import { Stat } from 'rebass';
const style = {
  paper: {
    backgroundColor: grey800,
  }
};

const BillingAccountsListDetails= observer(['state'],({state}) => {

return (



);
})

export default BillingAccountsListDetails;