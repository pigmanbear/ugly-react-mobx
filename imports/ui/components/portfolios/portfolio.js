import React, { PropTypes}  from 'react';
import { Link } from 'react-router';
import {
  Row,
  Col,
  Panel,
  ListGroupItem,
  FormControl,
  Button,
  Table
} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import classNames from 'classnames';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { transitions } from '../../../modules/boxtransitions';
import numeral from 'numeral';
import FontIcon from 'material-ui/FontIcon';
import { lightGreen700, fullWhite, blue100, indigo200, amber400, purple500, lightBlue500, grey50, grey100} from 'material-ui/styles/colors';
import SimpleAccountList from '../accounts/port-account-list';
import state from '../../../stores/mobxstores';



//TODO recfactor to functional component and integrate Monx state
export class Portfolio extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        expanded: this.props.toggle,
      };

      this.panelClass = [
        'widget',
        'text-center'
      ];
      this.cardTitleColor = (num) => {
        switch (num % 2) {
          case 0:
            return lightGreen700;
          case 1:
            return purple500;
        }
      };
      this.cardTitleBackground = this.cardTitleColor(this.props.index);
      this.handleExpand = this.handleExpand.bind(this);
      this.handleExpandChange = this.handleExpandChange.bind(this);
    }
    componentDidMount() {
      transitions();
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        expanded: nextProps.toggle,
      });
    }
    handleExpandChange(expanded) {
      this.setState({
        expanded: expanded
      });
    }
    handleExpand() {
        this.setState({
          expanded: !this.state.expanded
        });
    }
    render() {
      const background = this.cardTitleColor(this.props.index);
        const styles = {
          card: {
            background: this.cardTitleBackground,
          },
          cardAction: {
            padding: 1,
          }
        };
    return (
      <Card className="widget" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={ this.props.document.Name }
          subtitle ={<div>Total Household Value: {numeral(this.props.portfolioTotal).format('$0,0.00')} <br /> Total household Billing: {numeral(this.props.billingTotal).format('$0,0.00')}</div>}
          avatar={<FontIcon className="fa fa-users" color={fullWhite}/>}
          actAsExpander={true}
          showExpandableButton={true}
          style={styles.card}
          titleColor={fullWhite}
          subtitleColor={grey100}
        />
        <CardTitle 
          title="Household Details" 
          subtitle={<div>Total Accounts: {this.props.document.accounts ? this.props.document.accounts.length : 0 }</div>} 
          expandable={true} />
        <CardText expandable={true}>
        <SimpleAccountList 
          accounts = {this.props.document.accounts ? this.props.document.accounts : {}} 
          iconColor = {this.cardTitleBackground} 
        />
        </CardText>
        <CardActions style={styles.cardAction}>
          <FlatButton label={this.state.expanded ? 'Show Less . . .' : 'Show More . . .'} onTouchTap={this.handleExpand} />
        </CardActions>
      </Card>  
    );
  }
}

Portfolio.propTypes = {
  document: React.PropTypes.any.isRequired,
  numAccount: React.PropTypes.number,
  index: React.PropTypes.number,
  portfolioTotal: React.PropTypes.number,
  billingTotal: React.PropTypes.number,
  toggle: React.PropTypes.bool
};
