import React from 'react';
import Chip from 'material-ui/Chip';
import {
  blue,
  green,
  indigo,
  orange
} from 'material-ui/colors';

const tag_colors = [blue[500], indigo[500], orange[500], green[500]];

const style = {
  backgroundColor:indigo[500],
  color:'white',
  // display: 'inline-block',
  margin:'4px',
};

const BillIssues = ({bill}) => {
  const issuesChips =  bill['issue'].map(
    (issue, i) => <Chip key={i} style={style} label={issue.name}/>
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
