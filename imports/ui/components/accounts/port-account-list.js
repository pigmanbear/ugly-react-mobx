import React from 'react';
import R from 'ramda';
import { isNumber,isObject, pluckKeyValues,filterValues, notUndefined} from '../../../modules/ramda-utils';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { lightGreen700, fullWhite, blue100, indigo200, amber400, purple500, lightBlue500, grey50, grey100} from 'material-ui/styles/colors';
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
import Avatar from 'material-ui/Avatar';


const iconStyles = {
  marginRight: 10,
};
const getFee = action((acct)=> {
let accountMatch = R.whereEq({accountNumber: acct.AccountNumber});
let accountFees = filterValues(accountMatch, toJS(state.billingsLatest));
return R.sum(filterValues(isNumber, pluckKeyValues('fee', accountFees)));
});


const  SimpleAccountList = observer(['state'], ({state, accounts, iconColor}) => {
return (

accounts.length > 0 ? 
<div>
    {accounts.map((account) => ( 
    
    <div key = {Math.random() }>
    <List key = {account.Id }> 
    <ListItem 
                      primaryText={account.Name} 
                      secondaryText={<div>Last Billing: {numeral(getFee(account)).format('$0,0.00')}</div>}
                      leftIcon={<FontIcon className="fa fa-user" color={iconColor} style={iconStyles}/>} 
                      initiallyOpen={false}
                      primaryTogglesNestedList={true} 
                      nestedItems={([ 
                      <ListItem
                        key = {Math.random() }
                        primaryText={<div>Account Value: {account.Details ? numeral(account.Details.TotalEmv).format('$0,0.00') : numeral(0).format('$0,0.00')}  </div>} 
                        leftIcon={<FontIcon className="fa fa-usd" style={iconStyles}/>} 
                        />,
                      <ListItem
                         key= {Math.random() }
                         primaryText={<div>Account Number: {account.AccountNumber} </div>}
                         leftIcon={<FontIcon className="fa fa-info-circle" style={iconStyles}/>} 
                      />,    
                      (_.isArray(account.Targets) ? ( account.Targets.length > 0 ? 
                      acccounts.Targets.map(target => {
                      <ListItem
                           key= {Math.random() }
                           primaryText= {target.Name}
                           secondaryText = {target.Description ? target.Description : 'No Description Provided'}
                           leftIcon={<FontIcon className="fa fa-pie-chart" style={iconStyles} />} 
                       />})
                        : <ListItem
                           key= {Math.random() }
                           primaryText= "No Targets Defined For Account."
                           leftIcon={<FontIcon className="fa fa-pie-chart" style={iconStyles}/>} 
                      />
                      ) :
                        <ListItem
                           key= {Math.random() }
                           primaryText= "No Targets Defined For Account."
                           leftIcon={<FontIcon className="fa fa-pie-chart" style={iconStyles}/>} 
                      /> )])}
    />
    </List>
    <Divider key = {Math.random() }inset={true}/>
    </div>
    ))
  }

</div>   
:
<Alert bsStyle="warning">No Accounts in Household.</Alert> 
)
    });

export default SimpleAccountList;
                    