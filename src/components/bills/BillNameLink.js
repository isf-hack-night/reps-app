import React from 'react';
import {Link} from 'react-router-dom';

const BillNameLink = ({bill}) => {
  const bill_path = `/bills/${bill.id}`;
  const parts = bill.slug.toUpperCase().split(/-/)[1].match(/(\D+)(\d+)/);
  return <Link to={bill_path}>{parts[1]} {parts[2]}</Link>;
};

export default BillNameLink;
