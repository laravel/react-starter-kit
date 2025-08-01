import { useMemo, useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// third-party
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  flexRender,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  HeaderGroup,
  FilterFn,
  SortingFn,
  sortingFns
} from '@tanstack/react-table';
import { compareItems, rankItem, RankingInfo } from '@tanstack/match-sorter-utils';

// project-imports
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import EmptyTable from '@/components/third-party/react-table/EmptyTable';
import Filter from '@/components/third-party/react-table/Filter';
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import SortingData from '@/components/third-party/react-table/SortingData';
import MainCard from '@/components/MainCard';
import makeData from '@/data/react-table';

// types
import { TableDataProps } from '@/types/table';

interface LabelKeyObject {
  label: string;
  key: string;
}

export const fuzzyFilter: FilterFn<TableDataProps> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

export const fuzzySort: SortingFn<TableDataProps> = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId]! as RankingInfo, rowB.columnFiltersMeta[columnId]! as RankingInfo);
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

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
    state: {
      columnFilters,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter
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
    <MainCard title="Filtering Table" className="table-card" bodyClassName="pb-0">
      <Stack direction="horizontal" className="justify-content-between align-items-center flex-wrap p-4" gap={2}>
        <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        <div className="datatable-search">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </div>
      </Stack>
      <div className="table-responsive">
        <Table hover className="mb-0 border-top">
          <thead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} {...header.column.columnDef.meta}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <thead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <td key={header.id} {...header.column.columnDef.meta}>
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
                    <td key={cell.id} {...cell.column.columnDef.meta}>
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
          <tfoot className="footer-bg">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <td key={footer.id} {...footer.column.columnDef.meta}>
                      {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tfoot>
        </Table>
      </div>
    </MainCard>
  );
}

// ==============================|| FILTERING TABLE ||============================== //

export default function FilteringTable() {
  const data: TableDataProps[] = useMemo(() => makeData(50), []);

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
        accessorKey: 'role',
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort
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
        accessorKey: 'status',
        cell: (cell) => {
          const status = cell.getValue() as string;
          let variant;
          switch (status) {
            case 'Complicated':
              variant = 'light-danger';
              break;
            case 'Relationship':
              variant = 'light-success';
              break;
            case 'Single':
            default:
              variant = 'light-info';
              break;
          }
          return <Badge bg={variant}>{status}</Badge>;
        }
      },
      {
        header: 'Profile Progress',
        footer: 'Profile Progress',
        accessorKey: 'progress',
        cell: (props) => <LinearWithLabel value={props.getValue() as number} />
      }
    ],
    []
  );

  return <ReactTable {...{ data, columns }} />;
}
