import React from 'react';
import Chip from 'material-ui/Chip';

const BillPosition = ({bill}) => {
  const name = bill.position[0].name;
  let style = {
    color: 'white'
  };
  if (name === 'Support') {
    style.backgroundColor = '#00CD00'
  }else if (name === 'Interested') {
    style.backgroundColor = '#2D4C6B'
  } else if (name === 'Oppose') {
    style.backgroundColor = '#ff0000'
  }
  return <Chip style={style} label={name} />;
};

export default BillPosition;
