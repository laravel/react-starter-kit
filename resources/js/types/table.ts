import { ReactNode } from 'react';

// project-imports
import { Gender } from '@/config';

// types
import { KeyedObject } from './root';

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type GetComparator = (order: ArrangementOrder, orderBy: string) => (a: KeyedObject, b: KeyedObject) => number;

export interface EnhancedTableHeadProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, property: string) => void;
  children?: ReactNode; // To allow for custom header content
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: boolean;
  align?: 'left' | 'right' | 'center';
};

export type TableDataApiResponse = {
  data: TableDataProps[];
  meta: {
    totalRowCount: number;
  };
};

export type TableDataProps = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName: string;
  email: string;
  age: number;
  gender: Gender;
  role: string;
  visits: number;
  progress: number;
  status: string;
  orderStatus: string;
  contact: string;
  country: string;
  address: string;
  about: string;
  avatar: number;
  skills: string[];
  time: string[];
};
