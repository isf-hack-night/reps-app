import React from 'react';
import Chip from 'material-ui/Chip';

const style = {
  backgroundColor: '#2D4C6B',
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
        justifyContent: "left",
        flexWrap: "wrap"}
    }>
      {issuesChips}
    </div>
  );
};

export default BillIssues;
