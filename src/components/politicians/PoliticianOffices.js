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

const PoliticianOffice = ({office}) => {
  const phone = office.phone ? <ListItem>Phone: {office.phone}</ListItem> : null;
  const address = office.address ? <ListItem>Address: {office.address}</ListItem> : null;
  const email = office.email ? <ListItem>Email: {office.email}</ListItem> : null;

  return (
    <div>
      <h5>{office.name}</h5>
      <List component="nav">
        {phone}
        {address}
        {email}
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