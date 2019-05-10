import React from 'react';

const BillName = ({bill}) => {
    // slug looks like: ca-ab392-2019
    // split on "-", extract the bill name, then grab the chamber and number
    const [chamber, number] = bill.slug.toUpperCase().split(/-/)[1].match(/(\D+)(\d+)/).slice(1);
    return <div>{chamber} {number}</div>;
};

export default BillName;
