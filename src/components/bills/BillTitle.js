import React from 'react';

const BillTitle = ({bill}) => {
  return <div>{bill.title.rendered}</div>;
};

export default BillTitle;