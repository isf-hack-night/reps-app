import {Component} from 'preact';

class BillSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({query: event.target.value});
  }

  onSubmit(event) {
    this.props.onSubmit(this.state.query);
    event.preventDefault();
  }

  render(props, state, context) {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Search Bills:
          <input type="text" value={this.state.query}
                 onChange={this.onChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default BillSearchBox;
