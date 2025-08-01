import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// third-party
import { Column, ColumnDef } from '@tanstack/react-table';

type CustomColumnDef<T> = ColumnDef<T> & { accessorKey?: string };

interface Props {
  getVisibleLeafColumns: () => Column<any, unknown>[];
  getIsAllColumnsVisible: () => boolean;
  getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void;
  getAllColumns: () => Column<any, unknown>[];
}

// ==============================|| REACT TABLE - SELECT COLUMN VISIBILITY ||============================== //

export default function SelectColumnVisibility({
  getVisibleLeafColumns,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllColumns
}: Props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    getToggleAllColumnsVisibilityHandler()(event);
    setShowDropdown(false);
  };

  return (
    <Dropdown show={showDropdown} onToggle={handleToggleDropdown}>
      <Dropdown.Toggle as={Button} id="dropdown-basic">
        {getIsAllColumnsVisible() ? 'All columns visible' : `${getVisibleLeafColumns().length} column(s) visible`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button">
          <Form.Check type="checkbox" label="All Columns" checked={getIsAllColumnsVisible()} onChange={handleSelectAll} />
        </Dropdown.Item>
        {getAllColumns().map((column) => {
          const accessorKey = (column.columnDef as CustomColumnDef<any>)?.accessorKey;
          return accessorKey ? (
            <Dropdown.Item key={column.id} as="button" onClick={column.getToggleVisibilityHandler()}>
              <Form.Check
                type="checkbox"
                label={column.columnDef.header as string}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
            </Dropdown.Item>
          ) : null;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
