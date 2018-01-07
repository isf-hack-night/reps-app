import React from 'react';
// import AutocompleteContainer from './autocomplete'

class Display extends React.Component {
  render () {
    return (
      <div className='Display'>
        {this.props.children}
      </div>
    )
  }
}

export default Display
