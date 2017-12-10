import {h, Component} from 'preact';

class BillFlowChart extends Component {
  render(props) {
    return (
      <div>
        Current: {props.current}
        Introduced->Policy->Fiscal->Senate Floor->Policy->Fiscal->Assembly->Governor
      </div>
    );
  }
}

export default BillFlowChart;
