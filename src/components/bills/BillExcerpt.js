import React from 'react';

const BillExcerpt = ({bill}) => {
  const parser = new DOMParser();
  const textExcerpt = parser.parseFromString(bill.excerpt.rendered, "text/html").body.textContent;
  return <div>{textExcerpt}</div>;
};

export default BillExcerpt;