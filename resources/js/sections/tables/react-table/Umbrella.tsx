import { useEffect, useMemo, useState, Fragment, MouseEvent, CSSProperties } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';
import Stack from 'react-bootstrap/Stack';

// third-party
import {
  DndContext,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  UniqueIdentifier,
  MouseSensor,
  TouchSensor,
  KeyboardSensor
} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  FilterFn,
  SortingFn,
  sortingFns,
  Row as tableRow,
  Header,
  Table as TableProps,
  ColumnFiltersState,
  SortingState,
  GroupingState,
  getExpandedRowModel,
  getGroupedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  HeaderGroup,
  CellContext,
  ColumnDefTemplate,
  TableMeta
} from '@tanstack/react-table';
import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

// project-imports
import ExpandingUserDetail from '@/sections/tables/react-table/expanding/ExpandingUserDetailsTable';
import HeaderSort from '@/sections/tables/react-table/sorting/HeaderSort';
import MainCard from '@/components/MainCard';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';
import IndeterminateCheckbox from '@/components/third-party/react-table/IndeterminateCheckbox';
import RowEditable from '@/components/third-party/react-table/RowEditable';
import SelectColumnVisibility from '@/components/third-party/react-table/SelectColumnVisibility';
import TablePagination from '@/components/third-party/react-table/Pagination';
import Filter from '@/components/third-party/react-table/Filter';
import EmptyTable from '@/components/third-party/react-table/EmptyTable';
import SortingData from '@/components/third-party/react-table/SortingData';
import RowSelection from '@/components/third-party/react-table/RowSelection';
import makeData from '@/data/react-table';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';

// types
import { TableDataProps } from '@/types/table';
import { LabelKeyObject } from 'react-csv/lib/core';

interface CustomTableMeta extends TableMeta<TableDataProps> {
  setSelectedRow: (updater: (old: TableDataProps[]) => TableDataProps[]) => void;
  selectedRow: Record<string, boolean>; // Add this line
  revertData: (index: number, isCancel: boolean) => void;
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

// ==============================|| REACT TABLE - EDIT ACTION ||============================== //

function EditAction({ row, table }: { row: tableRow<TableDataProps>; table: TableProps<TableDataProps> }) {
  const meta = table?.options?.meta as CustomTableMeta;
  const setSelectedRow = (e: MouseEvent<HTMLAnchorElement> | undefined) => {
    meta?.setSelectedRow((old: TableDataProps[]) => ({ ...old, [row.id]: !old[row.id as any] }));

    // @ts-ignore
    meta?.revertData(row.index, e?.currentTarget.name === 'cancel');
  };

  return (
    <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
      {meta?.selectedRow[row.id] && (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Cancel</Tooltip>}>
          <a
            href="#"
            className="btn-link-danger avatar avatar-xs "
            onClick={(e) => setSelectedRow(e as React.MouseEvent<HTMLAnchorElement>)}
          >
            <i className="ti ti-x f-20" />
          </a>
        </OverlayTrigger>
      )}
      <OverlayTrigger placement="bottom" overlay={<Tooltip>{meta?.selectedRow[row.id] ? 'Save' : 'Edit'}</Tooltip>}>
        <a
          href="#"
          className={`${meta?.selectedRow[row.id] ? 'btn-link-success' : 'btn-link-primary'} avatar avatar-xs`}
          onClick={(e) => setSelectedRow(e as React.MouseEvent<HTMLAnchorElement>)}
        >
          <i className={`${meta?.selectedRow[row.id] ? 'ti ti-check' : 'ti ti-ti ti-edit '} f-20`} />
        </a>
      </OverlayTrigger>
    </Stack>
  );
}

const nonOrderableColumnId: UniqueIdentifier[] = ['drag-handle', 'expander', 'select'];

// ==============================|| REACT TABLE - DRAGGABLE HEADER ||============================== //

function DraggableTableHeader({ header }: { header: Header<any, unknown> }) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
    id: header.column.id
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0
  };
  return (
    <th id={header.id} colSpan={header.colSpan} {...header.column.columnDef.meta} ref={setNodeRef} style={style}>
      {header.isPlaceholder ? null : (
        <Stack direction="horizontal" gap={1} className={`align-items-center `}>
          {header.column.getCanGroup() && (
            <Button
              color={header.column.getIsGrouped() ? 'error' : 'primary'}
              onClick={header.column.getToggleGroupingHandler()}
              style={{ padding: 0, width: 24, height: 24, fontSize: '1rem', marginRight: 0.75 }}
            >
              <i className={header.column.getIsGrouped() ? 'ti ti-arrows-minimize' : 'ti ti-arrows-maximize'} />
            </Button>
          )}
          <div {...(!nonOrderableColumnId.includes(header.id) && { ...attributes, ...listeners, sx: { cursor: 'move' } })}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
          {header.column.getCanSort() && <HeaderSort column={header.column} sort />}
        </Stack>
      )}
    </th>
  );
}

// ==============================|| REACT TABLE - DRAGGABLE ROW ||============================== //

function DraggableRow({ row }: { row: tableRow<any> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => {
        let bgcolor = 'background.paper';
        if (cell.getIsGrouped()) bgcolor = 'primary.lighter';
        if (cell.getIsAggregated()) bgcolor = 'warning.lighter';
        if (cell.getIsPlaceholder()) bgcolor = 'error.lighter';

        if (cell.column.columnDef.meta !== undefined && cell.column.getCanSort()) {
          Object.assign(cell.column.columnDef.meta, { style: { background: bgcolor } });
        }

        return (
          <td
            key={cell.id}
            {...cell.column.columnDef.meta}
            {...(cell.getIsGrouped() && cell.column.columnDef.meta === undefined && { style: { background: bgcolor } })}
            style={{ width: cell.column.getSize() }}
          >
            {cell.getIsGrouped() ? (
              <Stack direction="horizontal" className="align-item-center" gap={0.5}>
                <i
                  className={row.getIsExpanded() ? 'ti ti-chevron-down' : 'ti ti-chevron-right '}
                  onClick={row.getToggleExpandedHandler()}
                />
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div> <div>({row.subRows.length})</div>
              </Stack>
            ) : cell.getIsAggregated() ? (
              flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
            ) : cell.getIsPlaceholder() ? null : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </td>
        );
      })}
    </tr>
  );
}

// ==============================|| REACT TABLE - DRAGGABLE HANDLE ||============================== //

function RowDragHandleCell({ rowId }: { rowId: string }) {
  const { attributes, listeners } = useSortable({ id: rowId });

  return <i {...attributes} {...listeners} className="ti ti-drag-drop-2 text-secondary f-18" />;
}

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

export default function UmbrellaTable() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'drag-handle',
        header: () => null,
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
        meta: {
          className: 'text-center'
        },
        size: 60
      },
      {
        id: 'expander',
        enableGrouping: false,
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <i
              className={`${row.getIsExpanded() ? 'ti ti-chevron-down text-primary' : 'ti ti-chevron-right text-secondary'} f-18`}
              onClick={row.getToggleExpandedHandler()}
            />
          ) : (
            <i className="ti ti-minus text-secondary" />
          );
        },
        size: 60
      },
      {
        id: 'select',
        enableGrouping: false,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        ),
        size: 60
      },
      {
        id: 'id',
        title: 'Id',
        header: '#',
        accessorKey: 'id',
        dataType: 'text',
        enableColumnFilter: false,
        enableGrouping: false,
        meta: {
          className: 'cell-center'
        }
      },
      {
        id: 'avatar',
        header: 'Avatar',
        accessorKey: 'avatar',
        enableColumnFilter: false,
        enableGrouping: false,
        cell: (cell) => (
          <Image src={getImageUrl(`avatar-${cell.getValue()}.png`, ImagePath.USER)} alt="User Avatar" className="avatar avatar-xs" />
        )
      },
      {
        id: 'fullName',
        header: 'Name',
        footer: 'Name',
        accessorKey: 'fullName',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'email',
        header: 'Email',
        footer: 'Email',
        accessorKey: 'email',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'age',
        header: 'Age',
        footer: 'Age',
        accessorKey: 'age',
        dataType: 'text',
        meta: {
          className: 'text-end'
        }
      },
      {
        id: 'role',
        header: 'Role',
        footer: 'Role',
        accessorKey: 'role',
        dataType: 'text',
        enableGrouping: false,
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort
      },
      {
        id: 'contact',
        header: 'Contact',
        footer: 'Contact',
        accessorKey: 'contact',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'country',
        header: 'Country',
        footer: 'Country',
        accessorKey: 'country',
        dataType: 'text',
        enableGrouping: false
      },
      {
        id: 'visits',
        header: 'Visits',
        footer: 'Visits',
        accessorKey: 'visits',
        dataType: 'text',
        enableGrouping: false,
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
        },
        dataType: 'select'
      },
      {
        id: 'progress',
        header: 'Profile Progress',
        footer: 'Profile Progress',
        accessorKey: 'progress',
        dataType: 'progress',
        enableGrouping: false
      },
      {
        id: 'edit',
        header: 'Actions',
        cell: EditAction,
        enableGrouping: false,
        meta: {
          className: 'text-center'
        }
      }
    ],
    []
  );

  const [data, setData] = useState(() => makeData(20));
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.id!));

  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }: any) => id), [data]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [originalData, setOriginalData] = useState(() => [...data]);
  const [selectedRow, setSelectedRow] = useState({});

  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredData = useMemo(() => {
    if (!statusFilter) return data;
    return data.filter((user: any) => user.status === statusFilter);
  }, [statusFilter, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    defaultColumn: { cell: RowEditable as ColumnDefTemplate<CellContext<any, any>> },
    getRowId: (row) => row.id,
    state: { rowSelection, columnFilters, globalFilter, sorting, grouping, columnOrder, columnVisibility },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex: number, revert: unknown) => {
        if (revert) {
          setData((old: TableDataProps[]) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)));
        } else {
          setOriginalData((old) => old.map((row, index) => (index === rowIndex ? data[rowIndex] : row)));
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string | number | boolean) => {
        setData((old: TableDataProps[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return { ...old[rowIndex]!, [columnId]: value };
            }
            return row;
          })
        );
      }
    }
  });

  let headers: LabelKeyObject[] = [];

  table.getVisibleLeafColumns().map(
    (columns) =>
      // @ts-ignore
      columns.columnDef.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        // @ts-ignore
        key: columns.columnDef.accessorKey
      })
  );

  // Handle Column Drag End
  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      if (nonOrderableColumnId.includes(over.id)) return;
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  // Handle Row Drag End
  function handleRowDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data: any) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const columnSensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
  const rowSensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  useEffect(() => setColumnVisibility({ id: false, role: false, contact: false, country: false, progress: false }), []);

  return (
    <MainCard className="table-card">
      <Stack direction="horizontal" gap={2} className="align-items-center flex-wrap justify-content-between p-4">
        <Stack direction="horizontal" gap={2} className="align-items-center">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
          <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        </Stack>
        <Stack direction="horizontal" gap={2} className="align-items-center justify-content-end">
          <Form.Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Status Filter">
            <option value="">All Status</option>
            <option value="Single">Single</option>
            <option value="Relationship">Relationship</option>
            <option value="Complicated">Complicated</option>
          </Form.Select>
          <SelectColumnVisibility
            {...{
              getVisibleLeafColumns: table.getVisibleLeafColumns,
              getIsAllColumnsVisible: table.getIsAllColumnsVisible,
              getToggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler,
              getAllColumns: table.getAllColumns
            }}
          />
        </Stack>
      </Stack>

      <RowSelection selected={Object.keys(rowSelection).length} />
      {/* Column DnD Context */}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleColumnDragEnd}
        sensors={columnSensors}
      >
        <Table hover responsive className="mb-0 border-top">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                  {headerGroup.headers.map((header) => (
                    <DraggableTableHeader key={header.id} header={header} />
                  ))}
                </SortableContext>
              </tr>
            ))}

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
            {/* Row DnD Context */}
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleRowDragEnd}
              sensors={rowSensors}
            >
              {table.getRowModel().rows.length > 0 ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row, index) => (
                    <Fragment key={index}>
                      <DraggableRow row={row} />
                      {row.getIsExpanded() && !row.getIsGrouped() && (
                        <tr>
                          <td colSpan={row.getVisibleCells().length + 2}>
                            <Container fluid>
                              <ExpandingUserDetail data={row.original} />
                            </Container>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </SortableContext>
              ) : (
                <tr>
                  <td colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" themeMode="light" />
                  </td>
                </tr>
              )}
            </DndContext>
          </tbody>

          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <th key={footer.id} {...footer.column.columnDef.meta}>
                    {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </Table>
      </DndContext>

      <TablePagination
        {...{
          setPageSize: table.setPageSize,
          setPageIndex: table.setPageIndex,
          getState: table.getState,
          getPageCount: table.getPageCount,
          totalEntries: 20
        }}
      />
    </MainCard>
  );
}
