import React from 'react';
import BillActionLinks from 'components/bills/BillActionLinks';
import BillIssues from 'components/bills/BillIssues';
import BillNameLink from 'components/bills/BillNameLink';
import BillPosition from 'components/bills/BillPosition';
import BillTitle from 'components/bills/BillTitle';
import TableColumn from 'components/table/TableColumn';

export const BILL_NAME_COLUMN = new TableColumn({
  key: 'name',
  headComponent: () => <h4>Bill</h4>,
  cellComponent: BillNameLink
});

export const BILL_TITLE_COLUMN = new TableColumn({
  key: 'title',
  cellComponent: BillTitle
});

export const BILL_POSITION_COLUMN = new TableColumn({
  key: 'position',
  cellComponent: BillPosition
});

export const BILL_ACTIONS_COLUMN = new TableColumn({
  key: 'actions',
  cellComponent: BillActionLinks
});

export const BILL_ISSUES_COLUMN = new TableColumn({
  key: 'issue',
  cellComponent: BillIssues
});