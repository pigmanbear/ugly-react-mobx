/*import React, { PropTypes } from 'react';
import {
    connect
} from 'react-redux';
import {
    JsonTable
} from 'react-json-table';
import * as tableDataActions from '../../actions/tableDataActions';



class JTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tableData: {
                items: []
            }, 
            itemsReceived: false
        };
    }

    onItemsChange(items) {
        const tableData = this.state.tableData;
        tableData.items = items;
        this.setState({
            tableData: tableData
        });
        this.props.fillData(this.state.tableData);
    }

    render() {
        return (
       <div>
          <JsonTable rows= {this.state.tableData.items} />
        </div>
        );
    }
}

JTable.propTypes = {
    fillData: PropTypes.func.isRequired,
    tableDatas: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        tableDatas: state.tableDatas
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        fillData: tableData => dispatch(tableDataActions.fillData(tableData));
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JTable);

this*/