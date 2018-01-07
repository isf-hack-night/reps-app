import React from 'react';
import Stepper, {Step, StepLabel} from 'material-ui/Stepper';


class BillFlowChart extends React.Component {
  render() {
    return (
      <div>
        <Stepper activeStep={this.props.current}>
          <Step>
            <StepLabel>Introduced</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[0]} Policy</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[0]} Fiscal</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[0]} Floor</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[1]} Policy</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[1]} Fiscal</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.props.chambers[1]} Floor</StepLabel>
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
