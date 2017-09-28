import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import state from '../../../stores/mobxstores';
import { Loading } from '../../components/loading';
import { PortfoliosList } from '../../components/portfolios/portfoliosList';

export default observer(class extends Component {
  constructor(props, context) {
    super(props, context);
  }
 render() {
    if (!state.portfoliosLoading) {
      return (<Loading />);
    }
    return (<PortfoliosList />);
  }
});