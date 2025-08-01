import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

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

// ==============================|| ACTION ICON DATA ||============================== //

const actionIcons = [
  { bg: 'btn-link-secondary', icon: 'ti ti-eye', name: 'View' },
  { bg: 'btn-link-primary', icon: 'ti ti-edit text-primary', name: 'Edit' },
  { bg: 'btn-link-danger', icon: 'ti ti-trash text-danger', name: 'Delete' }
];

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
    <MainCard
      title="Student list"
      secondary={
        <Stack direction="horizontal" gap={2}>
          <Link href="/admin-panel/online-course/student/apply" className="btn btn-outline-secondary">
            Apply Student List
          </Link>
          <Link href="/admin-panel/online-course/student/add" className="btn btn-primary">
            Add Student
          </Link>
        </Stack>
      }
      className="table-card px-0"
    >
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

// ==============================|| STUDENT - LIST ||============================== //

export default function StudentList() {
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
      {
        header: 'Mobile',
        accessorKey: 'contact',
        cell: ({ getValue }) => <PatternFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={getValue() as number} />
      },
      { header: 'Qualification', cell: getRandomDegree },
      { header: 'Email', cell: () => 'Info@123.com' },

      {
        header: 'Admission Date',
        accessorKey: 'date',
        cell: () => getRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31))
      },
      {
        header: 'Action',
        cell: () => (
          <Stack direction="horizontal" gap={1}>
            {actionIcons.map((action, idx) => (
              <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                <a href="#" className={`${action.bg} avatar avatar-xs mx-1`}>
                  <i className={`${action.icon} f-20`} />
                </a>
              </OverlayTrigger>
            ))}
          </Stack>
        )
      }
    ];
  }, []);

  return <ReactTable data={data} columns={columns} />;
}
