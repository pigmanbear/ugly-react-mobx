import React, {
  PropTypes
} from 'react';
import { portfolioTotal, billingTotal} from '../../../modules/calculations';
import {
  propTypes,
  observer,
  observable
} from 'mobx-react';
import { action, toJS } from 'mobx';
import appstate from '../../../stores/mobxstores';
import {
  ListGroup,
  Alert,
  Table,
  Col,
  Panel,
  Row
} from 'react-bootstrap';
import
Pagination
from 'rc-pagination';
import '../../../../node_modules/rc-pagination/assets/index.css';
import {Portfolio }from './portfolio';
import {
  Loading
} from '../loading';
import {
  lightGreen50,
  blueGrey50,
  grey50,
  grey900,
  redA100
} from 'material-ui/styles/colors';
import R from 'ramda';
import { isNumber,isObject, pluckKeyValues,filterValues, notUndefined, isNotEmpty, sortByPropCaseInsensitive} from '../../../modules/ramda-utils';
import Toggle from 'material-ui/Toggle';
import { Flex, Box } from 'reflexbox';

//TODDO: Allow total items for selection by not hard coding the lefthalf, righthalf, and state.portfoliosPaginationOptions.limit, started
const onPageChange = action(page => {
  appstate.portfoliosCurrentPage = page;
});
const handleToggle = action((event, toggle) => {
  appstate.portfoliosCardToggle = !appstate.portfoliosCardToggle;
});
export const PortfoliosList = 
observer(['state'], 
({state}) => {
  const pageDisplay = () => {
        return(         
            state.portfolios.length > 0 ?
        <div>
        <div>
        <Toggle toggled={state.portfoliosCardToggle} onToggle={handleToggle} labelPosition="right" label="Toggle to close or expand all"
        />
        <div className="animate-panel" data-effect="zoomIn">
              <Flex 
              wrap
              justify="flex-start" 
              align="stretch">
                        { (sortByPropCaseInsensitive('Name')(R.intersectionWith(R.eqBy(R.prop('_id')), toJS(state.portfolios), toJS(state.portfolioAccountSearchMatches)))).map((portfolio, index) => (
                        <Box 
                        key={ portfolio._id } 
                            col={12}
                            lg={6}
                            md={6}
                            sm={12}
                            px={1}>
                                <Portfolio document={ portfolio } index={ index } numAccount={ portfolio.accounts.length } portfolioTotal={ portfolioTotal(portfolio.accounts)}
                                   billingTotal={ billingTotal(toJS(portfolio), toJS(state.billingsLatest))} toggle={state.portfoliosCardToggle} /> 
                      </Box>))}
            </Flex>
        </div>
        <br />
        </div>
        <div>
        <br />
        <Row className="text-center">
            <Pagination className='ant-pagination' onChange={ onPageChange } current={ state.portfoliosCurrentPage } total={ state.portfolios.length } pageSize={ state.portfoliosPaginationOptions.limit }/>
        </Row>
        </div>
        </div> :
        <Alert bsStyle='info'>No households to display.</Alert>)}; 
return (
    <div>
   { pageDisplay() }
   </div>
);
});





   