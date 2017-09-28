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
  limeA700,
  tealA400,
  yellowA700,
  blueA400,
  purpleA400,
  amberA700,
  blueA700,
  redA100,
  limeA200,
  orange400,
  lightGreenA400,
  cyan100,
  tealA200,
  lightBlue400,
  pinkA200

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
import { accountMatchToBillings, sumAccountFee, getPortfolioAccounts, portfolioAllocation } from '../../../modules/calculations';
import { Flex, Box, Grid } from 'reflexbox';
import { Divider, Section, Container, SectionHeader } from 'rebass';
import Paper from 'material-ui/Paper';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend, XAxis, YAxis, BarChart, Bar, CartesianGrid} from 'recharts';
import Subheader from 'material-ui/Subheader';

const COLORS = [pink700,
    lightGreen700,
    blue100,
    indigo200,
    amber400,
    purple500,
    lightBlue500,
    grey800,
    blueA400,
    deepPurple800,
    cyan700,
    limeA700,
    tealA400,
    yellowA700,
    purpleA400,
    blueA400,
    amberA700,
    blueA400,
    purpleA400,
    amberA700,
    blueA700,
    redA100,
    limeA200,
    orange400,
    lightGreenA400,
    tealA200,
    lightBlue400,
    pinkA200
];


const pieToolTipFormatter = (value) => {
return `${numeral(value).format('0.00%')}`;
};
const barToolTipFormatter = (value) => {
return `${numeral(value).format('$0,0.00')}`;
};
const getLabel = v => {
  return (<text x={v.x} y={v.y} fill={v.fill} width={v.width} textAnchor={v.textAnchor} key={v.key}>{numeral(v.value).format('$0,0.00')}</text>);
}

const AccountSegmentPie = observer(['state'],({state}) => { 
return (
state.accountSegmentAllocation.length > 0 ?
<Section style={{padding: '8px'}}>
<SectionHeader heading="Account Allocation" description="By Segment and Class"/>
<Flex wrap justify="space-between" align="center">
<Box col={12} lg={8} md={8}>
    	<BarChart width={600} height={400}  data={toJS(state.accountSegmentAllocation)} layout='vertical' margin={{top: 5, right: 10, left: 15, bottom: 5}}>
  <XAxis type="number" domain={[0, state.accountTableSelected.Details.TotalEmv * 1.15]}/>
  <YAxis dataKey="name" type="category" width={100}/>
      <Tooltip formatter={barToolTipFormatter}/>
       <Bar dataKey="value" fill={orange400} label={getLabel}>
        {toJS(state.accountSegmentAllocation).map((entry, index) => <Cell key={Math.random()} fill={COLORS[index]}/>)}
        </Bar>
      </BarChart>
<Subheader>Segments by Style, Sector</Subheader>
</Box>
<Box col={12} lg={4} md={4}>
    	<PieChart key={Math.random()} width={400} height={400}>
        <Pie key={Math.random()}  data={toJS(state.accountClassAllocation)} legendType='triangle' fill={lightGreen700} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      {toJS(state.accountClassAllocation).map((entry, index) => <Cell key={Math.random()} fill={COLORS[index]}/>)}
        </Pie>
        <Tooltip formatter={pieToolTipFormatter}/>
        <Legend verticalAlign="bottom" margin={{ top: 5, left: 0, right: 0, bottom: 0 }}  height={24}/>
        </PieChart>
<Subheader>Class Allocation</Subheader>
</Box>
</Flex>
</Section> : <div> </div>
);

})

export default AccountSegmentPie;
