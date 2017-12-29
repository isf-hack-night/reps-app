import {Component} from 'preact';
import Chip from 'material-ui/Chip';
import {
  blue500,
  green500,
  indigo500,
  orange500
} from 'material-ui/styles/colors';

const tag_colors = [blue500, indigo500, orange500, green500]

const style = {
  backgroundColor:indigo500,
  color:'white',
  display: 'inline-block',
  margin:'4px',
};

class BillFilterTagColumn extends Component {
  render(props) {
  	const tagsList =  props.bill.open_states['+tags'].map(tag => <Chip style={style} >{tag}</Chip>)
    return <td>
    {tagsList}

    </td>;
  }
}

export default BillFilterTagColumn;
