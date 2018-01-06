import React from 'react';
import {Step, StepLabel, Stepper} from 'material-ui/Stepper';


class BillFlowChart extends Component {
  render(props) {
    return (
      <div>
        <Stepper activeStep={props.current}>
          <Step>
            <StepLabel>Introduced</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[0]} Policy</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[0]} Fiscal</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[0]} Floor</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[1]} Policy</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[1]} Fiscal</StepLabel>
          </Step>
          <Step>
            <StepLabel>{props.chambers[1]} Floor</StepLabel>
          </Step>
          <Step>
            <StepLabel>Governor</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default BillFlowChart;
