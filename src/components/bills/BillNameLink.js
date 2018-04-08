import React from 'react';
import {Link} from 'react-router-dom';

const BillNameLink = ({bill}) => {
  const bill_path = `/bills/${bill.id}`;
  const name = bill.slug.replace(/-/g, ' ').toUpperCase();
  return <Link to={bill_path}>{name}</Link>;
};

export default BillNameLink;
