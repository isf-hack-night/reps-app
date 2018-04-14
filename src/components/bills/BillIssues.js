import React from 'react';
import Chip from 'material-ui/Chip';
import {indigo} from 'material-ui/colors';

const style = {
  backgroundColor:indigo[500],
  color:'white',
  // display: 'inline-block',
  margin:'4px',
};

const BillIssues = ({bill}) => {
  const parser = new DOMParser();
  const issuesChips =  bill['issue'].map(
    (issue, i) =>
      <Chip
        key={i}
        style={style}
        label={parser.parseFromString(issue.name, "text/html").body.textContent}
      />
  );
  return (
    <div style={
      {display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"}
    }>
      {issuesChips}
    </div>
  );
};

export default BillIssues;
