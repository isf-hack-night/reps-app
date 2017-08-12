import { h, Component } from 'preact'
// import AutocompleteContainer from './autocomplete'

class Display extends Component {
  render () {
    debugger
    const styles = {
      display: 'inline-block',
      width: '48%'
    }
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    )
  }
}

export default Display