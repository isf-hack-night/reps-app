import React from 'react';
import MUIDataTable from 'mui-datatables';
import Chip from 'material-ui/Chip';

class BillDetailSidebar extends React.Component {
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
    this.columns = ['Date','Type', 'Description'];
    this.keys = ['date', 'type', 'description'];
    this.getRow = this.getRow.bind(this);
  }

  topicsList() {
    const topics = this.props.bill.open_states['+tags'];
    return (
      <div style={this.styles.wrapper}>
        {topics.map((topic, i) => (
        <Chip key={i} style={this.styles.chip}>
         {topic}
        </Chip>))}
      </div>
    )
  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }


  allEvents() {
    const calendar = this.props.bill.legiscan.calendar;
    const data = calendar.slice().reverse().map(this.getRow);

    return (
      <MUIDataTable
          columns={this.columns}
          data={data}
          title='Events'
          showHeaderToolbar={true}
          />
    );
  }

  render() {
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
