import React from 'react';
import {List, ListItem, ListItemText} from 'material-ui';
// {
// fax: null,
// name: "Capitol Office",
// phone: null,
// address: "Vermont State House 115 State Street Montpelier, VT 05633",
// type: "capitol",
// email: "BSmith@leg.state.vt.us"
// },

const orNA = (thing) => thing ? thing : 'N/A';

const PoliticianOffice = ({office}) => {

  return (
    <div>
      <h5>{office.name}</h5>
      <List component="nav">
        <ListItem>
          Phone: {orNA(office.phone)}
        </ListItem>
        <ListItem>
          Address: {orNA(office.address)}
        </ListItem>
        <ListItem>
          Email: {orNA(office.email)}
        </ListItem>
      </List>
    </div>
  );
};

const PoliticianOffices = ({politician}) => {
  if (!politician.offices) {
    return null;
  }
  return (
    <div>
      {politician.offices.map((office, i) => <PoliticianOffice key={i} office={office} />)}
    </div>
  );
};

export default PoliticianOffices;