import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import state from '../../../stores/mobxstores';
import { Loading } from '../../components/loading';
import BillingsLatestTableList from '../../components/billings/billings-latest-table-list.js';

export default observer(class extends Component {
  constructor(props, context) {
    super(props, context);
  }
 render() {
    if (!state.billingsLatestLoading) {
      return (<Loading />);
    }
    return (
 
            <BillingsLatestTableList />

    );
  }
});