import {Component} from 'preact';
// import AutocompleteContainer from './autocomplete'

class Display extends Component {
  render () {
    return (
      <div className='Display'>
        {this.props.children}
      </div>
    )
  }
}

export default Display
