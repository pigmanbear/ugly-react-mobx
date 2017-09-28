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
  blueGrey50,
  grey800,
  pink700,
  deepPurple800,
  cyan700,
  limea300,
  tealA400,
  yellowA200,
  darkBlack
} from 'material-ui/styles/colors';
import numeral from 'numeral';
import FontIcon from 'material-ui/FontIcon';
import {
  Alert, Row, ListGroupItem, ListGroup
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
import { accountMatchToBillings, sumAccountFee, getPortfolioAccounts, portfolioAllocation, getAccountTransactions } from '../../../modules/calculations';
import { Flex, Box, Grid } from 'reflexbox';
import { Section, SectionHeader, Space} from 'rebass';
import Paper from 'material-ui/Paper';
import moment from 'moment';

const COLORS = [ lightGreen700,
  blue100,
  indigo200,
  amber400,
  purple500,
  lightBlue500,
  blueGrey50,
  grey800,
  pink700,
  deepPurple800,
  cyan700,
  limea300,
  tealA400,
  yellowA200];




const AccountTransactions = observer(['state'],({state}) => { 


return (

 <Box   
        col={12}
        lg={12}
        md={12}
        sm={12}
        p={0}
        m={0}
        align="center"
        auto
          >
<SectionHeader heading="Recent Transactions" description="Marked as Management Fee" style={{padding: '4px'}} />
{state.accountTransactions.length > 0 ?
   toJS(state.accountTransactions).map((t) => (     
    <ListGroup key={Math.random() }>
    <ListGroupItem key={Math.random() } header={t.TransactionType}>
    {numeral(t.MarketValue).format('$0,0.00') }    
    <span style={{color: darkBlack}}>        Last Update:
    {moment(t.SettleDate).format("dddd, MMMM Do YYYY")}</span></ListGroupItem>
  </ListGroup>
)
) : <Alert bsStyle="info">No recent Fee Transactions</Alert>}
</Box>)});

export default AccountTransactions;
