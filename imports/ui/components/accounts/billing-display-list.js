import React from 'react';
import R from 'ramda';
import { isNumber,isObject, pluckKeyValues,filterValues, notUndefined, isNotEmpty } from '../../../modules/ramda-utils';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { lightGreen700, fullWhite, blue100, indigo200, indigo600, amber400, purple500, pink700, indigo900, lightBlue500, grey50, grey100,blueGrey100, grey900, grey600, blueGrey50, darkBlack, lightBlue700} from 'material-ui/styles/colors';
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
import state from '../../../stores/mobxstores';
import { accountMatchToBillings, sumAccountFee, getPortfolioAccounts, portfolioAllocation, getAccountTransactions } from '../../../modules/calculations';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

const iconStyles = {
  marginRight: 10,
};
const nonBillableAvatarStyle = {

};

const avatarStyle = {margin: 5, color: fullWhite};

const listItemStyle = { paddingLeft: 110};


const getAccountBilling = action(() => {
  let billings = accountMatchToBillings(state.accountTableSelected.AccountNumber, toJS(state.billingsLatest));
  if(isNotEmpty(billings)) {
  let billing = R.view(R.lensIndex(0), R.take(1, billings));
  state.accountTableSelectedBilling = R.set(R.lensProp('fee'), sumAccountFee(billings), billing);
  }else{
      state.accountTableSelectedBilling = 0;
  }
});


const getBillingInformation = R.memoize(account => {
  let billings = accountMatchToBillings(toJS(account.AccountNumber), toJS(state.billingsLatest));
  let billing = R.view(R.lensIndex(0), R.take(1, billings));
  let a = {};

  if (R.isNil(billing)) return a;
  a.type = (R.toLower(billing.billingGroup).trim() === 'arrears' ? 'AR' : 'AD');
  a.schedule = (R.toLower(billing.billingSchedule).trim() === 'quarterly' ? 'Q' : 'M');
  a.updatesHistory = (R.view(R.lensIndex(0), R.takeLast(1, (R.view(R.lensProp('updatesHistory'), billing)))));
  a.feeSchedule = (billing.feeSchedule ? billing.feeSchedule : 'Non-billable');
  a.fee = sumAccountFee(billings);
  return a;
});

chartData3 = action(() => {
let data = portfolioAllocation(toJS(state.accountTableSelected), 'SegmentAllocation', 'SegmentName','TotalEmv');
let sortByValue = R.sortBy(R.prop('value'));
let accountTotal = toJS(state.accountTableSelected).Details ? toJS(state.accountTableSelected).Details.TotalEmv : 1;
let segments = R.keys(data);
let build = s => {
    let a = {};
    a.name = s;
    a.value = data[s];
    return a;
};
state.accountSegmentAllocation = sortByValue(R.map(build, segments));
});
chartData4 = action(() => {

let data2 = portfolioAllocation(toJS(state.accountTableSelected), 'ClassAllocation', 'ClassName','TotalEmv');
let classes = R.keys(data2);
let accountTotal = toJS(state.accountTableSelected).Details ? toJS(state.accountTableSelected).Details.TotalEmv : 1;
let build2 = s => {
    let a = {};
    a.name = s;
    a.value = data2[s]/(accountTotal);
    return a;
};
state.accountClassAllocation = R.map(build2, classes);
});
const getNewTransactions = action(() => {
          state.accountTransactions = getAccountTransactions(state.accountTableSelected);
});

const handleAccount = action((account) => {
state.accountTableSelected = account;

getAccountBilling();
chartData3();
chartData4();
getNewTransactions();

});

const BillingAccountsList = observer(['state'], ({
      state
    }) => {

return (
 state.portfolioAccounts.length >  0 ?
  <div key= {Math.random()} >
    <Paper key= {Math.random()} zDepth={3}>
    <List key= {Math.random()} >
    <Subheader style={{color: blueGrey50, backgroundColor: lightGreen700, padding: 0}} className="text-center">Household Accounts </Subheader>
    {state.portfolioAccounts.map(account => {
        let acct = getBillingInformation(account);
        return (
        <ListItem key =  {Math.random()} innerDivStyle={listItemStyle}
            leftAvatar={isNotEmpty(acct) ? 
                <div key= {Math.random()} >
                <Avatar
                 backgroundColor={acct.type === 'AD' ? purple500 : indigo600}
                 style={avatarStyle}
                 size={30}
                 key= {Math.random()} 
                >
                {acct.type}
                </Avatar>

                <Avatar
                 backgroundColor={acct.schedule === 'M' ? lightBlue700 : pink700}
                 size={30}
                 style={avatarStyle}
                 key= {Math.random()} 
                >
                {acct.schedule}
                </Avatar>
                </div>
                :
                <div key= {Math.random()} >
                <Avatar
                 style={avatarStyle}
                 size={30}
                 key= {Math.random()} 
                >
                NB
                </Avatar>
                <Avatar
                 style={avatarStyle}
                 size={30}
                 key= {Math.random()} 
                >
                NB
                </Avatar>
                </div>
            }
            primaryText={account.Name}
            secondaryText={
                <div key= {Math.random()} >
                <span style={{color: indigo900, fontWeight: 'bolder' }}> Total Fee: {numeral(acct.fee).format('$0,0.00')}</span>
                <p key= {Math.random()} ><span>
                 Last Updated: {acct.updatesHistory ? moment(acct.updatesHistory.at).format("dddd, MMMM Do YYYY") 
                 : 'No Information to Display'}</span>
                </p>
                </div>
           }
            secondaryTextLines={2}
            onClick={() => handleAccount(account)}
           />
       )
    })}
</List>
</Paper>
</div> 
:
<Alert  key= {Math.random()}  bsStyle="warning">No Accounts in Household.</Alert>
)
    });

export default BillingAccountsList;
                    
