import React from 'react';

const BillPosition = ({bill}) => {
  return <div>{bill.position[0].name}</div>;
};

export default BillPosition;
