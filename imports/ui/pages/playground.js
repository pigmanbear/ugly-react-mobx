import React from 'react';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import {
  App
} from '../layouts/app';
import Toggle from 'material-ui/Toggle';
import FontIcon from 'material-ui/FontIcon';
import { lightGreen50,blueGrey50, grey50, grey900 } from 'material-ui/styles/colors';
import TotalsPaperComponent  from '../containers/advisor-totals';
import Paper from 'material-ui/Paper';
import { GridList } from '../components/table-list';
import  SmartTable  from '../components/material-ui-sortable-table/SmartTable/SmartTable';
import {Meteor } from 'meteor/meteor';
import { Mobx }  from './mobx-example';
import  MuiDataTable from '../../modules/mui-data-table/lib/mui-data-table';

export class Playground extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.isLoading = true;
  }

  componentDidMount() {
    Meteor.setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

    render() {
        const iconStyles = {
          marginRight: 24,
          fontSize: 36,
        };
        const style = {
          // height: 200,
          width: '100%',
          margin: 10,
          display: 'inline-block',
          padding: 30,
          backgroundColor: blueGrey50,
        };
        const tableHeaders = [
  { alias: 'Name', sortable: true, dataAlias: 'name', format: { type: 'link', url: 'http://someurl' } },
  { alias: 'Status', sortable: true, dataAlias: 'status', format: { type: 'status' } },
  { alias: 'Birth Date', sortable: true, dataAlias: 'birth_date', format: { type: 'date' } }
        ];
        const data = [
  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },
  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' },  { name: "John", status: "Single", birth_date: '1 Jan 1966' },
  { name: "David", status: "Married", birth_date: '5 Feb 1914' }
];
const data2 = [
  { id: 1, name: 'Chikwa Eligson', age: 24, location: 'Lagos', level: 'stage-1', mood: 'happy' },
  { id: 2, name: 'Bamidele Johnson', age: 18, location: 'Anambra', level: 'stage-4', mood: 'anxious' },
  { id: 3, name: 'John Lee', age: 20, location: 'Abuja', level: 'stage-2', mood: 'indifferent' },
  { id: 4, name: 'Binta Pelumi', age: 22, location: 'Jos', level: 'stage-3', mood: 'sad' },
  { id: 5, name: 'Cassidy Ferangamo', age: 30, location: 'Lagos', level: 'stage-4', mood: 'angry' },
  { id: 6, name: 'Damian Swaggbag', age: 35, location: 'PortHarcourt', level: 'stage-1', mood: 'bitter' },
  { id: 7, name: 'Loveth Sweetstick', age: 20, location: 'Imo', level: 'stage-3', mood: 'happy' },
  { id: 8, name: 'Zzaz Zuzzi', age: 19, location: 'Bayelsa', level: 'stage-2', mood: 'party-mood' },
  { id: 9, name: 'Ian Sweetmouth', age: 18, location: 'Enugu', level: 'stage-4', mood: 'happy' },
  { id: 10, name: 'Elekun Bayo', age: 21, location: 'Zamfara', level: 'stage-4', mood: 'anxious' },
];
const config = {
  paginated: true,
  search: 'name',   
  data: data2,
  columns: [
    { property: 'id', title: 'S/N'},
    { property: 'name', title: 'Name' },
    { property: 'age', title: 'Age' },
    { property: 'location', title: 'Location' },
    { property: 'level', title: 'level' },
    { property: 'mood' , title: 'Mood', renderAs: function (data) {
      return `${data.name} is in a ${data.mood} mood.`;
    }},
  ]
};
const isLoading =  false;
      return (
        <App>
<GridList />

 <SmartTable { ...{tableHeaders, data, limit: 20, total: data.length, isLoading } } />
 <br />
<Mobx />
<br />
        <MuiDataTable config={config} />
        </App>
        );
      }
    }