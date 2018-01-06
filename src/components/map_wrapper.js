import React from 'react';

class MapWrapper extends React.Component {
  render () {
    const children = this.props.children.map((child) => {
      const isHeader = child.nodeName.name === 'MapHeader';
      console.log('mapwrapper locationData: ', this.props.locationData);
      console.log('mapwrapper paramsData: ', this.props.paramsData);

      const shouldntShowHeader = this.props.paramsData === undefined;
      if (isHeader && shouldntShowHeader) {
        return ''
      }
      return child
    });

    return (
      <div className="MapWrapper">
        {children}
      </div>
    )
  }
}

export default MapWrapper
