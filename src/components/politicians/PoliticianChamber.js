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
      // Capitalize first letter
      chamber = chamberRole.chamber.charAt(0).toUpperCase() + chamberRole.chamber.substr(1);
    }
  }

  return <span>{chamber}</span>;
};

export default PoliticianChamber;
