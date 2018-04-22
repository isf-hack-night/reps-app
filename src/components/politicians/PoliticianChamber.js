import React from 'react';
import {Link} from 'react-router-dom';

// {
//   term: "20172018",
//   end_date: null,
//   district: "17",
//   chamber: "lower",
//   state: "ca",
//   party: "Democratic",
//   type: "member",
//   start_date: null
// },

const PoliticianChamber = ({politician}) => {
  // Extract from role:
  let chamber = 'N/A';
  if (politician.roles) {
    const chamberRole = politician.roles.filter(role => role.chamber).shift();
    if (chamberRole) {
      chamber = chamberRole.chamber;
    }
  }

  return <div>{chamber}</div>;
};

export default PoliticianChamber;
