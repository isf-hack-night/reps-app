import React from 'react';
import BillSearchHeader from 'components/bills/search/BillSearchHeader';
import BillSearchRow from 'components/bills/search/BillSearchRow';

class BillSearchList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ['bill_id', 'title', 'calendar'];
  }

  render(props) {
    const rows = props.bills.map((bill, index) => <BillSearchRow key={index}
                                                                 columns={this.columns}
                                                                 bill={bill}/>);

    return (
      <table>
        <thead>
        <BillSearchHeader columns={this.columns}/>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}

export default BillSearchList;
