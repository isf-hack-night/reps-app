import {Component} from 'preact';

class BillTrackerTitle extends Component {
  getLink(bill) {
    // Get the latest version
    return bill.versions[bill.versions.length-1].url;
  }
  render(props, state, context) {
    return (
      <div>
        <h5>
          <a href={this.getLink(props.bill)}>
            {props.bill.bill_id}
          </a>
          : {props.bill.title}
        </h5>
      </div>
    )
  }
}

export default BillTrackerTitle;
