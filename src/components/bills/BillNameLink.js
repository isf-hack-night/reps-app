import React from 'react';
import {Link} from 'react-router-dom';

const BillNameLink = ({bill}) => {
  const bill_path = `/bills/${bill.id}`;
  return <Link to={bill_path}>{bill.slug}</Link>;
};

export default BillNameLink;
