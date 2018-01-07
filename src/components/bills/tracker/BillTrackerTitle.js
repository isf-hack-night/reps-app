import React from 'react';

class BillTrackerTitle extends React.Component {
  getLink(bill) {
    // Get the latest version
    return bill.versions[bill.versions.length-1].url;
  }
  render() {
    return (
      <div>
        <h5>
          <a href={this.getLink(this.props.bill)}>
            {this.props.bill.bill_id}
          </a>
          : {this.props.bill.title}
        </h5>
      </div>
    )
  }
}

export default BillTrackerTitle;
