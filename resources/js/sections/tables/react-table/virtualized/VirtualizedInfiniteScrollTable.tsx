import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

// third-party
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
  Row,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { keepPreviousData, useInfiniteQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// project-imports
import HeaderSort from '../sorting/HeaderSort';
import MainCard from '@/components/MainCard';
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import makeData from '@/data/react-table';

// types
import { TableDataApiResponse, TableDataProps } from '@/types/table';
import { LabelKeyObject } from 'react-csv/lib/core';

const fetchSize = 25;

const queryClient = new QueryClient();

export const fetchData = (start: number, size: number, sorting: SortingState) => {
  const dbData = [...makeData(1000)];
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort;
    const { id, desc } = sort as { id: keyof TableDataProps; desc: boolean };
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1;
      }
      return a[id] > b[id] ? 1 : -1;
    });
  }

  return {
    data: dbData.slice(start, start + size),
    meta: {
      totalRowCount: dbData.length
    }
  };
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

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
        cell: (cell) => <LinearWithLabel value={cell.getValue() as number} style={{ minWidth: '75px' }} />
      }
    ],
    []
  );

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<TableDataApiResponse>({
    queryKey: ['table-data', sorting],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;
      const fetchedData = fetchData(start, fetchSize, sorting);
      return fetchedData;
    },
    initialPageParam: 1,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });

  const flatData = useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
  const totalDBRowCount = data?.pages?.[0]?.meta!.totalRowCount ?? 0;
  const totalFetched = flatData.length;
  const [globalFilter, setGlobalFilter] = useState('');

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true
  });

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
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="justify-content-between align-items-center flex-wrap" gap={2}>
          <h5>Virtualized Infinite Scroll</h5>
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </Stack>
      }
      className="table-card"
    >
      <div
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        className="overflow-auto custom-scrollbar"
        style={{ height: '544px' }}
      >
        <Table hover>
          <thead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                    Object.assign(header.column.columnDef.meta, {
                      className: `cursor-pointer prevent-select`
                    });
                  }

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`${header.column.getCanSort() ? 'cursor-pointer prevent-select' : ''} `}
                    >
                      {header.isPlaceholder ? null : (
                        <Stack direction="horizontal">
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
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
                    <td key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px`, whiteSpace: 'nowrap' }} />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
}

// ==============================|| VIRTUALIZED - VIRTUALIZED INFINITE SCROLL ||============================== //

export default function VirtualizedInfiniteScrollTable() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactTable />
    </QueryClientProvider>
  );
}
