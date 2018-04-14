import React from 'react';
import {Link} from 'react-router-dom';

const PoliticianNameLink = ({politician}) => {
  const politician_path = `/politicians/${politician.id}`;
  return <Link to={politician_path}>{politician.full_name}</Link>;
};

export default PoliticianNameLink;
