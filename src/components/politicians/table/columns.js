import React from 'react';
import TableColumn from 'components/table/TableColumn';
import PoliticianNameLink from 'components/politicians/PoliticianNameLink';
import PoliticianParty from 'components/politicians/PoliticianParty';
import PoliticianChamber from 'components/politicians/PoliticianChamber';
import PoliticianDistrict from 'components/politicians/PoliticianDistrict';

export const POLITICIAN_NAME_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <h4>Politican</h4>,
  cellComponent: PoliticianNameLink
});

export const POLITICIAN_PARTY_COLUMN = new TableColumn({
  key: 'party',
  headComponent: () => <h4>Party</h4>,
  cellComponent: PoliticianParty
});

export const POLITICIAN_CHAMBER_COLUMN = new TableColumn({
  key: 'chamber',
  headComponent: () => <h4>Chamber</h4>,
  cellComponent: PoliticianChamber
});

export const POLITICIAN_DISTRICT_COLUMN = new TableColumn({
  key: 'district',
  headComponent: () => <h4>District</h4>,
  cellComponent: PoliticianDistrict
});