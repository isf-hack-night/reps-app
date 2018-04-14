import React from 'react';
import TableColumn from 'components/table/TableColumn';
import PoliticianNameLink from 'components/politicians/PoliticianNameLink';

export const POLITICIAN_NAME_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <div>Politican</div>,
  cellComponent: PoliticianNameLink
});