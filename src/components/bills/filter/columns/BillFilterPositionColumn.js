import {Component} from 'preact';


class BillFilterPositionColumn extends Component {

  render(props) {
  	//console.log(props.bill)
  	const position = props.bill.support ? 'Support' : 'Oppose';
    return (
      <td>
        <div style={{color: props.bill.support ? 'green' : 'red' }}>
        	{position}
        </div>
      </td>
    );
  }
}

export default BillFilterPositionColumn;
