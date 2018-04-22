import React from 'react';
import {Link} from 'react-router-dom';

const PoliticianNameLink = ({politician}) => {
  const politician_path = `/politicians/${politician.slug}`;
  return <Link to={politician_path}>{politician.full_name}</Link>;
};

export default PoliticianNameLink;
