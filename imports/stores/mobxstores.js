import {
  observable
} from 'mobx';
import numeral from 'numeral';
import React from 'react';
import Badge from 'material-ui/Badge';

export default observable({

  //APP UI State
  drawerState: false,


  //Accounts
  accountId: null,
  acountIdSelected: null,
  accountTableSelected: {},
  accountTableSelectedBilling: {},
  accountSegmentAllocation: [],
  accountClassAllocation:[],
  accountTransactions:[],

  accountListState: null,
  accountsCounts: null,
  accountsLoading: null,
  accountTargets: [],

  //Advisors
  advisorId: null,
  advisors: [],
  advisorsIds: [],
  advisorsSearch: null,
  advisorsSearchState: null,

  //Billings
  billingDate: null,
  billingDates: [],
  billingsDates: [],
  billingOptions: {
    fields: {
      'fee': 1,
      'accountNumber': 1,
    }

  },

  billingsLatestTableSearchTerm: null,
  billingsLatestTableSearchOptions: [],
  billingsLatestTableData: [],
  billingNewFormSavingLastError: null,
  billingNewFormStatus: null,
  billingsLatest: [],
  billingsLatestAggregate: [],
  billingsLatestTotals: null,
  billingsLatestDate: null,
  billingsLatestLoading: null,
  billingsLatestTableConfig: {
    paginated: null,
    search: null,
    data: [],
    columns: [{
      property: 'portfolioName',
      title: 'Household'
    }, {
      property: 'totalPortfolioValue',
      title: 'Total Household Value',
      renderAs: function (data) {
        return `${numeral(data.totalPortfolioValue).format('$0,0.00')}`;
      }
    }, {
      property: 'totalPortfolioBilledValue',
      title: 'Billed Household Value',
      renderAs: function (data) {
        return `${numeral(data.totalPortfolioBilledValue).format('$0,0.00')}`;
      }
    }, {
      property: 'totalFee',
      title: 'Total Household Fee',
      renderAs: function (data) {
        return `${numeral(data.totalPortfolioFee).format('$0,0.00')}`;
      }
    }, {
      title: 'Annualized Portfolio Yield',
      renderAs: function (data) {
        return `${numeral((data.totalPortfolioBilledValue > 0  ? (12*data.totalPortfolioFee)/data.totalPortfolioBilledValue : 0)).format('0.000%')}`;
      }
    }, ],
    sort: null,
    filter: []
  },

  //Portfolios
  portfolioSegmentAllocation: [],
  portfolioClassAllocation: [],
  portfolioIdTableSelected: null,
  portfolioAccountSearchState: null,
  portfolioAccountSearchMatches: [],
  portfolioAccountSearch: '',
  portfolioAccountNumbers: [],
  portfolioAccounts: [],
  portfoliosCardToggle: false,
  portfoliosCurrentPage: 1,
  portfolioNewFormStatus: null,
  portfolioNewSavingLastError: null,
  portfolios: [],
  portfoliosAccountNumbers: [],
  portfoliosCounts: null,
  portfoliosLoading: null,
  portfolioAccountBillingSearchState: null,
  portfolioAccountBillingSearchMatches: [],
  portfolioAccountBillingSearch: '',
  portfolioAccountBillingNumbers: [],
  portfolioAccountBillings: [],
  portfoliosBillingCardToggle: false,
  portfoliosBillingCurrentPage: 1,
  portfolioBillingNewFormStatus: null,
  portfolioBillingNewSavingLastError: null,
  portfoliosBilling: [],
  portfoliosBillingAccountNumbers: [],
  portfoliosBillingCounts: null,
  portfoliosBillingLoading: null,
  portfoliosAccountBillingSearchMatches: [],
  portfoliosBillingPaginationOptions: {
    limit: 8,
    sort: 1,

  },
  portfoliosPaginationOptions: {
    limit: 8,
    sort: 1,

  },

  portolioId: null,
  portfoliosOptions: {
    sort: {
      Name: 1
    },
    fields: {
      'Name': 1,
      'accounts.AccountNumber': 1,
      'accounts.Details.TotalEmv': 1,
      'accounts.Targets': 1,
      'accounts.Name': 1
    }
  },
  portfoliosBillingOptions: {
    sort: {
      Name: 1
    },
    fields: {
      'Name': 1,
      'accounts.AccountNumber': 1,
      'accounts.Details.TotalEmv': 1,
      'accounts.Targets': 1,
      'accounts.Name': 1,
      'accounts.SegmentAllocation': 1,
      'accounts.Transactions': 1,
      'accounts.ClassAllocation': 1,
      'accounts.Id': 1,
    }
  },
});

// // noprotect
//  portfoliosTotalsOptions: {
//     fields: {
//       'accounts.AccountNumber': 1,
//       'accounts.Details.TotalEmv': 1,
//     }
//   },
//  portfoliosTotals: null,
//   portfoliosTotalsIds: [],
//   portfoliosTotalsLoading: null,
//   portfoliosTotalsAccountNumbers: [],
// // import mobx from 'mobx';
// // import mobxReact from 'mobx-react';
// // import React from 'react';
// import DevTools from 'mobx-react-devtools';


// const {observable, computed, action, transaction, useStrict, extendObservable, asMap, when, autorun} = mobx;
// const {observer, Provider} = mobxReact;
// const {Component} = React;


// const APPID = "6c9bb64443d124019b41ea00de26732e";

// class Temperature {
//   id = Math.random();
//   @observable unit = "C";
//   @observable temperatureCelsius = 25;
//   @observable location = "Amsterdam, NL";
//   @observable loading = true;

//   constructor(location) {
//     this.location = location
//     this.fetch()
//   }

//   @action fetch() {
//      window.fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${APPID}&q=${this.location}`)
//     .then(res => res.json()
//     .then(action(json => {
//       this.temperatureCelsius = json.main.temp -273.15
//       this.loading = false
//     })))
//   }

//   @computed get temperatureKelvin() {
//     console.log("calculating Kelvin")
//     return (this.temperatureCelsius * (9/5) + 32);
//   }

//   @computed get temperatureFahrenheit() {
//     console.log("calculating Fahrenheit")
//     return this.temperatureCelsius + 273.15
//   }

//   @computed get temperature() {
//     console.log("calculating temperature")
//     switch(this.unit) {
//       case "K": return this.temperatureKelvin + "ºK"
//       case "F": return this.temperatureFahrenheit + "ºF"
//       case "C": return this.temperatureCelsius + "ºC"
//     }
//   }

//   @action setUnit(newUnit) {
//     this.unit = newUnit;
//   }

//   @action setCelsius(degrees) {
//     this.temperatureCelsius = degrees;
//   }

//   @action("update temperature and unit")
//   setTemperatureAndUnit(degrees, unit) {
//     this.setCelsius(degrees);
//     this.setUnit(unit);
//   }

//   @action inc() {
//     this.setCelsius(this.temperatureCelsius + 1)
//   }
// }

// const MobXApp = observer(
//   ["temperatures"],
//   ({ temperatures }) => (
//   <ul>
//     <TemperatureInput />
//     {temperatures.map(t =>
//       <TView key={t.id} temperature={t} />
//     )}
//     <DevTools />
//   </ul>
// ))

// @observer(["temperatures"])
// class TemperatureInput extends React.Component {
//   @observable input = "";

//   render() {
//     return (
//       <li>
//         Destination
//         <input onChange={this.onChange}
//                value={this.input}
//         />
//         <button onClick={this.onSubmit}>Add</button>
//       </li>
//     )
//   }

//   @action onChange = (e) => {
//     this.input = e.target.value
//   }

//   @action onSubmit = () => {
//     this.props.temperatures.push(
//       new Temperature(this.input)
//     )
//     this.input = ""
//   }
// }

// @observer class TView extends React.Component {
//   render() {
//     const t = this.props.temperature
//     return (
//       <li onClick={this.onTemperatureClick}
//       >
//         {t.location}:
//         {t.loading ? "loading.." : t.temperature}
//       </li>
//     )
//   }

//   @action onTemperatureClick = () => {
//     this.props.temperature.inc()
//   }
// }

// /// index file
// const temps = observable([])

// export const Mobx = () => (
//   <Provider temperatures={temps}>
//     <MobXApp />
//   </Provider>
// );
