import React from 'react';
import TableColumn from 'components/table/TableColumn';
import PoliticianNameLink from 'components/politicians/PoliticianNameLink';
import PoliticianParty from 'components/politicians/PoliticianParty';
import PoliticianChamber from 'components/politicians/PoliticianChamber';
import PoliticianDistrict from 'components/politicians/PoliticianDistrict';

export const POLITICIAN_NAME_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <div>Politican</div>,
  cellComponent: PoliticianNameLink
});

export const POLITICIAN_PARTY_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <div>Party</div>,
  cellComponent: PoliticianParty
});

export const POLITICIAN_CHAMBER_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <div>Chamber</div>,
  cellComponent: PoliticianChamber
});

export const POLITICIAN_DISTRICT_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <div>District</div>,
  cellComponent: PoliticianDistrict
});