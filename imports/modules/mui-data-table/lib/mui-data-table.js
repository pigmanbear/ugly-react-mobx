import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import state from '../../../stores/mobxstores';
import { action, toJS } from 'mobx';


import Paper from 'material-ui/Paper';
import { lightGreen700, grey900, fullWhite, blue100, indigo200, indigo600, amber400, purple500, pink700, lightBlue500, grey50, grey100, darkBlack, lightBlue700} from 'material-ui/styles/colors';

import FilterList from 'material-ui/svg-icons/content/filter-list';
import SearchIcon from 'material-ui/svg-icons/action/search';
import NavigateRight from 'material-ui/svg-icons/image/navigate-next';
import NavigateLeft from 'material-ui/svg-icons/image/navigate-before';
import IconButton from 'material-ui/IconButton';


import injectProp from '../utils/injectProp';
import { hasHtml, extractHtml } from '../utils/handleHtmlProp';
import { hasCustomRender, callCustomRender } from '../utils/handleCustomRender';
import arraySearch from '../utils/search.js';
import Paginate from '../utils/paginate';
import { accountMatchToBillings, sumAccountFee, getPortfolioAccounts , portfolioAllocation, getAccountTransactions} from '../../../modules/calculations';
import R from 'ramda';
import { isNumber,isObject, pluckKeyValues,filterValues, notUndefined, isNotEmpty} from '../../../modules/ramda-utils';


const iconStyleFilter = {
  color: grey900,
  cursor: 'pointer',
  transform: 'translateY(0px) translateX(-45px)',
  
};

const thStyle = {
  overflow: 'ellipsis',
  whiteSpace: 'normal',

};

const tdStyle = {
  paddingLeft: '16px',
  paddingRight: '16px',
  fontSize: '12px'

};
const tdAccountStyle = {
  paddingLeft: '6px',
  paddingRight: '6px',
  fontSize: '13px',
  width: '5%'

};

const searchHeaderColumnStyle = {
  position: 'relative',
  textAlign: 'right',
  marginLeft: '20px',
  marginRight: '40px',
  backgroundColor: purple500,
};


const searchStyle = {
  color: grey50,
  backgroundColor: purple500,
  opacity: 1,
  transitionDuration: '0.6s',
  transitionProperty: 'opacity',
  border: 0,
  outline: 0,
  fontSize: 18,
  width: '100%',
  marginLeft: -22,
  padding: '7px 12px',
  textIndent: 3,
  cursor: 'text'
};


const iconStyleSearch = {
  color: fullWhite,
  position: 'absolute',
  top: '30%',
  opacity: 1,
  marginLeft: '-40px'
};

const navigationStyle = {
  cursor: 'pointer'
};

export default class MuiDataTable extends React.Component {
  constructor(props) {
    super();
    let tableData = props.config.data || [];
    let rowsPerPage = props.config.paginated.constructor === Object ? props.config.paginated.rowsPerPage : 100;

    tableData = props.config.paginated ? new Paginate(tableData).perPage(rowsPerPage) : tableData;

    if (tableData instanceof Paginate) {
      tableData = tableData.page(1);
    }

    this.state = {
      disabled: false,
      style: searchStyle,
      idempotentData: props.config.data,
      paginatedIdempotentData: new Paginate(props.config.data),
      perPageSelection: props.config.paginated.rowsPerPage || 100,
      tableData: tableData,
      searchData: [],
      isSearching: false,
      navigationStyle,
      iconStyleSearch
    };

    this.columns = injectProp(props.config.columns);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.searchData = this.searchData.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
    this.navigateLeft = this.navigateLeft.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);

    }
@action handleCellClick(r, c) {
  if (isNotEmpty(this.state.searchData)) {
    state.portfolioIdTableSelected = this.state.searchData[r].rowNumber;
  } else {
    state.portfolioIdTableSelected = this.state.tableData[r].rowNumber;

  }
  
  state.portfolioAccounts = getPortfolioAccounts(state.portfolioIdTableSelected, toJS(state.portfoliosBilling));
  state.accountTableSelected = state.portfolioAccounts[0];
 
  let billings = accountMatchToBillings(state.accountTableSelected.AccountNumber, toJS(state.billingsLatest));
  if (isNotEmpty(billings)) {
    let billing = R.view(R.lensIndex(0), R.take(1, billings));
    state.accountTableSelectedBilling = R.set(R.lensProp('fee'), sumAccountFee(billings), billing);
  } else {
    state.accountTableSelectedBilling = 0;
  }
  this.chartData();
  this.chartData2();
  this.chartData3();
  this.chartData4();
  this.getAccountBilling();
  state.accountTransactions = getAccountTransactions(state.accountTableSelected);
}

@action chartData () {
let data = portfolioAllocation(toJS(state.portfolioAccounts), 'SegmentAllocation', 'SegmentName','TotalEmv');
let segments = R.keys(data);
let sortByValue = R.sortBy(R.prop('value'));
let build = s => {
    let a = {};
    a.name = s;
    a.value = data[s];
    return a;
};
state.portfolioSegmentAllocation = sortByValue(R.map(build, segments));
};
@action chartData2 (){
let data2 = portfolioAllocation(toJS(state.portfolioAccounts), 'ClassAllocation', 'ClassName','TotalEmv');
let classes = R.keys(data2);
let build2 = s => {
    let a = {};
    a.name = s;
    a.value = data2[s];

    return a;
};
state.portfolioClassAllocation = R.map(build2, classes);
};
@action chartData3 () {
let data3 = portfolioAllocation(toJS(state.accountTableSelected), 'SegmentAllocation', 'SegmentName','TotalEmv');
let segments = R.keys(data3);
let sortByValue = R.sortBy(R.prop('value'));
let build3 = s => {
    let a = {};
    a.name = s;
    a.value = data3[s];
    return a;
};
state.accountSegmentAllocation =  sortByValue(R.map(build3, segments));
};
@action chartData4 (){
  
let data4 = portfolioAllocation(toJS(state.accountTableSelected), 'ClassAllocation', 'ClassName','TotalEmv');
let classes = R.keys(data4);
let build4 = s => {
    let a = {};
    a.name = s;
    a.value = data4[s];
    return a;
};
state.accountClassAllocation = R.map(build4, classes);
};
@action getAccountBilling() {
  let billings = accountMatchToBillings(state.accountTableSelected.AccountNumber, toJS(state.billingsLatest));
  if(isNotEmpty(billings)) {
  let billing = R.view(R.lensIndex(0), R.take(1, billings));
  state.accountTableSelectedBilling = R.set(R.lensProp('fee'), sumAccountFee(billings), billing);
  }else{
      state.accountTableSelectedBilling = 0;
  }
};
@action setDefaults() {
          state.portfolioAccounts = getPortfolioAccounts(state.portfolioIdTableSelected, toJS(state.portfoliosBilling));
          state.accountTableSelected = state.portfolioAccounts[0];
          state.accountTransactions = getAccountTransactions(state.accountTableSelected);
};

componentWillMount() {
    this.setDefaults();
    this.chartData();
    this.chartData2();
    this.chartData3();
    this.chartData4();
    this.getAccountBilling();
}


  handlePerPageChange(evt, index, val) {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;

    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    }

    this.setState({
      tableData: data.perPage(val).page(paginationInfo.currentPage),
      perPageSelection: val
    });
  }


  paginationObject() {
    const res = this.state.tableData[this.state.tableData.length - 1];
    if (!res || !res.paginationInfo) {
      return {
        perPage: 100,
        currentPage: 1,
        previousPage: null,
        nextPage: null,
        currentlyShowing: '0 - 0 of 0',
        isLastPage: true,
        totalNumOfPages: 0,
        total: 0
      };
    }
    res.paginationInfo.perPage = this.state.perPageSelection;
    return res.paginationInfo;
  }

  showPaginationInfo() {
    return this.paginationObject().currentlyShowing;
  }

  navigateRight() {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;
    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    }
    this.setState({
      tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.nextPage)
    });
  }


  navigateLeft() {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;

    if (!paginationInfo.previousPage) return;

    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    } 

    this.setState({
      tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.previousPage)
    });
  }

  mapColumnsToElems(cols) {
    return cols.map((item, index) => (
      <TableHeaderColumn key={index} style={thStyle}>{item.title}</TableHeaderColumn>
    ));
  }


  mapDataToProperties(properties, obj) {
    return properties.map((prop, index) => (
      <TableRowColumn key={index} style={tdStyle}>
        {this.renderTableData(obj, prop)}
      </TableRowColumn>
    ));
  }

  populateTableWithdata(data, cols) {
    const properties = cols.map(item => item.property);

    return data.map((item, index) => {
      if (item.paginationInfo) return undefined;
      return (
        <TableRow key={index} style={tdStyle}>
          {this.mapDataToProperties(properties, item)}
        </TableRow>
      );
    });
  }

  shouldShowItem(item) {
    const styleObj = {
      display: (item ? '' : 'none')
    };
    return styleObj;
  }

  shouldShowMenu(defaultStyle) {
    if (this.props.config.paginated && this.props.config.paginated.constructor === Boolean) return defaultStyle;

    const menuOptions = this.props.config.paginated.menuOptions;

    return menuOptions ? defaultStyle : { display: 'none' };
  }

  toggleOpacity(val) {
  //   return val === 0 ? 1 : 0;
   }

  toggleSearch() {
    const style = Object.assign({}, this.state.style, {});
    const searchIconStyle = Object.assign({}, this.state.iconStyleSearch, {});
    let disabledState = this.state.disabled;

    style.opacity = this.toggleOpacity(style.opacity);
    searchIconStyle.opacity = this.toggleOpacity(searchIconStyle.opacity);

    //disabledState = !disabledState;

    this.setState({
      style,
      iconStyleSearch: searchIconStyle,
      
    });
  }

  searchData(e) {
    const key = this.props.config.search;
    const word = e.target.value;
    const data = this.state.idempotentData;
    let paginationInfo;

    let res = arraySearch(key, word, data);

    this.setState({ searchData: res });

    if (word.length > 0) {
      this.setState({ isSearching: true });
    } else {
      this.setState({ isSearching: false });
    }

    if (this.props.config.paginated) {
      paginationInfo = this.paginationObject();
      res = new Paginate(res).perPage(paginationInfo.perPage).page(1);
    }

    this.setState({
      tableData: res
    });
  }

  renderTableData(obj, prop) {
    const columns = this.columns;

    if (hasCustomRender(prop, columns)) {
      return callCustomRender(prop, columns, obj);
    } else if (obj[prop] && hasHtml(prop, columns)) {

      return (
        <div>
          {obj[prop]}
          {extractHtml(prop, columns)}
        </div>
      );
    } else if (!obj[prop] && hasHtml(prop, columns)) {
      return extractHtml(prop, columns);
    } else if (obj[prop] && !hasHtml(prop, columns)) {
      return obj[prop];
    }

    return undefined;
  }

  setRowSelection(type, obj) {
    const menuOptions = type === 'object' ? obj.menuOptions : [5, 10, 20, 50, 100, 200 ];

    return menuOptions.map((num, index) => (
      <MenuItem value={num} primaryText={num} key={index} />
    ));
  }

  handleRowSelection(obj) {
    if ( obj && obj.constructor === Boolean ) {
      return this.setRowSelection('', obj);
    } else if ( obj && obj.constructor === Object ) {
      return this.setRowSelection('object', obj);
    } else {
      return;
    }
  }

  render() {
    return (
      <Paper zDepth={4}>

        <Table height="250px" onCellClick={this.handleCellClick}>
          <TableHeader>
            <TableRow style={{display: 'contents', backgroundColor: purple500}}>
              <TableHeaderColumn
                colSpan={this.columns.length}
                style={searchHeaderColumnStyle}
              >
                <SearchIcon style={iconStyleSearch} />
                <input
                  type="search"
                  placeholder="Search"
                  style={searchStyle}
                  onKeyUp={this.searchData}
                />
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              {this.mapColumnsToElems(this.columns)}
            </TableRow>
          </TableHeader>

          <TableBody showRowHover stripedRows={true}>
            {this.populateTableWithdata(this.state.tableData, this.columns)}
          </TableBody>

          <TableFooter style={this.shouldShowItem(this.props.config.paginated)}>
            <TableRow>
              <TableRowColumn
                style={{ textAlign: 'right', verticalAlign: 'middle', width: '70%' }}
              >
                <span style={this.shouldShowMenu({ paddingRight: 15 })}>Rows per page:</span>
                <SelectField
                  value={this.state.perPageSelection}
                  style={this.shouldShowMenu({ width: 96, fontSize: 13, top: 0})}
                  onChange={this.handlePerPageChange}
                >
                  { this.handleRowSelection(this.props.config.paginated) }
                </SelectField>
              </TableRowColumn>

              <TableRowColumn style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <span> {this.showPaginationInfo()} </span>
              </TableRowColumn>

              <TableRowColumn style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <NavigateLeft onClick={this.navigateLeft} style={this.state.navigationStyle} />
                <NavigateRight onClick={this.navigateRight} style={this.state.navigationStyle} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>

        </Table>

      </Paper>
    );
  }
}

MuiDataTable.propTypes = {
  config: React.PropTypes.object.isRequired
};
