import { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tooltip from 'react-bootstrap/Tooltip';

// third-party
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';

// project-imports
import MainCard from '@/components/MainCard';
import SortingData from '@/components/third-party/react-table/SortingData';
import DebouncedInput from '@/components/third-party/react-table/DebouncedInput';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image5 from '@assets/images/user/avatar-5.png';
import Image9 from '@assets/images/user/avatar-9.png';
import Image10 from '@assets/images/user/avatar-10.png';

interface TableDataProps {
  id: number;
  image: string;
  name: string;
  description: string;
  createDate: string;
  dueDate: string;
  quantity: string;
  badge: string;
  installClass: string;
  badgeClass: string;
}

interface ReactTableProps {
  columns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
}

// table list data
const tableList1 = [
  {
    id: 1,
    image: Image5,
    name: 'Mickie Melmoth',
    description: 'mmsht23@gmail.com',
    createDate: '5/5/2022',
    dueDate: '7/11/2022',
    quantity: '3000',
    badge: 'Paid',
    installClass: 'text-success m-0',
    badgeClass: 'light-success'
  },
  {
    id: 2,
    image: Image9,
    name: 'Shelba Thews',
    description: 'Shelba Thews',
    createDate: '7/6/2022',
    dueDate: '7/8/2022',
    quantity: '3000',
    badge: 'Cancelled',
    installClass: 'text-muted m-o',
    badgeClass: 'light-danger'
  },
  {
    id: 3,
    image: Image10,
    name: 'tass23@gmail.com',
    description: 'Shelba Thews',
    createDate: '05/01/2022	',
    dueDate: '06/02/2022',
    quantity: '1000',
    badge: 'Unpaid',
    installClass: 'text-success m-0',
    badgeClass: 'light-primary'
  },
  {
    id: 4,
    image: Image1,
    name: 'Mickie Melmoth',
    description: 'mmsht23@gmail.com',
    createDate: '5/5/2022',
    dueDate: '7/11/2022',
    quantity: '3000',
    badge: 'Paid',
    installClass: 'text-success m-0',
    badgeClass: 'light-success'
  },
  {
    id: 5,
    image: Image2,
    name: 'Shelba Thews',
    description: 'Shelba Thews',
    createDate: '7/6/2022',
    dueDate: '7/8/2022',
    quantity: '3000',
    badge: 'Unpaid',
    installClass: 'text-success m-0',
    badgeClass: 'light-danger'
  }
];

// action icons data
const actionIcons = [
  { icon: 'ti ti-eye', name: 'View' },
  { icon: 'ti ti-edit', name: 'Edit' },
  { icon: 'ti ti-trash', name: 'Delete' }
];

const columns: ColumnDef<TableDataProps>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    header: 'User Name',
    accessorKey: 'fullName',
    cell: ({ row }) => (
      <Stack direction="horizontal" gap={2} className="align-items-center">
        <Image src={row.original.image} alt="User Avatar" className="avatar avatar-xs" />
        <Stack>
          <h6 className="text-truncate w-100 mb-1">{row.original.name} </h6>
          <span className="f-12 mb-0">{row.original.description}</span>
        </Stack>
      </Stack>
    )
  },
  {
    accessorKey: 'createDate',
    header: 'Created'
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date'
  },
  {
    accessorKey: 'quantity',
    header: '	Quantity  '
  },
  {
    accessorKey: 'badge',
    header: 'Status',
    cell: ({ row }) => {
      const badgeClass = row.original.badgeClass;
      return <Badge bg={badgeClass}>{row.original.badge}</Badge>;
    }
  },
  {
    accessorKey: 'action',
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

function ReactTable({ columns, data }: ReactTableProps) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <Stack direction="horizontal" className="justify-content-between align-items-center flex-wrap p-4 pt-0" gap={2}>
        <SortingData getState={table.getState} setPageSize={table.setPageSize} />
        <div className="datatable-search">
          <DebouncedInput value={globalFilter ?? ''} onFilterChange={(value) => setGlobalFilter(String(value))} />
        </div>
      </Stack>
      <Table responsive hover className="mb-0 border-top">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} {...header.column.columnDef.meta}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} {...cell.column.columnDef.meta}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default function ListTable() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = activeTab === 'all' ? tableList1 : tableList1.filter((item) => item.badge.toLowerCase() === activeTab);

  return (
    <MainCard className="table-card">
      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Nav className="nav-tabs invoice-tab p-4" role="tablist">
          <Nav.Item>
            <Nav.Link eventKey="all">
              <Stack direction="horizontal" gap={2}>
                All
                <Badge pill bg="light-primary">
                  {tableList1.length}
                </Badge>
              </Stack>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="paid">
              <Stack direction="horizontal" gap={2}>
                Paid
                <Badge pill bg="light-success">
                  {tableList1.filter((i) => i.badge === 'Paid').length}
                </Badge>
              </Stack>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="unpaid">
              <Stack direction="horizontal" gap={2}>
                Unpaid
                <Badge pill bg="light-warning">
                  {tableList1.filter((i) => i.badge === 'Unpaid').length}
                </Badge>
              </Stack>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cancelled">
              <Stack direction="horizontal" gap={2}>
                Cancelled
                <Badge pill bg="light-danger">
                  {tableList1.filter((i) => i.badge === 'Cancelled').length}
                </Badge>
              </Stack>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey={activeTab}>
            <ReactTable data={filteredData} columns={columns} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </MainCard>
  );
}
