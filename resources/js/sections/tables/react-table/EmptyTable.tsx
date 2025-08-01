import { useMemo, useState } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// third-party
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  ColumnFiltersState,
  HeaderGroup
} from '@tanstack/react-table';

// project-imports
import makeData from '@/data/react-table';
import MainCard from '@/components/MainCard';
import EmptyTable from '@/components/third-party/react-table/EmptyTable';
import Filter from '@/components/third-party/react-table/Filter';

// types
import { TableDataProps } from '@/types/table';

interface ColumnMeta {
  className?: string;
}

interface ReactTableProps {
  columns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
}

// =============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: ReactTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <MainCard className="table-card" bodyClassName="pb-1">
      <Stack direction="horizontal" gap={3} className="p-4 justify-content-between">
        <Form.Control
          type="text"
          className="max-w-100"
          placeholder={`Search ${data.length} records...`}
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Stack>

      <Table hover responsive className="mb-0 border-top">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`${(header.column.columnDef.meta as ColumnMeta)?.className} ${index === 0 ? 'ps-4' : ''}
                    ${index === headerGroup.headers.length - 1 ? 'pe-4' : ''}`}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <td
                  key={header.id}
                  className={`${(header.column.columnDef.meta as ColumnMeta)?.className ?? ''} ${index === 0 ? 'ps-4' : ''}
                    ${index === headerGroup.headers.length - 1 ? 'pe-4' : ''}`}
                >
                  {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={(cell.column.columnDef.meta as ColumnMeta)?.className ?? ''}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                <EmptyTable msg="No Data" themeMode="light" />
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <td key={footer.id} className={(footer.column.columnDef.meta as ColumnMeta)?.className}>
                  {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - EMPTY ||============================== //

export default function EmptyReactTable() {
  const data: TableDataProps[] = useMemo(() => makeData(0), []);

  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        header: 'Name',
        footer: 'Name',
        accessorKey: 'fullName'
      },
      {
        header: 'Email',
        footer: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Role',
        footer: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Age',
        footer: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'text-end'
        }
      },
      {
        header: 'Visits',
        footer: 'Visits',
        accessorKey: 'visits',
        meta: {
          className: 'text-end'
        }
      },
      {
        header: 'Status',
        footer: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Badge bg="danger">Complicated</Badge>;
            case 'Relationship':
              return <Badge bg="success">Relationship</Badge>;
            case 'Single':
            default:
              return <Badge bg="info">Single</Badge>;
          }
        }
      },
      {
        header: 'Profile Progress',
        footer: 'Profile Progress',
        accessorKey: 'progress',
        cell: (cell) => <ProgressBar now={cell.getValue() as number} label={`${cell.getValue() as number}%`} className="w-100" />
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} />;
}
