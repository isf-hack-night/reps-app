import React from 'react';
import Stepper, {Step, StepLabel} from 'material-ui/Stepper';


const BillFlowChart = ({bill}) => {
  const currentStatus = 1; // TODO: extract from bill
  let chambers = ['Senate', 'Assembly'];
  if (bill.history.length && bill.history[0].chamber === 'A') {
    chambers = ['Assembly', 'Senate'];
  }
  return (
    <div>
      <Stepper activeStep={currentStatus}>
        <Step>
          <StepLabel>Introduced</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[0]} Policy</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[0]} Fiscal</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[0]} Floor</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[1]} Policy</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[1]} Fiscal</StepLabel>
        </Step>
        <Step>
          <StepLabel>{chambers[1]} Floor</StepLabel>
        </Step>
        <Step>
          <StepLabel>Governor</StepLabel>
        </Step>
      </Stepper>
    </div>
  );
};

export default BillFlowChart;
