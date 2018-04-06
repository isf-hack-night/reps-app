import React from 'react';

const BillContent = ({bill}) => {
  return <div dangerouslySetInnerHTML={{__html: bill.content.rendered}}/>;
};

export default BillContent;