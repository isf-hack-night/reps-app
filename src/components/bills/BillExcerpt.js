import React from 'react';

const BillExcerpt = ({bill}) => {
  // TODOD: Fix this raw html injection
  return <div dangerouslySetInnerHTML={{__html: bill.excerpt.rendered}}/>;
};

export default BillExcerpt;