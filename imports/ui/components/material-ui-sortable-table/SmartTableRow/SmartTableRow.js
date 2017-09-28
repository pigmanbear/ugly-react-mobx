import { TableRow, TableRowColumn } from 'material-ui/Table';
import React, { PropTypes, Component } from 'react';
import formatTableCell from './formatTableCell';

class SmartTableRow extends Component {
  render() {

    const { index, row, tableHeaders } = this.props;
   //     debugger;
    return (
      <TableRow key={ index }>
        { tableHeaders.map((header, propIndex) => {

         // if(true) { debugger;} 
          return(
          <TableRowColumn key={ propIndex }>{ row.birth_date }</TableRowColumn>
          )}) }
      </TableRow>
    );
  }
}

SmartTableRow.propTypes = {
  index: PropTypes.number,
  row: PropTypes.object,
  tableHeaders: PropTypes.array
};

export default SmartTableRow;
