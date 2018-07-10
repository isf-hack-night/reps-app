import {
  BILL_ISSUES_COLUMN, BILL_NAME_COLUMN, BILL_POSITION_COLUMN,
  BILL_TITLE_COLUMN
} from 'components/bills/table/columns';
import React from 'react';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';


class BillTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      BILL_NAME_COLUMN,
      BILL_TITLE_COLUMN,
      BILL_POSITION_COLUMN,
      // BILL_ACTIONS_COLUMN,
      BILL_ISSUES_COLUMN
    ];
  }

  header() {
    return (
      <TableHead>
        <TableRow>
          {this.columns.map(
            (col, i) =>
              <TableCell key={i}>{col.Head()}</TableCell>
          )}
        </TableRow>
      </TableHead>
    )
  }

  body() {
    const rows = Object.values(this.props.bills).map((bill) => this.row(bill));
    return (
      <TableBody>
        {rows}
      </TableBody>
    )
  }

  row(bill) {
    return (
      <TableRow key={bill.id}>
        {this.columns.map(
          (col, i) =>
            <TableCell key={i}>{col.Cell({bill})}</TableCell>
        )}
      </TableRow>
    );
  }

  footer() {
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            onChangePage={this.props.onChangePage}
            onChangeRowsPerPage={this.props.onChangeRowsPerPage}
            page={this.props.page-1}
            count={this.props.count}
            rowsPerPage={this.props.rowsPerPage}
          />
        </TableRow>
      </TableFooter>
    );
  }

  render() {
    return (
      <Table>
        {this.header()}
        {this.body()}
        {this.footer()}
      </Table>
    );
  }
}

export default BillTable;