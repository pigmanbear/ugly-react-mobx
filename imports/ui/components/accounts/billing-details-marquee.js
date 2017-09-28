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
  deepPurple500,
  grey50,
  grey100,
  blueGrey50,
  grey800,
  pink700,
  redA400,
  cyanA200,
  lightBlue900,
  purpleA400,
  cyan700,
  orange800
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
import BillingAccountsList from './billing-display-list';
//import BillingAccountsListDetails from './billing-account-list-details';
import { accountMatchToBillings, sumAccountFee, getPortfolioAccounts } from '../../../modules/calculations';
import { Flex, Box, Grid } from 'reflexbox';
import Paper from 'material-ui/Paper';
import { Stat, Section } from 'rebass';
import AccountSegmentPie  from './segment-chart';
import PortfolioSegmentPie from '../portfolios/segment-chart';
import AccountTransactions from './billings-details-transactions';


const BillingsDisplay = observer(['state'],({state}) => {
return (
 R.isEmpty(toJS(state.accountTableSelected)) ? 
<div>Loading Account Information . . .</div> :
  <div style={{marginTop: '10px'}}>
  <Flex 
    wrap
    justify="center" 
    align="flex-start">
      <Box
        col={12}
        lg={4}
        md={4}
        sm={12}
        >
       <BillingAccountsList />
      </Box>

      <Box   
        col={12}
        lg={6}
        md={6}
        sm={6}
        px={3}
        py={1}
        mx={3}
        align="center"
          >

          <Box         
            px={0}
            py={1}
            mx={1}
          >
            <Stat

              style={{color: pink700}}
              label="Fee"
              value={numeral(state.accountTableSelectedBilling.fee).format('$0,0.00')}
            />
          </Box>
           <Box         
            px={0}
            py={1}
            mx={1}
          >         
            <Stat
              style={{color: deepPurple500}}
              label="Billed Value" 
              value={numeral(state.accountTableSelectedBilling.billedValue).format('$0,0.00')}
            /> 
          </Box>
         <Box         
            px={0}
            py={1}
            mx={1}
          >  
           <Stat   
              label="Account Value" 
              value={numeral(state.accountTableSelectedBilling.accountValue).format('$0,0.00')}
            />        
          </Box>
          <Box         
            px={0}
            py={1}
            mx={1}
          >
          <h4>Account Number:  <span style={{color: cyan700}}> {state.accountTableSelectedBilling.accountNumber} </span> </h4> 
          {state.accountTableSelectedBilling.accountNumber !== state.accountTableSelectedBilling.billingAccount ? 
          <h4>Billing Account: <span style={{color: orange800}}> {state.accountTableSelectedBilling.billingAccount} </span></h4> : ''}
          <h4>Fee Schedule: {state.accountTableSelectedBilling.feeSchedule}</h4>
          </Box>
          
          <AccountTransactions /> 

          </Box>

          
            <AccountSegmentPie />
            <PortfolioSegmentPie />
              </Flex>
</div>

);

})

export default BillingsDisplay;