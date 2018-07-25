import React from 'react';
import Stepper, {Step, StepLabel} from 'material-ui/Stepper';

function statusSlugToStatus(billStatus) {
  if (!billStatus || billStatus.length == 0) {
    return -1;
  }
  switch (billStatus[0].slug) {
    case 'introduced':
      return 0;
    case '1st-house-policy':
      return 1;
    case '1st-house-appropriations':
      return 2;
    case '1st-house-floor':
      return 3;
    case '2nd-house-policy':
      return 4;
    case '2nd-house-appropriations':
      return 5;
    case '2nd-house-floor':
      return 6;
    case 'governor-signed':
      return 8;
    default:
      return -1;
  }
};

const BillFlowChart = ({bill}) => {
  const currentStatus = statusSlugToStatus(bill.bill_status);
  let chambers = ['Senate', 'Assembly'];
  if (bill.history.length && bill.history[0].chamber === 'A') {
    chambers = ['Assembly', 'Senate'];
  }
  if (currentStatus < 0) {
    return <div> </div>;
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
