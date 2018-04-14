import React from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui';

// NOTE: for CA committees are under roles, like this, but for federal they are different
// roles: [
// {
// term: "20172018",
// committee_id: "CAC000801",
// chamber: "lower",
// state: "ca",
// subcommittee: null,
// committee: "Housing and Community Development",
// position: "Chair",
// type: "committee member"
// },
// ... ]

const PoliticianCommittee = ({committee}) => {
  return <div>{committee.committee} ({committee.position})</div>;
};

const PoliticianCommittees = ({politician}) => {
  const committees = politician.roles.filter(role => role.committee_id);
  const committeeListItems = committees.map(
    (committee, i) => {
      return (
        <ListItem key={i}>
          <PoliticianCommittee committee={committee}/>
        </ListItem>
      );
    }
  );
  return <List>{committeeListItems}</List>;
};

export default PoliticianCommittees;
