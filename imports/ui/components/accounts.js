import React, {
  PropTypes
} from 'react';
import { Link } from 'react-router';
import {
  Row,
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  FormControl,
  Button,
  Table,
  Image
} from 'react-bootstrap';
import {
  Bert
} from 'meteor/themeteorchef:bert';
import classNames from 'classnames';
import {
  transitions
} from '../../modules/boxtransitions';
import numeral from 'numeral';
import moment from 'moment';


export class Account extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.panelClass = [
      'widget',
    ];
    this.handlePanelColor=this.handlePanelColor.bind(this);
    this.cleanValue=this.cleanValue.bind(this);
  }
  componentDidMount() {
    transitions();
  }
  cleanValue(val){
      if(val) 
        return val.TotalEmv;
     else 
        return 0; 
  }
  
  handlePanelColor(num) {
    switch (num % 3) {
      case 0:
        return classNames(this.panelClass, 'bg-success');
      case 1:
        color = true;
        return classNames(this.panelClass, 'bg-info');
      default:
        return classNames(this.panelClass, 'bg-primary');
    }
  }

  render() {
      const title = <h3 className="mt0">{this.props.account.account.name}</h3>;
      
    return (
              <Col lg={4}>
                      <Panel className="widget" header={ title }>
                            <Row className="row-table">
                               <Col xs={6} className="text-center">
                                  <Image src="/wonly.png" alt="Image" responsive />
                               </Col>
                               <Col xs={6}>
                                  <ListGroup className="list-unstyled">
                                     <ListGroupItem className="mb-sm no-border">
                                        <em className="fa fa-map-marker fa-fw"></em>ASD, Qwerty</ListGroupItem>
                                     <ListGroupItem className="mb-sm no-border">
                                        <em className="fa fa-twitter fa-fw"></em>@asdasd</ListGroupItem>
                                     <ListGroupItem className="mb-sm no-border">
                                        <em className="fa fa-envelope fa-fw"></em>asdasd@mail.com</ListGroupItem>
                                  </ListGroup>
                               </Col>
                            </Row>
                         </Panel>
                        <Panel className={ this.handlePanelColor(this.props.index) }>
                            <Row className="row-table text-center">
                               <Col xs={4}>
                                  <p className="m0">{ numeral(this.cleanValue(this.props.account.apiDetails.Details)).format('$0,0.00')}</p>
                                  <p className="m0">Value</p>
                               </Col>
                               <Col xs={4}>
                                  <p className="m0">{moment(this.props.account.account.startDate).format("MMM Do YYYY")}</p>
                                  <p className="m0">Start Date</p>
                               </Col>
                               <Col xs={4}>
                                  <p className="m0">{ numeral(510).format('$0,0.00') }</p>
                                  <p className="m0">Last Billing</p>
                               </Col>
                            </Row>
                         </Panel>
              </Col>
    );
  }
}

Account.propTypes = {
  account: React.PropTypes.any.isRequired,
  index: React.PropTypes.number,
};

                 /*  <Col lg={4}>
                      <Panel className="panel widget">
                            <Row className="row-table">
                               <Col xs={6}className="text-center">
                                  <img src="wonly.png" alt="Image" className="img-circle thumb96" />
                               </Col>
                               <Col xs={6}>
                                  <h3 className="mt0">{ this.props.account.account.Name }</h3>
                                  <ListGroup className="list-unstyled">
                                     <ListGroupItem className="mb-sm">
                                        <em className="fa fa-map-marker fa-fw"></em>ASD, Qwerty</ListGroupItem>
                                     <ListGroupItem className="mb-sm">
                                        <em className="fa fa-twitter fa-fw"></em>@asdasd</ListGroupItem>
                                     <ListGroupItem className="mb-sm">
                                        <em className="fa fa-envelope fa-fw"></em>asdasd@mail.com</ListGroupItem>
                                  </ListGroup>
                               </Col>
                            </div>
                         </Panel>
                        <Panel className={ this.handlePanelColor(this.props.index) }>
                            <Row className="row-table text-center">
                               <Col xs={4}>
                                  <p className="m0 h3">700</p>
                                  <p className="m0 text-muted">Value</p>
                               </Col>
                               <Col xs={4}>
                                  <p className="m0 h3">1500</p>
                                  <p className="m0 text-muted">Start Date</p>
                               </Col>
                               <Col xs={4}>
                                  <p className="m0 h3">510</p>
                                  <p className="m0 text-muted">Recent Billing</p>
                               </Col>
                            </Row>
                         </Panel>
                      </Col>
                            <Col lg={ 4 }>
      <Panel className={ this.handlePanelColor(this.props.index) } >
          <div>
              <div className="clearfix">
                  <div className="pull-left">47</div>
                  <div className="pull-right">57</div>
              </div>
              <img src="img/logo.png" alt="Image" className="img-thumbnail" />
              <h4 className="mt0">{ this.props.account.account.Name }</h4>
              <p className="m0">
                  <em className="fa fa-fw fa-map-marker"></em>San Francisco, California</p>
              <div className="clearfix">
                  <div className="pull-left">{this.props.index}</div>
                  <div className="pull-right">$300000</div>
              </div>
          </div>
          </Panel>     
      </Col>*/
      