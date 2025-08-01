import { useMemo, useState } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  flexRender,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  HeaderGroup,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
import { PatternFormat } from 'react-number-format';

// project-imports
import HeaderSort from '@/sections/tables/react-table/sorting/HeaderSort';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import TablePagination from '@/components/third-party/react-table/Pagination';
import SortingData from '@/components/third-party/react-table/SortingData';
import MainCard from '@/components/MainCard';

import makeData from '@/data/react-table';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';

// types
import { TableDataProps } from '@/types/table';

interface LabelKeyObject {
  label: string;
  key: string;
}

interface ReactTableProps {
  columns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: ReactTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((column) => {
    const accessorKey = column.columnDef;

    headers.push({
      label: typeof column.columnDef.header === 'string' ? column.columnDef.header : '#',
      key: typeof accessorKey === 'string' ? accessorKey : 'unknown'
    });
  });

  return (
    <MainCard className="table-card px-0" title="Apply Teacher list">
      <Stack direction="horizontal" className="justify-content-between align-items-center p-4 flex-wrap gap-2">
        <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        <div className="datatable-search">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </div>
      </Stack>
      <Table hover responsive className="mb-0 border-top">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>, index) => (
            <tr key={index} className="cursor-pointer">
              {headerGroup.headers.map((header, index) => {
                return (
                  <th key={index} onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                      <Stack direction="horizontal" className={`justify-content-between`}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && <HeaderSort column={header.column} />}
                      </Stack>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={index} {...cell.column.columnDef.meta}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination
        setPageSize={table.setPageSize}
        setPageIndex={table.setPageIndex}
        getState={table.getState}
        getPageCount={table.getPageCount}
        initialPageSize={10}
        totalEntries={100}
      />
    </MainCard>
  );
}

// ==============================|| TEACHER - APPLY ||============================== //

export default function TeacherApply() {
  const data: TableDataProps[] = useMemo(() => makeData(100), []);
  const getRandomDate = (start: Date, end: Date): string => {
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0].replace(/-/g, '/');
  };

  const columns = useMemo<ColumnDef<TableDataProps>[]>(() => {
    const getRandomDegree = () => {
      const degrees = ['B.Tech', 'M.Tech', 'MBA', 'PhD', 'B.Sc', 'M.Sc'];
      return degrees[Math.floor(Math.random() * degrees.length)];
    };

    return [
      {
        header: 'Name',
        accessorKey: 'fullName',
        cell: ({ row, getValue }) => (
          <Stack direction="horizontal" gap={2} className="align-items-center">
            <Image src={getImageUrl(`avatar-${row.original.avatar}.png`, ImagePath.USER)} alt="User Avatar" className="avatar avatar-xs" />
            <h6>{getValue() as string} </h6>
          </Stack>
        )
      },
      { header: 'Department', accessorKey: 'role' },
      { header: 'Qualification', cell: getRandomDegree },
      {
        header: 'Mobile',
        accessorKey: 'contact',
        cell: ({ getValue }) => <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={getValue() as number} />
      },
      {
        header: 'Date/Time',
        accessorKey: 'date',
        cell: () => (
          <>
            {getRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31))}
            <span className="text-muted text-sm d-block">09:05 PM</span>
          </>
        )
      },
      {
        header: 'Action',
        cell: () => (
          <Stack direction="horizontal" gap={1}>
            <a href="#" className="avatar avatar-xs mx-1 btn-light-success">
              <i className="ti ti-check f-20" />
            </a>
            <a href="#" className="avatar avatar-xs mx-1 btn-light-danger">
              <i className="ti ti-x f-20" />
            </a>
            <a href="#" className="avatar avatar-xs mx-1 btn-light-secondary">
              <i className="ti ti-dots-vertical f-20" />
            </a>
          </Stack>
        )
      }
    ];
  }, []);

  return <ReactTable data={data} columns={columns} />;
}
