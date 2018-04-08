import React from 'react';
import BillCalendarEvent from 'components/bills/BillCalendarEvent';


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

const BillNextHearing = ({bill}) => {
  // Loop through the calendar, stop at the first one with a hearing date after today
  const now = Date.now();
  for (const event of bill.calendar) {
    const eventDate = new Date(event.date);
    // if (eventDate > now) {
      return <BillCalendarEvent event={event}/>;
    // }
  }

  return <div>No scheduled events</div>;
};

export default BillNextHearing;