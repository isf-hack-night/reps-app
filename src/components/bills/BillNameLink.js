import React from 'react';
import {Link} from 'react-router-dom';
import BillName from 'components/bills/BillName';

const BillNameLink = ({bill}) => {
  const bill_path = `/bills/${bill.id}`;
  return <Link to={bill_path}><BillName bill={bill} /></Link>;
};

export default BillNameLink;
