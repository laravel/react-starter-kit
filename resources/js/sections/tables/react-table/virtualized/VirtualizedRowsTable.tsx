import { useMemo, useRef, useState } from 'react';

// react-bootstrap
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

// third-party
import { ColumnDef, flexRender, useReactTable, getCoreRowModel, Row, HeaderGroup, getFilteredRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

// project-imports
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import MainCard from '@/components/MainCard';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import makeData from '@/data/react-table';

// types
import { TableDataProps } from '@/types/table';
import { LabelKeyObject } from 'react-csv/lib/core';
import { Stack } from 'react-bootstrap';

interface ReactTableProps {
  columns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: ReactTableProps) {
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    state: { globalFilter },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 34,
    overscan: 10
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((column) =>
    headers.push({
      label: typeof column.columnDef.header === 'string' ? column.columnDef.header : '#',
      // @ts-ignore
      key: column.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="justify-content-between align-items-center">
          <h5>Virtualized Rows</h5>
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </Stack>
      }
      className="table-card"
    >
      <div ref={tableContainerRef} className="p-0 table-responsive overflow-auto custom-scrollbar" style={{ maxHeight: 544 }}>
        <Table hover>
          <thead className="position-sticky top-0 bg-white z-1">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td className="text-wrap" style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<TableDataProps>;
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td className="text-wrap" style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
}

// ==============================|| VIRTUALIZED - VIRTUALIZED ROWS TABLE ||============================== //

export default function VirtualizedRowTable() {
  const data: TableDataProps[] = makeData(100);

  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'fullName'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'text-end'
        }
      },
      {
        header: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        meta: {
          className: 'text-end'
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Badge bg="light-danger">Complicated</Badge>;
            case 'Relationship':
              return <Badge bg="light-success">Relationship</Badge>;
            case 'Single':
            default:
              return <Badge bg="light-info">Single</Badge>;
          }
        }
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        cell: (props) => <LinearWithLabel value={props.getValue() as number} />
      }
    ],
    []
  );

  return <ReactTable {...{ columns, data }} />;
}
