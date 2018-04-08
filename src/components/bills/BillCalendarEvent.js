import React from 'react';


// calendar: [
// {
// type_id: 1,
// type: "Hearing",
// date: "2017-04-26",
// time: "13:30",
// location: "John L. Burton Hearing Room",
// description: "Senate Health Hearing"
// },
//   ....
//   ]

const BillCalendarEvent = ({event}) => {
  const eventDate = new Date(event.date + " " + event.time);
  return <div>{event.description}: {eventDate.toLocaleString()}</div>;
};

export default BillCalendarEvent;