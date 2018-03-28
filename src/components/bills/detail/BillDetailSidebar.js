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
    const topics = this.props.bill.issue;
    console.log({topics});
    return (
      <div style={this.styles.wrapper}>
        {topics.map((topic, i) => (
        <Chip key={i} style={this.styles.chip} label={`TODO: translate this id to a topic name: ${topic}`}/>
        ))}
      </div>
    )
  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }


  allEvents() {
    const calendar = this.props.bill.calendar;
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
    // TODO: Fix this raw html injection
    return (
      <div>
        {this.topicsList()}
        <div dangerouslySetInnerHTML={{__html: this.props.bill.content.rendered}} />
        <a href={this.props.bill.link} target="_blank"> (Full Text)</a>
        {this.allEvents()}
      </div>
      
    );
  }
}

export default BillDetailSidebar;
