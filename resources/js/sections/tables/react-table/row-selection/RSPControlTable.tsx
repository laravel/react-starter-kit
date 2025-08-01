import { ReactNode, useEffect, useMemo, useState } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// third-party
import { ColumnDef, useReactTable, flexRender, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// project-imports
import MainCard from '@/components/MainCard';
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import TablePagination from '@/components/third-party/react-table/Pagination';
import SortingData from '@/components/third-party/react-table/SortingData';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import makeData from '@/data/react-table';

// types
import { TableDataProps } from '@/types/table';

const queryClient = new QueryClient();

interface FetchDataOptions {
  pageIndex: number;
  pageSize: number;
}

async function fetchData({ pageIndex, pageSize }: FetchDataOptions) {
  await new Promise((r) => setTimeout(r, 500));
  const data = makeData(100);
  return {
    rows: data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    pageCount: Math.ceil(data.length / pageSize)
  };
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable() {
  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Form.Check type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
        ),
        cell: ({ row }) => <Form.Check type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
      },
      { header: 'Name', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Age', accessorKey: 'age', meta: { className: 'text-end' } },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          const status = cell.getValue() as string;
          const variant = status === 'Complicated' ? 'light-danger' : status === 'Relationship' ? 'light-success' : 'light-info';
          return <span className={`badge bg-${variant}`}>{status as ReactNode}</span>;
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

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data } = useQuery({
    queryKey: ['data', { pageIndex, pageSize }],
    queryFn: () => fetchData({ pageIndex, pageSize })
  });

  const table = useReactTable({
    data: data?.rows || [],
    columns,
    pageCount: data?.pageCount || -1,
    state: { pagination: { pageIndex, pageSize }, rowSelection, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true
  });
  useEffect(() => setRowSelection({ 1: true, 5: true, 7: true }), []);

  return (
    <MainCard title="Row Selection (Pagination Control)" className="table-card">
      <Stack direction="horizontal" className="justify-content-between align-items-center flex-wrap p-4" gap={2}>
        <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        <div className="datatable-search">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </div>
      </Stack>
      <Table hover responsive className="mb-0 border-top">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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

// ==============================|| ROW SELECTION - RSP CONTROL TABLE ||============================== //

export default function RSPControl() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactTable />
    </QueryClientProvider>
  );
}
