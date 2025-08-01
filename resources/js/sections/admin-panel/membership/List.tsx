import { useMemo, useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
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
import MainCard from '@/components/MainCard';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import TablePagination from '@/components/third-party/react-table/Pagination';
import SortingData from '@/components/third-party/react-table/SortingData';

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
interface ColumnMeta {
  className: string;
}

// action icons data
const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
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
    <Row>
      <Col sm={12}>
        <MainCard className="table-card" title="Membership list">
          <Stack direction="horizontal" className="justify-content-between align-items-center p-3">
            <SortingData getState={table.getState} setPageSize={table.setPageSize} />
            <div className="datatable-search">
              <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
            </div>
          </Stack>
          <Table hover responsive className="mb-0 border-top">
            <thead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={` ${index === 0 ? 'ps-4' : ''} ${index === headerGroup.headers.length - 1 ? 'pe-4' : ''}`}
                      >
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      {...cell.column.columnDef.meta}
                      className={`${(cell.column.columnDef.meta as ColumnMeta)?.className ?? ''} ${cellIndex === 0 ? 'ps-4' : ''} ${cellIndex === row.getVisibleCells().length - 1 ? 'pe-4' : ''}`}
                    >
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
      </Col>
    </Row>
  );
}

// ==============================|| MEMBERSHIP - LIST ||============================== //

export default function StudentApply() {
  const data: TableDataProps[] = useMemo(() => makeData(100), []);
  const getRandomDate = (start: Date, end: Date): string => {
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0].replace(/-/g, '/');
  };

  const columns = useMemo<ColumnDef<TableDataProps>[]>(() => {
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
      {
        header: 'Start Date',
        accessorKey: 'date',
        cell: ({ getValue }) => (
          <>
            {getRandomDate(new Date(2020, 0, 1), new Date(2025, 11, 31))}
            <span className="text-muted text-sm d-block">
              <PatternFormat displayType="text" format="0#:#5 PM" mask="_" defaultValue={getValue() as number} />
            </span>
          </>
        )
      },
      {
        header: 'Status',
        accessorKey: 'progress',
        cell: ({ row }) => (
          <Stack
            direction="horizontal"
            gap={1}
            className={`${row.original.progress > 50 ? 'text-success' : 'text-secondary'} align-items-center `}
          >
            <i className="ti ti-circle-filled align-baseline f-10 m-r-10" />
            {row.original.progress > 50 ? 'Active' : 'Inactive'}
          </Stack>
        )
      },
      {
        header: 'Plan',
        cell: () => {
          const plans = ['Casual', 'Addicted', 'Diehard'];
          const plan = plans[Math.floor(Math.random() * plans.length)];
          const badgeColor = plan === 'Casual' ? 'success' : plan === 'Addicted' ? 'primary' : 'warning';
          return <Badge bg={badgeColor}>{plan}</Badge>;
        }
      },
      {
        header: 'Action',
        cell: () => (
          <Stack direction="horizontal" gap={1}>
            {actionIcons.map((action, idx) => (
              <OverlayTrigger key={idx} placement="bottom" overlay={<Tooltip>{action.name}</Tooltip>}>
                <a href="#" className="btn-link-secondary avatar avatar-xs mx-1">
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
