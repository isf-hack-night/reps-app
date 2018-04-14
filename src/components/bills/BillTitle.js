import React from 'react';

const BillTitle = ({bill}) => {
  const parser = new DOMParser();
  const textTitle = parser.parseFromString(bill.title.rendered, "text/html").body.textContent;
  return <div>{textTitle}</div>;
};

export default BillTitle;