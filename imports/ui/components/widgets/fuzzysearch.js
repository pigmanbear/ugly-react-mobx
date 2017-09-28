import fuzzysearch from 'fuzzysearch';
import TextField from 'material-ui/TextField';
import {
  propTypes,
  observer,
} from 'mobx-react';
import {
  action,
  toJS,
  observable
} from 'mobx';
import React, {
  PropTypes
} from 'react';
import state from '../../../stores/mobxstores';
import R from 'ramda';
import IconButton from 'material-ui/IconButton';


//TODO Refactor to make generic
const search = action((evt) => {
  const searchTerm = evt.target.value.toLowerCase();
  state.portfolioAccountSearch = evt.target.value.toLowerCase();
  if (!searchTerm || searchTerm === '') {
    state.portfolioAccountSearchMatches.replace(state.portfolios);
    state.portfoliosCounts = state.portfolios.length;
    return;
  }
  state.portfoliosCurrentPage = 1;
  state.portfolioAccountSearchMatches.clear();
  state.portfoliosCounts = state.portfolioAccountSearchMatches.length;
  //const searchIndex = index;
  const func = p => {
    let pushP = false;
    if (fuzzysearch(searchTerm, p.Name.toLowerCase())) {
      state.portfolioAccountSearchMatches.push(p);
      state.portfoliosCounts = state.portfolioAccountSearchMatches.length;
      return;
    } else {
      p.accounts.map(a => {
        if (fuzzysearch(searchTerm, a.Name.toLowerCase()) || fuzzysearch(searchTerm, a.AccountNumber)) {
          pushP = true;
          return;
        }
      });
      if (pushP) {
        state.portfolioAccountSearchMatches.push(p);
        state.portfoliosCounts = state.portfolioAccountSearchMatches.length;
      }
    }
  };
  R.forEach(func, toJS(state.portfolios));
});
const clearSearch = action((evt) => {
  state.portfolioAccountSearch = '';
  state.portfolioAccountSearchMatches.replace(state.portfolios);
  state.portfoliosCounts = state.portfolios.length;
});
const iconButtonStyles = {
  marginLeft: 24,
  fontSize: 12,
};

const FuzzySearchTextField = 
observer(['state'],
({hintText, value, indexes, state}) => {
    return (
    <div>
      <TextField 
        id={'portfoliosearch'} 
        value={state.portfolioAccountSearch} 
        hintText={hintText}  
        onChange={search}  
      />
        <IconButton
          onTouchTap={clearSearch}
          iconStyle={iconButtonStyles}
          iconClassName="fa fa-trash-o"
          tooltip="Clear Search Item"
          tooltipPosition="top-right"
          disabled={(state.portfolioAccountSearch !== '')  ? false : true}
        />
    </div>
    );

})
export default FuzzySearchTextField;



