import React from 'react';
import ReactDOM from 'react-dom';
import FreshDeskWidget from '@personare/react-freshdesk-widget';
import { Meteor } from  'meteor/meteor';
import { animations } from '../../modules/animations';
import { Panel } from 'react-bootstrap';
export default class FreshDesk extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hidden: 'hidden'
        };
        console.log(Meteor);
        this.url = "https://wealthsource.freshdesk.com";
        this.formTitle = "Submit a Request";
        this.submitThanks = "Thank you, a WealthSource Team member will respond soon.";
        this.formHeight = "740px";
        this.show = () => {
            this.setState({
                hidden:''
            });
        };
    }
componentDidMount() {
    animations();
    Meteor.setTimeout(() => {
        this.show();
    },800);
}
render () {
    return (
        <div
        className={this.state.hidden}>
        <FreshDeskWidget url={this.url} formTitle={this.formTitle} submitThanks={this.submitThanks} formHeight={ this.formHeight }/>
        </div>
    );
}

}

    