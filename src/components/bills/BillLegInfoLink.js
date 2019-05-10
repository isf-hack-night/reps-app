import React from 'react';
import BillName from 'components/bills/BillName';

// https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB392
const BillLegInfoLink = ({bill}) => {
    // slug looks like: ca-ab392-2019
    // split on "-" and grab everything other than the first item
    const parts = bill.slug.toUpperCase().split(/-/).slice(1);
    const [billName, year] = parts;
    const billId = `${year}${parseInt(year)+1}0${billName}`;
    const link = `https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=${billId}`;
    return <a href={link}><BillName bill={bill} /></a>;
};

export default BillLegInfoLink;
