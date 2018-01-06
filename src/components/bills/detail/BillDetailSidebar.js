import React from 'react';
import DataTables from 'material-ui-datatables';
import Chip from 'material-ui/Chip';

class BillDetailSidebar extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  topicsList() {
    const topics = this.props.bill.open_states['+tags'];
    return (
      <div style={this.styles.wrapper}>
        {topics.map(topic => (
        <Chip style={this.styles.chip}>
         {topic}
        </Chip>))}
      </div>
    )
  }

  allEvents() {
    const calendar = this.props.bill.legiscan.calendar;
    let reversed = calendar.map((entry) => entry).reverse();
    return (
      <DataTables
          columns={[{key: 'date', label:'Date'}, {key: 'type', label: 'Type'}, {key:'description', label: 'Description'}]}
          data={reversed}
          title='Events'
          showHeaderToolbar={true}
          />
    );
  }

  render(props) {
    return (
      <div>
        {this.topicsList()}
        {this.props.bill.legiscan.description}
        <a href={this.props.bill.legiscan.url} target="_blank"> (Full Text)</a>
        {this.allEvents()}
      </div>
      
    );
  }
}

export default BillDetailSidebar;
