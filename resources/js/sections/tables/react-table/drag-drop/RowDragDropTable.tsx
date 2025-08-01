import { useMemo, useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

// third-party
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import {
  ColumnDef,
  HeaderGroup,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { LabelKeyObject } from 'react-csv/lib/core';

// project-imports
import MainCard from '@/components/MainCard';
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import DraggableRow from '@/components/third-party/react-table/DraggableRow';
import TablePagination from '@/components/third-party/react-table/Pagination';
import SortingData from '@/components/third-party/react-table/SortingData';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import makeData from '@/data/react-table';

// types
import { TableDataProps } from '@/types/table';

interface ReactTableProps {
  defaultColumns: ColumnDef<TableDataProps>[];
  defaultData: TableDataProps[];
}

interface ColumnMeta {
  className: string;
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, defaultData }: ReactTableProps) {
  const [columns] = useState(() => [...defaultColumns]);
  const [data, setData] = useState([...defaultData]);
  const [globalFilter, setGlobalFilter] = useState('');

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as TableDataProps);
    setData([...data]);
  };

  const table = useReactTable({
    data,
    state: { globalFilter },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  let headers: LabelKeyObject[] = [];
  table.getAllColumns().map((column) =>
    headers.push({
      label: typeof column.columnDef.header === 'string' ? column.columnDef.header : '#',
      key: ('accessorKey' in column.columnDef ? column.columnDef.accessorKey : column.id) as string
    })
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5
      }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const draggedRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === active.id);
      const targetRowIndex = table.getRowModel().rows.findIndex((row) => `row-${row.id}` === over.id);
      reorderRow(draggedRowIndex, targetRowIndex);
    }
  };

  return (
    <MainCard title="Row Drag & Drop (Ordering)" className="table-card">
      <Stack direction="horizontal" className="justify-content-between align-items-center flex-wrap p-4" gap={2}>
        <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        <div className="datatable-search">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </div>
      </Stack>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <Table responsive hover className="mb-0 border-top">
          <thead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <tr key={headerGroup.id}>
                <th />
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    {...header.column.columnDef.meta}
                    className={`${(header.column.columnDef.meta as ColumnMeta)?.className} `}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} reorderRow={reorderRow}>
                <>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.column.columnDef.meta}
                      className={`${(cell.column.columnDef.meta as ColumnMeta)?.className} `}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </>
              </DraggableRow>
            ))}
          </tbody>
        </Table>
      </DndContext>
      <TablePagination
        setPageSize={table.setPageSize}
        setPageIndex={table.setPageIndex}
        getState={table.getState}
        getPageCount={table.getPageCount}
        initialPageSize={10}
        totalEntries={10}
      />
    </MainCard>
  );
}

// ==============================||  DRAG & DROP - ROW DRAG & DROP TABLE ||============================== //

export default function RowDragDrop() {
  const data = useMemo(() => makeData(10), []);

  const defaultColumns: ColumnDef<TableDataProps>[] = [
    {
      id: 'fullName',
      header: 'Name',
      footer: 'Name',
      accessorKey: 'fullName'
    },
    {
      id: 'email',
      header: 'Email',
      footer: 'Email',
      accessorKey: 'email'
    },
    {
      id: 'age',
      header: 'Age',
      footer: 'Age',
      accessorKey: 'age',
      meta: {
        className: 'text-end'
      }
    },
    {
      id: 'role',
      header: 'Role',
      footer: 'Role',
      accessorKey: 'role'
    },
    {
      id: 'visits',
      header: 'Visits',
      footer: 'Visits',
      accessorKey: 'visits',
      meta: {
        className: 'text-end'
      }
    },
    {
      id: 'status',
      header: 'Status',
      footer: 'Status',
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
      id: 'progress',
      header: 'Profile Progress',
      footer: 'Profile Progress',
      accessorKey: 'progress',
      cell: (props) => <LinearWithLabel value={props.getValue() as number} />
    }
  ];

  return <ReactTable {...{ defaultColumns, defaultData: data }} />;
}
