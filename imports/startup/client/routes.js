import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Portfolios } from '../../ui/pages/portfolios';
import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { Animation } from '../../ui/pages/animations';
import { Base } from '../../ui/layouts/base';
import { Upload } from '../../ui/pages/upload';
import { Support  } from '../../ui/pages/support';
import  { PortfolioDetails } from '../../ui/pages/portfolio-details';
import { Playground } from '../../ui/pages/playground';
import { analytics } from 'meteor/okgrow:analytics';
import { observable, useStrict } from 'mobx';
import BillingsView from '../../ui/pages/latest-billings';
import { Provider } from 'mobx-react';
import state from '../../stores/mobxstores';


const logPageView = (prevState, nextState, replace) => {
  analytics.page(nextState.location.pathname);
};


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
      <Provider state={state}>
      <Router history={ browserHistory }>
        <Route path="/" component={Base} onChange={logPageView}>
          <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />
          <Route name="latestBillings" path="billings-latest"component={BillingsView} onEnter={requireAuth} />
          <Route name="portfolios" path="portfolios(/:page)" component={ Portfolios } onEnter={ requireAuth } />
          <Route name="login" path="login" component={ Login } />
          <Route name="animations" path="animations" component={ Animation } onEnter={ requireAuth } />
          <Route name="upload" path="upload" component={ Upload } onEnter={requireAuth} />
          <Route name="support" path="support" component={ Support } onEnter={requireAuth} />
          <Route name="portfolio-details" path="/portfolio/:id" component={ PortfolioDetails} onEnter={ requireAuth } />
          <Route name="playground" path="playground" component={Playground} onEnter={requireAuth} />
          <Route path="*" component={ NotFound } />
      </Route>
      </Router>
      </Provider>,
    document.getElementById('react-root')
  );
});




