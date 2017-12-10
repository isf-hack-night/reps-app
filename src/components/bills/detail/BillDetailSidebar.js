import {h, Component} from 'preact';

class BillDetailSidebar extends Component {
  topicsList() {
    const topics = this.props.bill.open_states['+tags'];
    return (
      <ul>
        {topics.map(topic => <li>{topic}</li>)}
      </ul>
    )
  }

  nextEvent() {
    const calendar = this.props.bill.legiscan.calendar;
    if (calendar.length === 0) {
      return <div>No events scheduled</div>;
    }
    const event = calendar[0];
    return (
      <div>
        Date: {event.date} Type: {event.type} Description: {event.description}
      </div>
    );
  }

  render(props) {
    return (
      <div>
        <h5>Topics</h5>
        {this.topicsList()}
        <h5>Current Committee</h5>
        <h5>Scheduled Event</h5>
        {this.nextEvent()}
      </div>
    );
  }
}

export default BillDetailSidebar;
