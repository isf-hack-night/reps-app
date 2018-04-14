import React from 'react';

const PoliticianPicture = ({politician}) => {
  return <img src={politician.photo_url} width={200} height={250}/>;
};

export default PoliticianPicture;