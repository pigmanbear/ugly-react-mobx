import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {
lightGreen500, grey900, blueGrey50, purple50,
} from 'material-ui/styles/colors';
import { Row, Col} from 'react-bootstrap';

const style = {
    margin: 20,
    padding: 10,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: purple50,
    fontFamily: 'Source Sans Pro, sans-serif',
};
const innerPaperstyle = {
    margin: 20,
    padding: 5,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: blueGrey50,
};
const iconStyles = {
    marginRight: 24,
};


//TODO: Refactor Blocks into Separate Component 

export const BoxWidget = ({ settings }) => (
        <Col xs={6} className="bb br">
                  <Row className="row-table row-flush">
                     <Col xs={4}  className="text-center text-info">
                     <FontIcon className="fa fa-users" color={lightGreen700} style={iconStyles}></FontIcon>
                     </Col>
                     <Col xs={8}>
                     <div className="panel-body text-center">
                     <h4 className="mt0">114</h4>
                     <p className="mb0 text-muted">Households</p>
                     </div>
                     </Col>
                  </Row>
        </Col>
);

BoxWidget.propTypes = {
  settings: React.PropTypes.any,

};

