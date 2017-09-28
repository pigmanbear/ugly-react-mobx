import React from 'react';
import {
    ListGroup,
    Alert,
    Table,
    Col,
    Panel,
    Row
} from 'react-bootstrap';
import
DocumentsList
from '../containers/documents-list.js';
import
Pagination
from 'rc-pagination';
import '../../../node_modules/rc-pagination/assets/index.css';
import {
    Loading
} from './loading';

import {
    browserHistory
} from 'react-router';

import {
    lightGreen50,
    blueGrey50,
    grey50,
    grey900,
    redA100
} from 'material-ui/styles/colors';
import {
    Session
} from 'meteor/session';

import _ from 'underscore';
import {
  Counts
} from 'meteor/tmeasday:publish-counts';
import { DocCounts } from '../../../client/portfolios';



export class PaginationDocumentsList extends React.Component {
        constructor(props, context) {
            super(props, context);
            console.log(this);
            this.currentPage = (Session.get('page') ? Session.get('page') : this.props.currentPage);
            this.itemsPerPage = 8;
            this.sortOrder = 1;
            this.state = {
                itemsPerPage: this.itemsPerPage,
                currentPage: this.currentPage,
                sort: this.sortOrder,
                counts: 0,
            };
            this.options = {
                skip: (this.state.currentPage - 1) * this.state.itemsPerPage,
                limit: this.state.itemsPerPage,
                sort: {
                    "Name": this.state.sort
                },
            };

            this.onPageChange = this.onPageChange.bind(this);
            this.getOptions = this.getOptions.bind(this);
            this.getCount = this.getCount.bind(this);



        }
       getCount(search) {
           Tracker.autorun(() => {
               Meteor.subscribe('docCounts', search, () => {
                   let counts = DocCounts.find().count();
                   this.setState({
                       counts: counts,
                   });
               });
           });

       }
        componentWillMount() {
            this.getCount(this.state.search);
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                search: nextProps.search,
                counts: nextProps.counts,
                currentPage: nextProps.currentPage
            });
            this.getCount();
        }
        onPageChange(page) {
            this.setState({
                currentPage: page,
            });
           // browserHistory.push('/documents/' + page);
           Session.set('page',page);
    }    
        getOptions() {
            this.options.limit = this.itemsPerPage;
            this.options.skip = (this.state.currentPage - 1) * this.state.itemsPerPage;
            this.options.sort = {
                "Name": this.state.sort
            };
            return this.options;
        }
        render() {
                console.log(this.state);
    
         const pageDisplay = () => (this.props.counts  > 0 ?
                                <div>
                                    <DocumentsList options = { this.getOptions() } search = {this.props.search} />
                                    <br />
                                    <Row className="text-center">
                                    <Pagination className = 'ant-pagination' onChange = { this.onPageChange } current = { this.state.currentPage } total = {this.state.counts } pageSize = { this.state.itemsPerPage }/>
                                    </Row>
                                </div>
                                :
                               <Loading />);

        return (
            <div>          
                <br />
                { pageDisplay() }
                </div>
        );
    }
}
PaginationDocumentsList.propTypes = {
    currentPage: React.PropTypes.number,
    search: React.PropTypes.any,
    counts: React.PropTypes.number,
};