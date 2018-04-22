import React from 'react';

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

const PoliticianParty = ({politician}) => {
  // Extract from role:
  let party = 'N/A';
  if (politician.roles) {
    const partyRole = politician.roles.filter(role => role.party).shift();
    if (partyRole) {
      party = partyRole.party;
    }
  }

  return <div>{party}</div>;
};

export default PoliticianParty;