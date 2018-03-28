import React from 'react';
import Chip from 'material-ui/Chip';
import {
  blue,
  green,
  indigo,
  orange
} from 'material-ui/colors';

const tag_colors = [blue[500], indigo[500], orange[500], green[500]];

const style = {
  backgroundColor:indigo[500],
  color:'white',
  display: 'inline-block',
  margin:'4px',
};

class BillFilterTagColumn extends React.Component {
  render() {
    const tagsList =  this.props.bill['issue'].map(
      (tag, i) => <Chip key={i} style={style} label={tag.name}/>
    );
    return <td>{tagsList}</td>;
  }
}

export default BillFilterTagColumn;
