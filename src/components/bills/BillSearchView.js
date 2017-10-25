import {h, Component} from 'preact';
import BillSearchList from 'components/bills/BillSearchList';

class BillSearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      bills: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    console.log(event);
    this.setState({
      bills: this.props.open_states.fetchData('bills', {q: this.state.query})
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input type="text" value={this.state.query}
                   onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <BillSearchList bills={this.state.bills}/>
      </div>
    )
  }
}

export default BillSearchView;
